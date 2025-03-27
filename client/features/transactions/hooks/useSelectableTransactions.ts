import { useEffect, useState } from 'react';

type useSelectableTransactionsParams = {
  resetDependecies: any[];
  data?: Transaction[];
};

export const useSelectableTransactions = ({
  resetDependecies,
  data = [],
}: useSelectableTransactionsParams) => {
  const [selectedTransactionsIds, setSelectedTransactionsIds] = useState<number[]>([]);

  useEffect(() => {
    setSelectedTransactionsIds([]);
  }, [...resetDependecies]);

  const handleSelectAllTransactions = () => {
    if (data.length) {
      if (selectedTransactionsIds.length !== data.length) {
        const updatedSelectedTransactionsIds = data.map((tr) => tr.id);
        setSelectedTransactionsIds(updatedSelectedTransactionsIds);
      } else {
        setSelectedTransactionsIds([]);
      }
    }
  };

  const handleSelectTransactionId = (id: number) => {
    let updatedSelectedTransactionsIds: number[];

    if (selectedTransactionsIds.includes(id)) {
      updatedSelectedTransactionsIds = selectedTransactionsIds.filter((cId) => cId !== id);
    } else {
      updatedSelectedTransactionsIds = [...selectedTransactionsIds, id];
    }

    setSelectedTransactionsIds(updatedSelectedTransactionsIds);
  };

  return {
    selectedTransactionsIds,
    onSelectAllTransactions: handleSelectAllTransactions,
    onSelectTransactionId: handleSelectTransactionId,
  };
};
