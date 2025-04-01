export type ExportFormat = 'csv' | 'xls' | 'pdf' | 'json';

export type ExportTransactions = {
  format: ExportFormat;
  userId: number;
  categoryIds: number[];
};

export type ExportTransactionsSelection = Omit<ExportTransactions, 'format'>;
