import { Module } from '@nestjs/common';

import { CategoriesModule } from '../categories/categories.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
  imports: [TransactionsModule, CategoriesModule],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
