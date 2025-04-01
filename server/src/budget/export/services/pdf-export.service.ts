import { Response } from 'express';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

import { Injectable } from '@nestjs/common';

import { TransactionsService } from 'src/budget/transactions/transactions.service';

import { IExportService } from '../interfaces/export-service.interface';
import { ExportTransactionsSelection } from '../types/export-transactions';

(pdfMake as any).vfs = pdfFonts.vfs;

@Injectable()
export class PdfExportService implements IExportService {
  constructor(private readonly transactionsService: TransactionsService) {}

  async exportTransactions(selection: ExportTransactionsSelection, res: Response): Promise<void> {
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

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="transactions.pdf"',
    });

    res.end(buffer);
  }

  private getBuffer(pdfDoc: pdfMake.TCreatedPdf) {
    return new Promise((resolve, reject) => {
      pdfDoc.getBuffer((buffer) => {
        resolve(buffer);
      });
    });
  }
}
