export type ExportFormat = 'csv' | 'xls' | 'json';

export type ExportTransactions = {
  format: ExportFormat;
  userId: number;
  categoryIds: number[];
};

export type ExportTransactionsSelection = Omit<ExportTransactions, 'format'>;
