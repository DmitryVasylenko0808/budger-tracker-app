"use client";

import { Button } from "@/shared/ui";
import { Pencil, Plus, Trash } from "lucide-react";
import { AddTransactionModal } from "./add.transaction.modal";
import { EditTransactionModal } from "./edit.transaction.modal";
import { DeleteTransactionsModal } from "./delete.transaction.modal";
import { useModal } from "@/hooks";

type TransactionsActionsProps = {
  selectedTransactionsIds: number[];
};

export const TransactionsActions = ({
  selectedTransactionsIds,
}: Readonly<TransactionsActionsProps>) => {
  const addModal = useModal();
  const editModal = useModal();
  const deleteNodal = useModal();

  const isOpenEdit = editModal.open && !!selectedTransactionsIds[0];
  const isOpenDelete = deleteNodal.open && !!selectedTransactionsIds.length;

  return (
    <div className="flex gap-2">
      <Button variant="primary" onClick={addModal.onOpen}>
        <Plus size={20} />
        Add
      </Button>
      <Button
        variant="secondary"
        disabled={selectedTransactionsIds.length !== 1}
        onClick={editModal.onOpen}
      >
        <Pencil size={20} />
        Edit
      </Button>
      <Button
        variant="secondary"
        disabled={selectedTransactionsIds.length < 1}
        onClick={deleteNodal.onOpen}
      >
        <Trash size={20} />
        Delete
      </Button>

      <AddTransactionModal open={addModal.open} onClose={addModal.onClose} />
      <EditTransactionModal
        transactionId={selectedTransactionsIds[0]}
        open={isOpenEdit}
        onClose={editModal.onClose}
      />
      <DeleteTransactionsModal
        ids={selectedTransactionsIds}
        open={isOpenDelete}
        onClose={deleteNodal.onClose}
      />
    </div>
  );
};
