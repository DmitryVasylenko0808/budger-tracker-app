import CategoriesManager from '@/features/transactions/components/categories.manager';
import type { Metadata } from 'next';

import { PageHeader } from '@/shared/components';

export const metadata: Metadata = {
  title: 'Categories',
};

export default async function CategoriesPage() {
  return (
    <>
      <PageHeader title="Categories" />
      <CategoriesManager />
    </>
  );
}
