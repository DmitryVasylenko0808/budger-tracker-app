"use client";

import { Container, Loader } from "@/shared/ui";
import { TransactionsTable } from "./transactions.table";
import { TransactionsTableItem } from "./transactions.table.item";
import { TransactionsPaginationPanel } from "./transaction.pagination.panel";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { usePagination } from "@/hooks";
import { getTransactionsByCategory } from "../api";

type CategoryTransactionsProps = {
  categoryId: number;
};

export const CategoryTransactions = ({
  categoryId,
}: Readonly<CategoryTransactionsProps>) => {
  const { page, limit, onClickPrevPage, onClickNextPage, onChangeLimit } =
    usePagination();
  const {
    data: transactions,
    isLoading,
    isFetching,
    isError,
  } = useQuery<TransactionPagination>({
    queryKey: ["transactions", categoryId, page, limit],
    queryFn: () =>
      getTransactionsByCategory({
        id: categoryId,
        page,
        limit,
      }),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return (
      <div className="py-10 flex justify-center">
        <Loader variant="primary" size="lg" />
      </div>
    );
  }

  if (isError) {
    alert("Oopsss... something went wrong");
  }

  return (
    <section className="pb-10">
      <Container>
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
          {transactions?.data?.map((tr) => (
            <TransactionsTableItem data={tr} key={tr.id} />
          ))}
        </TransactionsTable>
      </Container>
    </section>
  );
};
