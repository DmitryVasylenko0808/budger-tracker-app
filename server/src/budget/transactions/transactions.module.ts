import { Module } from '@nestjs/common';

import { ExportService } from './services/export.service';
import { TransactionsService } from './services/transactions.service';
import { TransactionsController } from './transactions.controller';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, ExportService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
