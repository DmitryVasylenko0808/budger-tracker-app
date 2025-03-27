'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ListFilter } from 'lucide-react';

import { useToggleMenu } from '@/hooks';

import { Button, Menu } from '@/shared/ui';

import { getCategories } from '../api';

type TransactionsFilterMenuProps = {
  selectedCategoryIds: number[];
  onSelectCategoryId: (id: number) => void;
};

export const TransactionsFilterMenu = ({
  selectedCategoryIds,
  onSelectCategoryId,
}: Readonly<TransactionsFilterMenuProps>) => {
  const { open, ref, onToggle } = useToggleMenu();
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => getCategories({}),
    placeholderData: keepPreviousData,
  });

  return (
    <Menu
      trigger={
        <Button variant="filled" className="relative" onClick={onToggle}>
          <ListFilter size={20} />
          {!!selectedCategoryIds.length && (
            <span className="absolute right-0 top-0 z-10 h-2 w-2 rounded-full bg-primary-100" />
          )}
        </Button>
      }
      content={
        <div className="max-h-64 min-w-48 overflow-auto p-2">
          <h4 className="mb-3 font-semibold text-black">Categories:</h4>
          <ul className="flex flex-col space-y-3">
            {categories?.map((c) => (
              <li className="flex" key={c.id}>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => onSelectCategoryId(c.id)}
                    checked={selectedCategoryIds.includes(c.id)}
                  />
                  {c.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      }
      open={open}
      ref={ref}
    />
  );
};
