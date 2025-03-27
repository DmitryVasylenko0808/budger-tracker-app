'use server';

import { z } from 'zod';

import { redirect } from 'next/navigation';

import { AuthApi } from '../api';

const signUpSchema = z
  .object({
    name: z.string().min(2, 'Name must contain at least 2 characters').trim(),
    email: z.string().min(1, 'Email is required').email('Invalid email').trim(),
    password: z.string().min(8, 'Password must contain at least 8 characters').trim(),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type SignUpState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    server?: string;
  };
  success?: boolean;
} | null;

export const signUpAction = async (
  prevState: SignUpState,
  formData: FormData
): Promise<SignUpState> => {
  const validatedFields = signUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { confirmPassword, ...data } = validatedFields.data;
  const res = await AuthApi.signUp(data);

  if (res.error) {
    return {
      errors: {
        server: res.message,
      },
      success: false,
    };
  }

  redirect(`/email-confirm?email=${res.email}`);
};
