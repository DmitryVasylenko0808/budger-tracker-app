"use client";

import { Button, Menu } from "@/shared/ui";
import { Ellipsis } from "lucide-react";
import { DeleteCategoryModal } from "./delete.category.modal";
import { EditCategoryModal } from "./edit.category.modal";
import { useModal, useToggleMenu } from "@/hooks";
import { useRouter } from "next/navigation";

type CategoryItemProps = {
  category: Category;
  onEdit?: () => void;
  onDelete?: () => void;
};

export const CategoryItem = ({
  category,
  onEdit,
  onDelete,
}: Readonly<CategoryItemProps>) => {
  const { open, ref, onToggle } = useToggleMenu();
  const editModal = useModal();
  const deleteModal = useModal();
  const router = useRouter();

  const handleClick = () =>
    router.push(`/categories/${category.id}/transactions`);

  return (
    <li className="p-2 bg-gray-50  duration-100 hover:bg-gray-100/15 first:rounded-t-lg last:rounded-b-lg">
      <div className="flex items-center">
        <div className="flex-1">
          <h3 className="font-semibold text-black">
            <span
              className="cursor-pointer duration-100 hover:text-primary-200"
              onClick={handleClick}
            >
              {category.name}
            </span>
          </h3>
        </div>
        <div>
          <Menu
            open={open}
            trigger={
              <Button variant="text" onClick={onToggle}>
                <Ellipsis size={20} />
              </Button>
            }
            content={
              <ul className="w-32">
                <li>
                  <Button variant="menu" onClick={editModal.onOpen}>
                    Edit
                  </Button>
                </li>
                <li>
                  <Button variant="menu" onClick={deleteModal.onOpen}>
                    Delete
                  </Button>
                </li>
              </ul>
            }
            ref={ref}
          />
        </div>
      </div>
      <EditCategoryModal
        category={category}
        open={editModal.open}
        onClose={editModal.onClose}
        afterSubmit={onEdit}
      />
      <DeleteCategoryModal
        category={category}
        open={deleteModal.open}
        onClose={deleteModal.onClose}
        afterDelete={onDelete}
      />
    </li>
  );
};
