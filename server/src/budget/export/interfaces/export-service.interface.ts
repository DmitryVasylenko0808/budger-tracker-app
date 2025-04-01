import { Response } from 'express';

import { ExportTransactionsSelection } from '../types/export-transactions';

export interface IExportService {
  exportTransactions(selection: ExportTransactionsSelection, res: Response): Promise<void>;
}
