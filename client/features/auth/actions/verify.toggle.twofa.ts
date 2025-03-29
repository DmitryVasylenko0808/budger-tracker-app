'use server';

import { z } from 'zod';

import { revalidatePath } from 'next/cache';

import { AuthApi } from '../api';

const verifyToggleTwoFaSchema = z.object({
  code: z.string().min(1, 'Code is required').trim(),
});

type VerifyToggleTwoFaState = {
  errors?: {
    code?: string[];
    server?: string;
  };
  success: boolean;
  message?: string;
} | null;

export const verifyToggleTwoFaAction = async (
  orevState: VerifyToggleTwoFaState,
  formData: FormData
): Promise<VerifyToggleTwoFaState> => {
  const validatedFields = verifyToggleTwoFaSchema.safeParse({
    code: formData.get('code'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { code } = validatedFields.data;

  const res = await AuthApi.verifyToggleTwoFa({ code });

  if (res.error) {
    return {
      success: false,
      errors: {
        server: res.message,
      },
    };
  }

  revalidatePath('/profile');

  return { success: true };
};
