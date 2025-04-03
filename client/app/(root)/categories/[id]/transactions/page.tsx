import { CategoriesApi } from '@/features/transactions/api';
import { CategoryTransactions } from '@/features/transactions/components';
import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import { PageHeader } from '@/shared/components';

export const metadata: Metadata = {
  title: 'Categories',
};

export default async function CategoryTransactionsPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const data = await CategoriesApi.getOneCategory({ id: Number(id) });

  if (data.statusCode === 404) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title={`Categories: ${data.name}`}
        breadCrumbs={[
          { href: '/categories', title: 'Categories' },
          {
            href: `/categories/${data.id}/transactions`,
            title: data.name,
            active: true,
          },
        ]}
      />
      <CategoryTransactions categoryId={data.id} />
    </>
  );
}
