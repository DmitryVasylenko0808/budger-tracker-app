import type { Metadata } from "next";
import {
  Breakdown,
  BreakdownChart,
  IncomeExpenseReport,
  IncomeExpenseSkeleton,
  Summary,
  SummarySkeleton,
} from "@/features/transactions/components";
import { Container } from "@/shared/ui";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
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
        <BreakdownChart type="INCOME" />
        <BreakdownChart type="EXPENSE" />
      </Breakdown>
    </>
  );
}
