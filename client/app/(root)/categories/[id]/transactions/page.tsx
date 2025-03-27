import { getOneCategory } from '@/features/transactions/api';
import { CategoryTransactions } from '@/features/transactions/components';
import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import { BreadCrumbs, Container } from '@/shared/ui';

export const metadata: Metadata = {
  title: 'Categories',
};

export default async function CategoryTransactionsPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const data = await getOneCategory({ id: Number(id) });

  if (data.statusCode === 404) {
    notFound();
  }

  return (
    <section className="py-10">
      <Container>
        <BreadCrumbs
          items={[
            { href: '/categories', title: 'Categories' },
            {
              href: `/categories/${data.id}/transactions`,
              title: data.name,
              active: true,
            },
          ]}
          className="mb-5"
        />
        <h1 className="mb-4 text-3xl font-semibold">Categories: {data.name}</h1>
        <div className="mb-5 h-0.5 w-full bg-gray-50" />
      </Container>
      <CategoryTransactions categoryId={data.id} />
    </section>
  );
}
