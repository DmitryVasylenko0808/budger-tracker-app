import { Response } from 'express';

import { Injectable } from '@nestjs/common';

import { TransactionsService } from 'src/budget/transactions/transactions.service';

import { IExportService } from '../interfaces/export-service.interface';
import { ExportTransactionsSelection } from '../types/export-transactions';

@Injectable()
export class JsonExportService implements IExportService {
  constructor(private readonly transactionsService: TransactionsService) {}

  async exportTransactions(selection: ExportTransactionsSelection, res: Response): Promise<void> {
    const { userId, categoryIds } = selection;

    const data = await this.transactionsService.getAll(userId, 'desc', categoryIds);

    const records = data.map((tr) => ({
      name: tr.name,
      type: tr.category.type,
      amount: tr.amount,
      category: tr.category.name,
      date: tr.createdAt.toLocaleString(),
    }));

    const jsonData = JSON.stringify(records, null, 2);

    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="transactions.json"',
    });
    res.send(jsonData);
  }
}
