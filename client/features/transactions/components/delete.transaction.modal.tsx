import { Button, Loader } from '@/shared/ui';
import { Modal, ModalProps } from '@/shared/ui/modal';

import { useDeleteTransactions } from '../hooks';

type DeleteTransactionsModalProps = ModalProps & { ids: number[] };

export const DeleteTransactionsModal = ({
  ids,
  ...modalProps
}: Readonly<DeleteTransactionsModalProps>) => {
  const { state, onDelete, isPending } = useDeleteTransactions({
    ids,
    onSuccess: modalProps.onClose,
  });

  return (
    <Modal title="Delete Transactions" {...modalProps}>
      <h4 className="mb-4 font-semibold text-black">
        Do you really want to delete these transactions?
      </h4>
      <p className="mb-8 text-gray-200">
        If you decide to delete these transactions, this action cannot be undone and they will be
        permanently deleted.
      </p>
      <div className="flex justify-end">
        <Button variant="primary" size="lg" onClick={onDelete} disabled={isPending}>
          {isPending ? <Loader variant="secondary" /> : 'Delete'}
        </Button>
      </div>
    </Modal>
  );
};
