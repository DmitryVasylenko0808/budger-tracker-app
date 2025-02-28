"use client";

import { Button, TextField } from "@/shared/ui";
import { LoaderCircle, Plus, Search } from "lucide-react";
import { CategoriesList } from "./categories.list";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks";
import { useState } from "react";
import { getCategories } from "../api";

type CategoriesProps = {
  type: TransactionType;
  categories: Category[];
};

export const Categories = ({ type, categories }: CategoriesProps) => {
  const [search, setSearch] = useState<string>("");
  const debouncedValue = useDebounce(search, 500);
  const { data, isFetching } = useQuery({
    queryKey: ["categories", type, debouncedValue],
    queryFn: () => getCategories({ type, search: debouncedValue }),
    initialData: categories,
    enabled: !!search,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

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
        leftAddon={
          isFetching ? (
            <LoaderCircle size={20} className="text-gray-100 animate-spin" />
          ) : (
            <Search size={20} className="text-gray-100" />
          )
        }
        className="mb-4"
        onChange={handleSearch}
        value={search}
      />
      {<CategoriesList data={data} />}
    </div>
  );
};
