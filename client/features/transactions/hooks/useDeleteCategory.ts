import { useState, useTransition } from 'react';

import { deleteCategoryAction, DeleteCategoryState } from '../actions/delete.category';

export const useDeleteCategory = (id: number) => {
  const [state, setState] = useState<DeleteCategoryState>(null);
  const [isPending, startTransition] = useTransition();

  const handleClick = () =>
    startTransition(async () => {
      const res = await deleteCategoryAction(id);

      if (!res?.success) {
        setState(res);
        alert(res?.errors?.server);

        return;
      }

      setState(res);
    });

  return { state, onDelete: handleClick, isPending };
};
