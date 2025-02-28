"use client";

import { Button, TextField } from "@/shared/ui";
import { Plus, Search } from "lucide-react";
import { CategoriesList } from "./categories.list";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api";

type CategoriesProps = {
  type: TransactionType;
};

export const Categories = ({ type }: CategoriesProps) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["categories", type],
    queryFn: () => getCategories({ type }),
  });

  if (isLoading) {
    return (
      <div className="flex-1 h-80 bg-gray-100/15 rounded-lg animate-pulse" />
    );
  }

  const titleType = type === "INCOME" ? "Income" : "Expense";

  return (
    <div className="flex-1">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-black">
          {titleType} Categories
        </h2>
        <Button variant="primary">
          <Plus size={20} />
          Add
        </Button>
      </div>
      <TextField
        placeholder="Search"
        leftAddon={<Search size={20} className="text-gray-100" />}
        className="mb-4"
      />
      <CategoriesList data={data} />
    </div>
  );
};
