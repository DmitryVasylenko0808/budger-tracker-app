import { Transactions } from '@/features/transactions/components';
import type { Metadata } from 'next';

import { PageHeader } from '@/shared/components';

export const metadata: Metadata = {
  title: 'Transactions',
};

export default async function TransactionsPage() {
  return (
    <div>
      <PageHeader title="Transactions" />
      <Transactions />
    </div>
  );
}
