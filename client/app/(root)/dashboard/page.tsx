import {
  Breakdown,
  BreakdownChart,
  IncomeExpenseReport,
  IncomeExpenseSkeleton,
  Summary,
  SummarySkeleton,
} from '@/features/transactions/components';
import type { Metadata } from 'next';

import { Suspense } from 'react';

import { PageHeader } from '@/shared/components';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" />
      <Suspense fallback={<SummarySkeleton />}>
        <Summary />
      </Suspense>
      <Suspense fallback={<IncomeExpenseSkeleton />}>
        <IncomeExpenseReport />
      </Suspense>
      <Breakdown>
        <BreakdownChart type="INCOME" />
        <BreakdownChart type="EXPENSE" />
      </Breakdown>
    </>
  );
}
