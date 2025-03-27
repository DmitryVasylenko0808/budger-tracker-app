import { Module } from '@nestjs/common';

import { TransactionsModule } from '../transactions/transactions.module';
import { ExportService } from './export.service';
import { ExportController } from './export.controller';

@Module({
  imports: [TransactionsModule],
  providers: [ExportService],
  controllers: [ExportController],
})
export class ExportModule {}
