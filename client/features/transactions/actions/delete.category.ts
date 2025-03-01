import { deleteCategory } from "../api";

type DeleteCategoryState = {
  errors?: {
    server?: string;
  };
  success?: boolean;
} | null;

export const deleteCategoryAction = async (
  id: number
): Promise<DeleteCategoryState> => {
  const res = await deleteCategory({ id });

  if (res.error) {
    return {
      errors: {
        server: res.message,
      },
      success: false,
    };
  }

  return { success: true };
};
