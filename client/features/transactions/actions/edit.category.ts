import { z } from 'zod';

import { editCategory } from '../api';

const editCategorySchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
});

type EditCategoryState = {
  errors?: {
    name?: string[];
    server?: string;
  };
  success?: boolean;
} | null;

export const editCategoryAction = async (
  id: number,
  prevState: EditCategoryState,
  formData: FormData
): Promise<EditCategoryState> => {
  const validatedFields = editCategorySchema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const res = await editCategory({ id, ...validatedFields.data });

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
