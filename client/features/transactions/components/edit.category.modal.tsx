'use client';

import { useEffect } from 'react';

import { Button, Loader, TextField } from '@/shared/ui';
import { Modal, ModalProps } from '@/shared/ui/modal';

import { useEditCategory } from '../hooks';

type EditCategoryModalProps = ModalProps & {
  category: Category;
  afterSubmit?: () => void;
};

export const EditCategoryModal = ({
  category,
  afterSubmit,
  onClose,
  ...props
}: Readonly<EditCategoryModalProps>) => {
  const { state, formAction, isPending } = useEditCategory(category.id);

  useEffect(() => {
    if (state?.success) {
      afterSubmit?.();
      onClose();
    }
  }, [state]);

  return (
    <Modal title="Edit Category" onClose={onClose} {...props}>
      <form action={formAction}>
        <TextField
          label="Name"
          name="name"
          defaultValue={category.name}
          error={state?.errors?.name?.[0]}
          className="mb-6"
        />
        {state?.errors?.server && (
          <p className="mb-8 text-center text-sm text-error">{state.errors.server}</p>
        )}
        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="lg" disabled={isPending}>
            {isPending ? <Loader variant="secondary" /> : 'Edit'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
