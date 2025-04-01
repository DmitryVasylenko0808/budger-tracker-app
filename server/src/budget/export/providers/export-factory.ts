import { Injectable } from '@nestjs/common';

import { IExportService } from '../interfaces/export-service.interface';
import { CsvExportService } from '../services/csv-export.service';
import { JsonExportService } from '../services/json-export.service';
import { XlsExportService } from '../services/xls-export.service';
import { ExportFormat } from '../types/export-transactions';

@Injectable()
export class ExportFactory {
  constructor(
    private readonly csvExportService: CsvExportService,
    private readonly xlsExportService: XlsExportService,
    private readonly jsonExportService: JsonExportService
  ) {}

  createExport(format: ExportFormat): IExportService {
    switch (format) {
      case 'csv':
        return this.csvExportService;
      case 'xls':
        return this.xlsExportService;
      case 'json':
        return this.jsonExportService;
      default:
        return null;
    }
  }
}
