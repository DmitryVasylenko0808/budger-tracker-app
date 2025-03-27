'use client';

import { useQuery } from '@tanstack/react-query';

import { useEffect, useState } from 'react';

import { Button, Loader, RadioGroup, Select, TextArea, TextField } from '@/shared/ui';
import { Modal, ModalProps } from '@/shared/ui/modal';

import { CategoriesApi, TransactionsApi } from '../api';
import { useEditTransaction } from '../hooks';

type EditTransactionModalProps = ModalProps & { transactionId: number };

export const EditTransactionModal = ({
  transactionId,
  ...modalProps
}: Readonly<EditTransactionModalProps>) => {
  const [currentType, setCurrentType] = useState<TransactionType>('INCOME');
  const [currentCategory, setCurrentCategory] = useState(0);

  const { data: transaction, isLoading } = useQuery<Transaction>({
    queryKey: ['transactions', transactionId],
    queryFn: () => TransactionsApi.getOneTransaction({ id: transactionId }),
    enabled: !!modalProps.open,
  });
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['categories', currentType],
    queryFn: () => CategoriesApi.getCategories({ type: currentType }),
    enabled: !!modalProps.open,
  });
  const { state, onEdit, isPending } = useEditTransaction({
    id: transactionId,
    onSuccess: modalProps.onClose,
  });

  useEffect(() => {
    if (transaction) {
      setCurrentType(transaction.category.type);
      setCurrentCategory(transaction.categoryId);
    }
  }, [transaction]);

  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentType(e.target.value as TransactionType);
  };

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentCategory(Number(e.target.value));
  };

  const date = transaction?.createdAt && new Date(transaction?.createdAt);
  const formattedDate = date?.toISOString().slice(0, 16);

  const categoriesOptions = categories?.map((cat) => ({
    id: cat.id.toString(),
    value: cat.id,
    title: cat.name,
  }));

  if (isLoading) {
    <Modal title="Edit Transaction" {...modalProps}>
      <div className="h-56 items-center justify-center">
        <Loader variant="primary" size="lg" />
      </div>
    </Modal>;
  }

  return (
    <Modal title="Edit Transaction" {...modalProps}>
      <form action={onEdit}>
        <TextField
          label="Name"
          name="name"
          error={state?.errors?.name?.[0]}
          defaultValue={transaction?.name}
          className="mb-6"
        />
        <TextField
          label="Amount"
          type="number"
          name="amount"
          defaultValue={transaction?.amount}
          error={state?.errors?.amount?.[0]}
          className="mb-6"
        />
        <RadioGroup
          label="Type"
          name="type"
          items={[
            { value: 'INCOME', label: 'Income' },
            { value: 'EXPENSE', label: 'Expense' },
          ]}
          value={currentType}
          onChange={handleChangeType}
        />
        <Select
          label="Category"
          name="categoryId"
          error={state?.errors?.categoryId?.[0]}
          options={categoriesOptions}
          value={currentCategory}
          className="mb-6"
          onChange={handleChangeCategory}
        />
        <TextField
          label="Date"
          type="datetime-local"
          name="createdAt"
          error={state?.errors?.createdAt?.[0]}
          defaultValue={formattedDate}
          className="mb-6"
        />
        <TextArea label="Notes" name="notes" defaultValue={transaction?.notes} className="mb-6" />
        {state?.errors?.server && (
          <p className="mb-8 text-center text-sm text-error">Server error</p>
        )}
        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="lg" disabled={isPending}>
            {isPending ? <Loader variant="secondary" size="sm" /> : 'Edit'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
