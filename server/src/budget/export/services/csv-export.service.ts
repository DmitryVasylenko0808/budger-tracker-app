import { createObjectCsvStringifier } from 'csv-writer';

import { Injectable } from '@nestjs/common';

import { TransactionsService } from 'src/budget/transactions/transactions.service';

import { IExportService } from '../interfaces/export-service.interface';
import {
  ExportTransactionsResult,
  ExportTransactionsSelection,
} from '../types/export-transactions';

@Injectable()
export class CsvExportService implements IExportService {
  constructor(private readonly transactionsService: TransactionsService) {}

  async exportTransactions(
    selection: ExportTransactionsSelection
  ): Promise<ExportTransactionsResult> {
    const { userId, categoryIds } = selection;

    const data = await this.transactionsService.getAll(userId, 'desc', categoryIds);

    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: 'name', title: 'Name' },
        { id: 'type', title: 'Type' },
        { id: 'amount', title: 'Amount' },
        { id: 'category', title: 'Category' },
        { id: 'date', title: 'Date' },
      ],
    });

    const records = data.map((tr) => ({
      name: tr.name,
      type: tr.category.type,
      amount: tr.amount,
      category: tr.category.name,
      date: tr.createdAt.toLocaleString(),
    }));

    const csvData = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records);

    return {
      contentType: 'text/csv',
      fileName: 'transactions.csv',
      data: csvData,
    };
  }
}
