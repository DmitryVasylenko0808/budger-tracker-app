import { Container } from '@/shared/ui';

import { StatsApi } from '../api';
import { DashboardBlock } from './dashboard.block';
import { IncomeExpenseChart } from './income.expense.chart';

export const IncomeExpenseReport = async () => {
  const data = await StatsApi.getMonthly();

  const isNoData = !data || !data.length;

  return (
    <section className="pb-8">
      <Container>
        <DashboardBlock>
          <h2 className="mb-3 text-2xl font-semibold">Income & Expenses</h2>
          <div className="flex h-[480px] w-full flex-col justify-center">
            {isNoData ? (
              <p className="text-center text-lg text-gray-200">No Data</p>
            ) : (
              <IncomeExpenseChart data={data} />
            )}
          </div>
        </DashboardBlock>
      </Container>
    </section>
  );
};
