import { useActionState } from "react";
import { editCategoryAction } from "../actions";

export const useEditCategory = (id: number) => {
  const editCategoryActionWithId = editCategoryAction.bind(null, id);
  const [state, formAction, isPending] = useActionState(
    editCategoryActionWithId,
    null
  );

  return { state, formAction, isPending };
};
