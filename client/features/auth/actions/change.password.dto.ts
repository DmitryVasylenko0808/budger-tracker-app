'use server';

import { z } from 'zod';

import { changePassword } from '../api';

const changePasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must contain at least 8 characters').trim(),
    confirmPassword: z.string().min(8, 'Password must contain at least 8 characters').trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ChangePasswordState = {
  errors?: {
    password?: string[];
    confrimPassword?: string[];
    server?: string;
  };
  invalidToken?: boolean;
  success?: boolean;
  message?: string;
} | null;

export const changePasswordAction = async (
  token: string | null,
  prevState: ChangePasswordState,
  formData: FormData
): Promise<ChangePasswordState> => {
  if (!token) {
    return { invalidToken: true, success: false, message: 'Invalid token' };
  }

  const validatedFields = changePasswordSchema.safeParse({
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const data = { password: validatedFields.data.password, token };

  const res = await changePassword(data);

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
    message: 'Your password has been successfully changed',
  };
};
