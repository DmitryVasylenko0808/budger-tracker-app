import { useQueryClient } from '@tanstack/react-query';

import { useActionState, useEffect } from 'react';

import { editTransactionAction } from '../actions';

type useEditTransactionParams = {
  id: number;
  onSuccess?: () => void;
};

export const useEditTransaction = ({ id, onSuccess }: useEditTransactionParams) => {
  const editTransactionActionWithId = editTransactionAction.bind(null, id);
  const [state, formAction, isPending] = useActionState(editTransactionActionWithId, null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (state?.success) {
      queryClient
        .invalidateQueries({
          queryKey: ['transactions'],
        })
        .then(() => onSuccess?.());
    }
  }, [state]);

  return { state, onEdit: formAction, isPending };
};
