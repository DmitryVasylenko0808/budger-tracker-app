import { Injectable } from '@nestjs/common';

import { IExportService } from '../interfaces/export-service.interface';
import { CsvExportService } from '../services/csv-export.service';
import { JsonExportService } from '../services/json-export.service';
import { PdfExportService } from '../services/pdf-export.service';
import { XlsExportService } from '../services/xls-export.service';
import { ExportFormat } from '../types/export-transactions';

@Injectable()
export class ExportFactory {
  constructor(
    private readonly csvExportService: CsvExportService,
    private readonly xlsExportService: XlsExportService,
    private readonly pdfExportService: PdfExportService,
    private readonly jsonExportService: JsonExportService
  ) {}

  createExporter(format: ExportFormat): IExportService {
    switch (format) {
      case 'csv':
        return this.csvExportService;
      case 'xls':
        return this.xlsExportService;
      case 'pdf':
        return this.pdfExportService;
      case 'json':
        return this.jsonExportService;
      default:
        return null;
    }
  }
}
