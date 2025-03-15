"use client";

import { Button, Loader } from "@/shared/ui";
import { Modal, ModalProps } from "@/shared/ui/modal";
import { useEffect } from "react";
import { useDeleteCategory } from "../hooks";

type DeleteCategoryModalProps = ModalProps & {
  category: Category;
  afterDelete?: () => void;
};

export const DeleteCategoryModal = ({
  category,
  afterDelete,
  onClose,
  ...modalProps
}: Readonly<DeleteCategoryModalProps>) => {
  const { state, onDelete, isPending } = useDeleteCategory(category.id);

  useEffect(() => {
    if (state?.success) {
      afterDelete?.();
      onClose();
    }
  }, [state]);

  return (
    <Modal title="Delete Category" onClose={onClose} {...modalProps}>
      <h4 className="mb-4 text-black font-semibold">{`Do you really want to delete the category "${category.name}"?`}</h4>
      <p className="mb-8 text-gray-200">
        If you delete the category, all transactions related to this category
        will be permanently deleted.
      </p>
      <div className="flex justify-end">
        <Button
          variant="primary"
          size="lg"
          onClick={onDelete}
          disabled={isPending}
        >
          {isPending ? <Loader variant="secondary" /> : "Delete"}
        </Button>
      </div>
    </Modal>
  );
};
