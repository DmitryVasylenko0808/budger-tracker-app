import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

import { Injectable } from '@nestjs/common';

import { TransactionsService } from 'src/budget/transactions/transactions.service';

import { IExportService } from '../interfaces/export-service.interface';
import {
  ExportTransactionsResult,
  ExportTransactionsSelection,
} from '../types/export-transactions';

(pdfMake as any).vfs = pdfFonts.vfs;

@Injectable()
export class PdfExportService implements IExportService {
  constructor(private readonly transactionsService: TransactionsService) {}

  async exportTransactions(
    selection: ExportTransactionsSelection
  ): Promise<ExportTransactionsResult> {
    const { userId, categoryIds } = selection;

    const data = await this.transactionsService.getAll(userId, 'desc', categoryIds);

    const docDefinition: TDocumentDefinitions = {
      content: {
        table: {
          body: [
            ['Name', 'Type', 'Amount', 'Category', 'Date'],
            ...data.map((tr) => [
              tr.name,
              tr.category.type,
              tr.amount,
              tr.category.name,
              tr.createdAt.toLocaleString(),
            ]),
          ],
        },
      },
    };

    const pdfDoc = pdfMake.createPdf(docDefinition);
    const buffer = await this.getBuffer(pdfDoc);

    return {
      contentType: 'application/pdf',
      fileName: 'transactions.pdf',
      data: buffer,
    };
  }

  private getBuffer(pdfDoc: pdfMake.TCreatedPdf) {
    return new Promise((resolve, reject) => {
      pdfDoc.getBuffer((buffer) => {
        resolve(buffer);
      });
    });
  }
}
