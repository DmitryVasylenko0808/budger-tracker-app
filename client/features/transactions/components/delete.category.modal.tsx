"use client";

import { Button } from "@/shared/ui";
import { Modal, ModalProps } from "@/shared/ui/modal";
import { LoaderCircle } from "lucide-react";
import { useTransition } from "react";
import { deleteCategoryAction } from "../actions/delete.category";

type DeleteCategoryModalProps = ModalProps & {
  category: Category;
  afterDelete?: () => void;
};

export const DeleteCategoryModal = ({
  category,
  afterDelete,
  onClose,
  ...modalProps
}: DeleteCategoryModalProps) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () =>
    startTransition(async () => {
      const res = await deleteCategoryAction(category.id);

      if (!res?.success) {
        alert(res?.errors?.server);

        return;
      }

      afterDelete?.();
      onClose();
    });

  return (
    <Modal title="Delete Category" onClose={onClose} {...modalProps}>
      <h4 className="mb-4 text-black font-semibold">{`Do you really want to delete the category "${category.name}"`}</h4>
      <p className="mb-8 text-gray-200">
        If you delete the category, all transactions related to this category
        will be permanently deleted.
      </p>
      <div className="flex justify-end">
        <Button
          variant="primary"
          size="lg"
          onClick={handleClick}
          disabled={isPending}
        >
          {isPending ? (
            <LoaderCircle size={20} className="text-white animate-spin" />
          ) : (
            "Delete"
          )}
        </Button>
      </div>
    </Modal>
  );
};
