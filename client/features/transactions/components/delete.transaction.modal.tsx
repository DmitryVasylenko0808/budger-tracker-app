import { Modal, ModalProps } from "@/shared/ui/modal";
import { Button, Loader } from "@/shared/ui";
import { useQueryClient } from "@tanstack/react-query";
import { useTransition } from "react";
import { deleteTransactionAction } from "../actions";

type DeleteTransactionsModalProps = ModalProps & { ids: number[] };

export const DeleteTransactionsModal = ({
  ids,
  ...modalProps
}: DeleteTransactionsModalProps) => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  const handleClickDelete = () =>
    startTransition(async () => {
      const res = await deleteTransactionAction(ids);

      if (res?.errors) {
        alert(res.errors.server);

        return;
      }

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      modalProps.onClose();
    });

  return (
    <Modal title="Delete Transactions" {...modalProps}>
      <h4 className="mb-4 text-black font-semibold">
        Do you really want to delete these transactions?
      </h4>
      <p className="mb-8 text-gray-200">
        If you decide to delete these transactions, this action cannot be undone
        and they will be permanently deleted.
      </p>
      <div className="flex justify-end">
        <Button
          variant="primary"
          size="lg"
          onClick={handleClickDelete}
          disabled={isPending}
        >
          {isPending ? <Loader variant="secondary" /> : "Delete"}
        </Button>
      </div>
    </Modal>
  );
};
