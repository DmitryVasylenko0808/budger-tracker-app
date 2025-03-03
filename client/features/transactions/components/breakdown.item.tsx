import { getBreakdown } from "../api";
import { BreakdownChart } from "./breakdown.chart";
import { DashboardBlock } from "./dashboard.block";

type BreakdownItemProps = {
  type: TransactionType;
};

export const BreakdownItem = async ({ type }: BreakdownItemProps) => {
  const data = await getBreakdown({ type });

  const title = (type === "INCOME" ? "Income" : "Expenses") + " Breakdown";

  return (
    <DashboardBlock className="flex-1">
      <h2 className="mb-7 text-2xl font-semibold">{title}</h2>
      <BreakdownChart type={type} data={data} />
    </DashboardBlock>
  );
};
