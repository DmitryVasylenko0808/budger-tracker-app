"use client";

import { Button, TextField } from "@/shared/ui";
import { LoaderCircle, Plus, Search } from "lucide-react";
import { CategoriesList } from "./categories.list";
import { AddCategoryModal } from "./add.category.modal";
import { useQuery } from "@tanstack/react-query";
import { useDebounce, useModal } from "@/hooks";
import { useState } from "react";
import { getCategories } from "../api";
import { CategoryItem } from "./category.item";

type CategoriesProps = {
  type: TransactionType;
  categories: Category[];
};

export const Categories = ({ type, categories }: Readonly<CategoriesProps>) => {
  const [search, setSearch] = useState<string | null>(null);
  const addCategoryModal = useModal();
  const debouncedValue = useDebounce(search, 500);
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["categories", type, debouncedValue],
    queryFn: () => getCategories({ type, search: debouncedValue }),
    initialData: categories,
    enabled: search !== null,
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
        <Button variant="primary" onClick={addCategoryModal.onOpen}>
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
        value={search === null ? "" : search}
      />
      <CategoriesList>
        {data.map((c: Category) => (
          <CategoryItem
            category={c}
            onEdit={refetch}
            onDelete={refetch}
            key={c.id}
          />
        ))}
      </CategoriesList>
      <AddCategoryModal
        title="New Category"
        type={type}
        open={addCategoryModal.open}
        onClose={addCategoryModal.onClose}
        afterSubmit={refetch}
      />
    </div>
  );
};
