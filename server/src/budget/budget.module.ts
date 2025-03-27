import { Module } from '@nestjs/common';

import { CategoriesModule } from './categories/categories.module';
import { StatsModule } from './stats/stats.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ExportModule } from './export/export.module';

@Module({
  imports: [TransactionsModule, CategoriesModule, StatsModule, ExportModule],
})
export class BudgetModule {}
