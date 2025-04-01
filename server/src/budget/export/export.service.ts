import { Response } from 'express';

import { BadRequestException, Injectable } from '@nestjs/common';

import { TransactionsService } from '../transactions/transactions.service';
import { IExportService } from './interfaces/export-service.interface';
import { CsvExportService } from './services/csv-export.service';
import { JsonExportService } from './services/json-export.service';
import { XlsExportService } from './services/xls-export.service';
import { ExportFormat, ExportTransactions } from './types/export-transactions';

@Injectable()
export class ExportService {
  private readonly exportersMap: Map<ExportFormat, IExportService>;

  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly csvExportService: CsvExportService,
    private readonly jsonExportService: JsonExportService,
    private readonly xlsExportService: XlsExportService
  ) {
    this.exportersMap = new Map();

    this.exportersMap.set('csv', csvExportService);
    this.exportersMap.set('json', jsonExportService);
    this.exportersMap.set('xls', xlsExportService);
  }

  async exportTransactions(exportParams: ExportTransactions, res: Response) {
    const { format, ...transactionsSelection } = exportParams;

    const exporter = this.exportersMap.get(format);

    if (!exporter) {
      throw new BadRequestException('Unsupported export type');
    }

    return await exporter.exportTransactions(transactionsSelection, res);
  }
}
