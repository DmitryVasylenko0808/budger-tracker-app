import { Module } from '@nestjs/common';

import { ParseNumberArrayPipe } from 'src/common/pipes/parse-number-array.pipe';

import { TransactionsModule } from '../transactions/transactions.module';
import { ExportController } from './export.controller';
import { ExportFactory } from './providers/export-factory';
import { CsvExportService } from './services/csv-export.service';
import { ExportService } from './services/export.service';
import { JsonExportService } from './services/json-export.service';
import { PdfExportService } from './services/pdf-export.service';
import { XlsExportService } from './services/xls-export.service';

@Module({
  imports: [TransactionsModule],
  providers: [
    ParseNumberArrayPipe,
    ExportService,
    JsonExportService,
    CsvExportService,
    XlsExportService,
    PdfExportService,
    ExportFactory,
  ],
  controllers: [ExportController],
})
export class ExportModule {}
