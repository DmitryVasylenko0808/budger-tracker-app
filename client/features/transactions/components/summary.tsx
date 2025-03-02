import { Container } from "@/shared/ui";
import { DashboardBlock } from "./dashboard.block";
import { getSummary } from "../api";

export const Summary = async () => {
  const data = await getSummary();

  return (
    <section className="pb-8">
      <Container>
        <div className="flex gap-3">
          <DashboardBlock className="flex-1">
            <p className="mb-0.5 text-gray-200 font-normal">Total Incomes</p>
            <p className="text-2xl text-black font-semibold">
              {data.totalIncomes}
            </p>
          </DashboardBlock>
          <DashboardBlock className="flex-1">
            <p className="mb-0.5 text-gray-200 font-normal">Total Expenses</p>
            <p className="text-2xl text-black font-semibold">
              {data.totalExpenses}
            </p>
          </DashboardBlock>
          <DashboardBlock className="flex-1">
            <p className="mb-0.5 text-gray-200 font-normal">Balance</p>
            <p className="text-2xl text-black font-semibold">{data.balance}</p>
          </DashboardBlock>
        </div>
      </Container>
    </section>
  );
};
