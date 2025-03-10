import { Modal, ModalProps } from "@/shared/ui/modal";
import {
  Button,
  Loader,
  RadioGroup,
  Select,
  TextArea,
  TextField,
} from "@/shared/ui";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useActionState, useEffect, useState } from "react";
import { getCategories } from "../api";
import { addTransactionAction } from "../actions";

type AddTransactionModalProps = ModalProps;

export const AddTransactionModal = ({
  ...modalProps
}: AddTransactionModalProps) => {
  const [currentType, setCurrentType] = useState<TransactionType>("INCOME");
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories", currentType],
    queryFn: () => getCategories({ type: currentType }),
    enabled: !!modalProps.open,
  });
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
        .then(() => modalProps.onClose());
    }
  }, [state]);

  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentType(e.target.value as TransactionType);
  };

  const categoriesOptions = categories?.map((cat) => ({
    id: cat.id.toString(),
    value: cat.id,
    title: cat.name,
  }));

  return (
    <Modal title="Add Transaction" {...modalProps}>
      <form action={formAction}>
        <TextField
          label="Name"
          name="name"
          error={state?.errors?.name?.[0]}
          className="mb-6"
        />
        <TextField
          label="Amount"
          type="number"
          name="amount"
          error={state?.errors?.amount?.[0]}
          className="mb-6"
        />
        <RadioGroup
          label="Type"
          name="type"
          items={[
            { value: "INCOME", label: "Income" },
            { value: "EXPENSE", label: "Expense" },
          ]}
          value={currentType}
          onChange={handleChangeType}
        />
        <Select
          label="Category"
          name="categoryId"
          error={state?.errors?.categoryId?.[0]}
          options={categoriesOptions}
          className="mb-6"
        />
        <TextField
          label="Date"
          type="datetime-local"
          name="createdAt"
          error={state?.errors?.createdAt?.[0]}
          className="mb-6"
        />
        <TextArea label="Notes" name="notes" className="mb-6" />
        {state?.errors?.server && (
          <p className="mb-8 text-center text-sm text-error">Server error</p>
        )}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isPending}
          >
            {isPending ? <Loader variant="secondary" size="sm" /> : "Add"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
