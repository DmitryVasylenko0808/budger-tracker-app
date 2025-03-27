'use server';

import { z } from 'zod';

import { AuthApi } from '../api';

const resetPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email').trim(),
});

export type ResetPasswordState = {
  errors?: {
    email?: string[];
    server?: string;
  };
  success?: boolean;
  message?: string;
} | null;

export const resetPasswordAction = async (
  prevState: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> => {
  const validatedFields = resetPasswordSchema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const res = await AuthApi.resetPassword(validatedFields.data);

  if (res.error) {
    return {
      errors: {
        server: res.message,
      },
      success: false,
    };
  }

  return {
    success: true,
    message: `We have sent an email to your address to confirm it. Please check your inbox. If you didn’t receive the email, you can request it again`,
  };
};
