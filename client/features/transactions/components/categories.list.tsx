"use client";

import { CategoryItem } from "./category.item";

type CategoriesListProps = {
  data: Category[];
};

export const CategoriesList = ({ data }: CategoriesListProps) => {
  return (
    <ul className="flex flex-col space-y-1">
      {data.map((c) => (
        <CategoryItem category={c} key={c.id} />
      ))}
    </ul>
  );
};
