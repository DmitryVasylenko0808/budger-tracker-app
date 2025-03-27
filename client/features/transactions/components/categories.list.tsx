'use client';

import { PropsWithChildren } from 'react';

type CategoriesListProps = PropsWithChildren;

export const CategoriesList = ({ children }: Readonly<CategoriesListProps>) => {
  return <ul className="flex flex-col space-y-1">{children}</ul>;
};
