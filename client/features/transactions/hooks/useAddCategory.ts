import { useActionState } from 'react';

import { addCategoryAction } from '../actions';

export const useAddCategory = (type: TransactionType) => {
  const addCategoryActionWithType = addCategoryAction.bind(null, type);
  const [state, formAction, isPending] = useActionState(addCategoryActionWithType, null);

  return { state, formAction, isPending };
};
