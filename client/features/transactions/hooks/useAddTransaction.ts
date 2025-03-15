import { useQueryClient } from "@tanstack/react-query";
import { useActionState, useEffect } from "react";
import { addTransactionAction } from "../actions";

type useAddTransactionParams = {
  onSuccess?: () => void;
};

export const useAddTransaction = ({ onSuccess }: useAddTransactionParams) => {
  const [state, formAction, isPending] = useActionState(
    addTransactionAction,
    null
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    if (state?.success) {
      queryClient
        .invalidateQueries({
          queryKey: ["transactions"],
        })
        .then(() => onSuccess?.());
    }
  }, [state]);

  return { state, onAdd: formAction, isPending };
};
