import { Container } from '@/shared/ui';

import { getSummary } from '../api';
import { DashboardBlock } from './dashboard.block';

export const Summary = async () => {
  const data = await getSummary();

  return (
    <section className="pb-8">
      <Container>
        <div className="flex gap-3">
          <DashboardBlock className="flex-1">
            <p className="mb-0.5 font-normal text-gray-200">Total Incomes</p>
            <p className="text-2xl font-semibold text-black">{data.totalIncomes}</p>
          </DashboardBlock>
          <DashboardBlock className="flex-1">
            <p className="mb-0.5 font-normal text-gray-200">Total Expenses</p>
            <p className="text-2xl font-semibold text-black">{data.totalExpenses}</p>
          </DashboardBlock>
          <DashboardBlock className="flex-1">
            <p className="mb-0.5 font-normal text-gray-200">Balance</p>
            <p className="text-2xl font-semibold text-black">{data.balance}</p>
          </DashboardBlock>
        </div>
      </Container>
    </section>
  );
};
