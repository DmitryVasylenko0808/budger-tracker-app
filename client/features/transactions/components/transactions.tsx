'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { usePagination } from '@/hooks';

import { Container, Loader } from '@/shared/ui';

import { TransactionsApi } from '../api';
import { useFilterTransactions, useSelectableTransactions } from '../hooks';
import { ExportingTransactions } from './exporting.transactions';
import { TransactionsActions } from './transacitons.actions';
import { TransactionsPaginationPanel } from './transaction.pagination.panel';
import { TransactionsFilterMenu } from './transactions.filter.menu';
import { TransactionsTable } from './transactions.table';
import { TransactionsTableItem } from './transactions.table.item';

export const Transactions = () => {
  const { selectedCategoryIds, onSelectCategoryId } = useFilterTransactions();
  const { page, limit, onClickNextPage, onClickPrevPage, onChangeLimit } =
    usePagination(selectedCategoryIds);
  const {
    data: transactions,
    isLoading,
    isFetching,
  } = useQuery<TransactionPagination>({
    queryKey: ['transactions', page, limit, selectedCategoryIds],
    queryFn: () =>
      TransactionsApi.getTransactions({
        page: page,
        limit: limit,
        category_ids: selectedCategoryIds,
      }),
    placeholderData: keepPreviousData,
  });
  const { selectedTransactionsIds, onSelectAllTransactions, onSelectTransactionId } =
    useSelectableTransactions({
      data: transactions?.data,
      resetDependecies: [page, limit, selectedCategoryIds, transactions],
    });

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader variant="primary" size="lg" />
      </div>
    );
  }

  return (
    <section className="pb-10">
      <Container>
        <div className="mb-2 flex justify-end gap-3">
          <TransactionsFilterMenu
            selectedCategoryIds={selectedCategoryIds}
            onSelectCategoryId={onSelectCategoryId}
          />
          <ExportingTransactions categoryIds={selectedCategoryIds} />
          <TransactionsActions selectedTransactionsIds={selectedTransactionsIds} />
        </div>
        <TransactionsPaginationPanel
          page={page}
          limit={limit}
          totalPages={transactions?.totalPages || 1}
          onClickPrevPage={onClickPrevPage}
          onClickNextPage={onClickNextPage}
          onSelectLimit={onChangeLimit}
        />
        <TransactionsTable
          isFetching={isFetching}
          selectedAll={selectedTransactionsIds.length === transactions?.data.length}
          onSelectAll={onSelectAllTransactions}
        >
          {transactions?.data.map((tr) => (
            <TransactionsTableItem
              data={tr}
              key={tr.id}
              selected={selectedTransactionsIds.includes(tr.id)}
              onSelect={() => onSelectTransactionId(tr.id)}
            />
          ))}
        </TransactionsTable>
      </Container>
    </section>
  );
};
