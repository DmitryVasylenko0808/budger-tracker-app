import { Module } from '@nestjs/common';

import { CategoriesModule } from './categories/categories.module';
import { StatsModule } from './stats/stats.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [TransactionsModule, CategoriesModule, StatsModule],
})
export class BudgetModule {}
