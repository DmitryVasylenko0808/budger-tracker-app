import { Module } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { CategoriesService } from './services/categories.service';
import { TransactionsController } from './controllers/transactions.controller';
import { CategoriesController } from './services/categories.controller';
import { PrismaService } from 'src/prisma.service';
import { StatsController } from './controllers/stats.controller';
import { StatsService } from './services/stats.service';

@Module({
  controllers: [TransactionsController, CategoriesController, StatsController],
  providers: [
    TransactionsService,
    CategoriesService,
    StatsService,
    PrismaService,
  ],
})
export class TransactionsModule {}
