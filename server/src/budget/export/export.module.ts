import { Module } from '@nestjs/common';

import { ParseNumberArrayPipe } from 'src/common/pipes/parse-number-array.pipe';

import { TransactionsModule } from '../transactions/transactions.module';
import { ExportController } from './export.controller';
import { ExportService } from './export.service';
import { CsvExportService } from './services/csv-export.service';
import { JsonExportService } from './services/json-export.service';
import { XlsExportService } from './services/xls-export.service';

@Module({
  imports: [TransactionsModule],
  providers: [
    ExportService,
    ParseNumberArrayPipe,
    JsonExportService,
    CsvExportService,
    XlsExportService,
  ],
  controllers: [ExportController],
})
export class ExportModule {}
