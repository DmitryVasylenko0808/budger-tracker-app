import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TransactionsController],
  providers: [PrismaService, TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
