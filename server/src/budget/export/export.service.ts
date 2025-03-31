import { createObjectCsvStringifier } from 'csv-writer';

import { Injectable } from '@nestjs/common';

import { TransactionsService } from '../transactions/transactions.service';

@Injectable()
export class ExportService {
  constructor(private readonly transactionsService: TransactionsService) {}

  async exportTransactions(userId: number, categoryIds: number[]) {
    const data = await this.transactionsService.getAll(userId, 'desc', categoryIds);

    const cvsStringifier = createObjectCsvStringifier({
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

    const csvData = cvsStringifier.getHeaderString() + cvsStringifier.stringifyRecords(records);

    return csvData;
  }
}
