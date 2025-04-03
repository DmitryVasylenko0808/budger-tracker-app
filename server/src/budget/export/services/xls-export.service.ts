import * as ExcelJS from 'exceljs';

import { Injectable } from '@nestjs/common';

import { TransactionsService } from 'src/budget/transactions/transactions.service';

import { IExportService } from '../interfaces/export-service.interface';
import {
  ExportTransactionsResult,
  ExportTransactionsSelection,
} from '../types/export-transactions';

@Injectable()
export class XlsExportService implements IExportService {
  constructor(private readonly transactionsService: TransactionsService) {}

  async exportTransactions(
    selection: ExportTransactionsSelection
  ): Promise<ExportTransactionsResult> {
    const { userId, categoryIds } = selection;

    const data = await this.transactionsService.getAll(userId, 'desc', categoryIds);

    const workBook = new ExcelJS.Workbook();
    const workSheet = workBook.addWorksheet('Transactions');

    workSheet.columns = [
      { header: 'Name', key: 'name', width: 50 },
      { header: 'Type', key: 'type', width: 20 },
      { header: 'Amount', key: 'amount', width: 25 },
      { header: 'Category', key: 'category', width: 25 },
      { header: 'Date', key: 'date', width: 20 },
    ];

    const records = data.map((tr) => ({
      name: tr.name,
      type: tr.category.type,
      amount: tr.amount,
      category: tr.category.name,
      date: tr.createdAt.toLocaleString(),
    }));

    workSheet.addRows(records);

    const buffer = await workBook.xlsx.writeBuffer();

    return {
      contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      fileName: 'transactions.xlsx',
      data: buffer,
    };
  }
}
