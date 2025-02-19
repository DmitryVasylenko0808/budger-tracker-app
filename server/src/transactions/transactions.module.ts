import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CategoriesService } from './categories.service';
import { TransactionsController } from './transactions.controller';
import { CategoriesController } from './categories.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TransactionsController, CategoriesController],
  providers: [TransactionsService, CategoriesService, PrismaService],
})
export class TransactionsModule {}
