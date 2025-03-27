import { z } from 'zod';

import { CategoriesApi } from '../api';

const addCategorySchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
});

type AddCategoryState = {
  errors?: {
    name?: string[];
    server?: string;
  };
  success?: boolean;
} | null;

export const addCategoryAction = async (
  type: TransactionType,
  prevState: AddCategoryState,
  formData: FormData
): Promise<AddCategoryState> => {
  const validatedFields = addCategorySchema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const res = await CategoriesApi.addCategory({ type, ...validatedFields.data });

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
