"use client";

import { Button, TextField } from "@/shared/ui";
import { Modal, ModalProps } from "@/shared/ui/modal";
import { LoaderCircle } from "lucide-react";
import { useActionState, useEffect } from "react";
import { addCategoryAction } from "../actions/add.category";

type AddCategoryModalProps = ModalProps & {
  type: TransactionType;
  afterSubmit?: () => void;
};

export const AddCategoryModal = ({
  type,
  afterSubmit,
  onClose,
  ...props
}: AddCategoryModalProps) => {
  const addCategoryActionWithType = addCategoryAction.bind(null, type);
  const [state, formAction, isPending] = useActionState(
    addCategoryActionWithType,
    null
  );

  useEffect(() => {
    if (state?.success) {
      afterSubmit?.();
      onClose();
    }
  }, [state]);

  const label = `${type === "INCOME" ? "Income" : "Expense"} name`;

  return (
    <Modal onClose={onClose} {...props}>
      <form action={formAction}>
        <TextField
          label={label}
          name="name"
          error={state?.errors?.name?.[0]}
          className="mb-6"
        />
        {state?.errors?.server && (
          <p className="mb-8 text-center text-sm text-error">
            {state.errors.server}
          </p>
        )}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isPending}
          >
            {isPending ? (
              <LoaderCircle size={20} className="text-white animate-spin" />
            ) : (
              "Add"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
