'use client';

import { useQuery } from '@tanstack/react-query';
import { LoaderCircle, Plus, Search } from 'lucide-react';

import { useState } from 'react';

import { useDebounce, useModal } from '@/hooks';

import { Button, TextField } from '@/shared/ui';

import { CategoriesApi } from '../api';
import { AddCategoryModal } from './add.category.modal';
import { CategoriesList } from './categories.list';
import { CategoryItem } from './category.item';

type CategoriesProps = {
  type: TransactionType;
  categories: Category[];
};

export const Categories = ({ type, categories }: Readonly<CategoriesProps>) => {
  const [search, setSearch] = useState<string | null>(null);
  const addCategoryModal = useModal();
  const debouncedValue = useDebounce(search, 500);
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['categories', type, debouncedValue],
    queryFn: () => CategoriesApi.getCategories({ type, search: debouncedValue }),
    initialData: categories,
    enabled: search !== null,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const titleType = type === 'INCOME' ? 'Income' : 'Expense';

  return (
    <div className="flex-1">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-black">{titleType} Categories</h2>
        <Button variant="primary" onClick={addCategoryModal.onOpen}>
          <Plus size={20} />
          Add
        </Button>
      </div>
      <TextField
        placeholder="Search"
        leftAddon={
          isFetching ? (
            <LoaderCircle size={20} className="animate-spin text-gray-100" />
          ) : (
            <Search size={20} className="text-gray-100" />
          )
        }
        className="mb-4"
        onChange={handleSearch}
        value={search === null ? '' : search}
      />
      <CategoriesList>
        {data.map((c: Category) => (
          <CategoryItem category={c} onEdit={refetch} onDelete={refetch} key={c.id} />
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
