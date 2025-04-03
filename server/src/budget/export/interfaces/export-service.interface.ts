import {
  ExportTransactionsResult,
  ExportTransactionsSelection,
} from '../types/export-transactions';

export interface IExportService {
  exportTransactions(selection: ExportTransactionsSelection): Promise<ExportTransactionsResult>;
}
