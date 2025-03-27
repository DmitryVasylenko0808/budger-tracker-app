import { Transactions } from '@/features/transactions/components';
import type { Metadata } from 'next';

import { Container } from '@/shared/ui';

export const metadata: Metadata = {
  title: 'Transactions',
};

export default async function TransactionsPage() {
  return (
    <div>
      <section className="pb-8 pt-10">
        <Container>
          <h1 className="mb-4 text-3xl font-semibold">Transactions</h1>
          <div className="h-0.5 w-full bg-gray-50" />
        </Container>
      </section>

      <Transactions />
    </div>
  );
}
