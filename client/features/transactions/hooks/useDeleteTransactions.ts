import { useQueryClient } from '@tanstack/react-query';

import { useState, useTransition } from 'react';

import { deleteTransactionAction, DeleteTransactionState } from '../actions/delete.transaction';

type useDeleteTransactionsParams = {
  ids: number[];
  onSuccess?: () => void;
};

export const useDeleteTransactions = ({ ids, onSuccess }: useDeleteTransactionsParams) => {
  const [state, setState] = useState<DeleteTransactionState>(null);
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const handleClick = () =>
    startTransition(async () => {
      const res = await deleteTransactionAction(ids);

      if (!res?.success) {
        setState(res);
        alert(res?.errors?.server);

        return;
      }

      setState(res);
      queryClient.invalidateQueries({ queryKey: ['transactions'] }).then(() => onSuccess?.());
    });

  return { state, onDelete: handleClick, isPending };
};
