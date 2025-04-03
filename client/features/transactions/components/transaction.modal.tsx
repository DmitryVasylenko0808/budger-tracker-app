'use client';

import { useQuery } from '@tanstack/react-query';

import { Loader } from '@/shared/ui';
import { Modal, ModalProps } from '@/shared/ui/modal';

import { TransactionsApi } from '../api';

type TransactionModalProps = ModalProps & {
  transactionId: number;
};

export const TransactionModal = ({ transactionId, ...props }: Readonly<TransactionModalProps>) => {
  const { data, isFetching, isError } = useQuery<Transaction>({
    queryKey: ['transactions', transactionId],
    queryFn: () => TransactionsApi.getOneTransaction({ id: transactionId }),
    enabled: !!props.open,
  });

  const date = data && new Date(data.createdAt).toLocaleString();

  if (isFetching) {
    return (
      <Modal title="Transaction Details" {...props}>
        <div className="flex w-full justify-center py-10">
          <Loader variant="primary" size="lg" />
        </div>
      </Modal>
    );
  }

  if (isError) {
    alert('Ooops... something went wrong');
  }

  return (
    <Modal title="Transaction Details" {...props}>
      <div className="flex flex-col space-y-4">
        <div>
          <span className="mb-0.5 block font-semibold text-black">Name</span>
          <span className="block text-gray-200">{data?.name}</span>
        </div>
        <div>
          <span className="mb-0.5 block font-semibold text-black">Type</span>
          <span className="block text-gray-200">{data?.category.type}</span>
        </div>
        <div>
          <span className="mb-0.5 block font-semibold text-black">Category</span>
          <span className="block text-gray-200">{data?.category.name}</span>
        </div>
        <div>
          <span className="mb-0.5 block font-semibold text-black">Amount</span>
          <span className="block text-gray-200">{data?.amount}</span>
        </div>
        <div>
          <span className="mb-1 block font-semibold text-black">Date</span>
          <span className="block text-gray-200">{date}</span>
        </div>
        {data?.notes && (
          <div>
            <span className="mb-0.5 block font-semibold text-black">Notes</span>
            <span className="block text-gray-200">{data.notes}</span>
          </div>
        )}
      </div>
    </Modal>
  );
};
