import { Module } from '@nestjs/common';

import { ParseNumberArrayPipe } from 'src/common/pipes/parse-number-array.pipe';

import { TransactionsModule } from '../transactions/transactions.module';
import { ExportController } from './export.controller';
import { ExportService } from './export.service';

@Module({
  imports: [TransactionsModule],
  providers: [ExportService, ParseNumberArrayPipe],
  controllers: [ExportController],
})
export class ExportModule {}
