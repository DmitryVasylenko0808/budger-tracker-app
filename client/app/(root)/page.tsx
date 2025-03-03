import {
  Breakdown,
  BreakdownItem,
  BreakdownItemSkeleton,
  IncomeExpenseReport,
  IncomeExpenseSkeleton,
  Summary,
  SummarySkeleton,
} from "@/features/transactions/components";
import { Container } from "@/shared/ui";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <section className="pt-10 pb-8">
        <Container>
          <h1 className="mb-4 text-3xl font-semibold">Dashboard</h1>
          <div className="w-full h-0.5 bg-gray-50" />
        </Container>
      </section>
      <Suspense fallback={<SummarySkeleton />}>
        <Summary />
      </Suspense>
      <Suspense fallback={<IncomeExpenseSkeleton />}>
        <IncomeExpenseReport />
      </Suspense>
      <Breakdown>
        <Suspense fallback={<BreakdownItemSkeleton />}>
          <BreakdownItem type="INCOME" />
        </Suspense>
        <Suspense fallback={<BreakdownItemSkeleton />}>
          <BreakdownItem type="EXPENSE" />
        </Suspense>
      </Breakdown>
    </>
  );
}
