'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { usePagination } from '@/hooks';

import { Container, Loader } from '@/shared/ui';

import { CategoriesApi } from '../api';
import { ExportingTransactions } from './exporting.transactions';
import { TransactionsPaginationPanel } from './transaction.pagination.panel';
import { TransactionsTable } from './transactions.table';
import { TransactionsTableItem } from './transactions.table.item';

type CategoryTransactionsProps = {
  categoryId: number;
};

export const CategoryTransactions = ({ categoryId }: Readonly<CategoryTransactionsProps>) => {
  const { page, limit, onClickPrevPage, onClickNextPage, onChangeLimit } = usePagination();
  const {
    data: transactions,
    isLoading,
    isFetching,
    isError,
  } = useQuery<TransactionPagination>({
    queryKey: ['transactions', categoryId, page, limit],
    queryFn: () =>
      CategoriesApi.getTransactionsByCategory({
        id: categoryId,
        page,
        limit,
      }),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader variant="primary" size="lg" />
      </div>
    );
  }

  if (isError) {
    alert('Ooops... something went wrong');
  }

  return (
    <section className="pb-10">
      <Container>
        <div className="mb-4 flex justify-end">
          <ExportingTransactions categoryIds={[categoryId]} />
        </div>
        <div className="mb-2 flex justify-end gap-3">
          <TransactionsPaginationPanel
            page={page}
            limit={limit}
            totalPages={transactions?.totalPages || 1}
            onClickNextPage={onClickNextPage}
            onClickPrevPage={onClickPrevPage}
            onSelectLimit={onChangeLimit}
          />
        </div>
        <TransactionsTable isFetching={isFetching}>
          {transactions?.data?.map((tr) => <TransactionsTableItem data={tr} key={tr.id} />)}
        </TransactionsTable>
      </Container>
    </section>
  );
};
