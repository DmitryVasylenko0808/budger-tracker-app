import { Transaction } from '@prisma/client';

type TransactionsPaginationItem = Omit<Transaction, 'notes'>;

export type TransactionsPagination = {
  data: TransactionsPaginationItem[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};
