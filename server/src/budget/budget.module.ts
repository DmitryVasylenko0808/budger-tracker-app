import { Module } from '@nestjs/common';
import { TransactionsModule } from './transactions/transactions.module';
import { CategoriesModule } from './categories/categories.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [TransactionsModule, CategoriesModule, StatsModule]
})
export class BudgetModule {}
