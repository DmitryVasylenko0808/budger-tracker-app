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

import { Container } from '@/shared/ui';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  return (
    <>
      <section className="pb-8 pt-10">
        <Container>
          <h1 className="mb-4 text-3xl font-semibold">Dashboard</h1>
          <div className="h-0.5 w-full bg-gray-50" />
        </Container>
      </section>
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
