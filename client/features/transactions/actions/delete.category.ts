import { CategoriesApi } from '../api';

export type DeleteCategoryState = {
  errors?: {
    server?: string;
  };
  success?: boolean;
} | null;

export const deleteCategoryAction = async (id: number): Promise<DeleteCategoryState> => {
  const res = await CategoriesApi.deleteCategory({ id });

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
