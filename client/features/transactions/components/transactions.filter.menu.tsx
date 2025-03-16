"use client";

import { ListFilter } from "lucide-react";
import { Button, Menu } from "@/shared/ui";
import { useToggleMenu } from "@/hooks";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCategories } from "../api";

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
    queryKey: ["categories"],
    queryFn: () => getCategories({}),
    placeholderData: keepPreviousData,
  });

  return (
    <Menu
      trigger={
        <Button variant="filled" className="relative" onClick={onToggle}>
          <ListFilter size={20} />
          {!!selectedCategoryIds.length && (
            <span className="absolute top-0 right-0 z-10 w-2 h-2 bg-primary-100 rounded-full" />
          )}
        </Button>
      }
      content={
        <div className="min-w-48 max-h-64 p-2 overflow-auto">
          <h4 className="mb-3 text-black font-semibold">Categories:</h4>
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
