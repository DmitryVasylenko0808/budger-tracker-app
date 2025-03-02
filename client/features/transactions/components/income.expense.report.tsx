import { Container } from "@/shared/ui";
import { DashboardBlock } from "./dashboard.block";
import { IncomeExpenseChart } from "./income.expense.chart";
import { getMonthly } from "../api";

export const IncomeExpenseReport = async () => {
  const data = await getMonthly();

  const isNoData = !data || !data.length;

  return (
    <section className="pb-8">
      <Container>
        <DashboardBlock>
          <h2 className="mb-3 text-2xl font-semibold">Income & Expenses</h2>
          <div className="w-full h-[480px] flex flex-col justify-center">
            {isNoData ? (
              <p className="text-center text-gray-200 text-lg">No Data</p>
            ) : (
              <IncomeExpenseChart data={data} />
            )}
          </div>
        </DashboardBlock>
      </Container>
    </section>
  );
};
