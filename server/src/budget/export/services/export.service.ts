import { Response } from 'express';

import { BadRequestException, Injectable } from '@nestjs/common';

import { ExportFactory } from '../providers/export-factory';
import { ExportTransactions } from '../types/export-transactions';

@Injectable()
export class ExportService {
  constructor(private readonly exportFactory: ExportFactory) {}

  async exportTransactions(exportParams: ExportTransactions, res: Response) {
    const { format, ...transactionsSelection } = exportParams;

    const exporter = this.exportFactory.createExport(format);

    if (!exporter) {
      throw new BadRequestException('Unsupported export type');
    }

    return await exporter.exportTransactions(transactionsSelection, res);
  }
}
