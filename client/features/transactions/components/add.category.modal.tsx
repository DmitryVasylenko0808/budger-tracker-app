"use client";

import { Button, Loader, TextField } from "@/shared/ui";
import { Modal, ModalProps } from "@/shared/ui/modal";
import { useEffect } from "react";
import { useAddCategory } from "../hooks";

type AddCategoryModalProps = ModalProps & {
  type: TransactionType;
  afterSubmit?: () => void;
};

export const AddCategoryModal = ({
  type,
  afterSubmit,
  onClose,
  ...props
}: Readonly<AddCategoryModalProps>) => {
  const { state, formAction, isPending } = useAddCategory(type);

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
            {isPending ? <Loader variant="secondary" /> : "Add"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
