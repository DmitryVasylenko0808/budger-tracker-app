import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CategoriesService } from './categories.service';
import { TransactionsController } from './transactions.controller';
import { CategoriesController } from './categories.controller';
import { PrismaService } from 'src/prisma.service';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

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
