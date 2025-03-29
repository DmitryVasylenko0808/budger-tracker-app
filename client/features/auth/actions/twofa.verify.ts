'use server';

import { z } from 'zod';

import { redirect } from 'next/navigation';

import { createSession } from '@/lib/session';

import { AuthApi } from '../api';

const twoFaVerifySchema = z.object({
  code: z.string().min(1, 'Code is required').trim(),
});

export type TwoFaVerifyState = {
  errors?: {
    code?: string[];
    server?: string;
  };
  success?: boolean;
  message?: string;
} | null;

export const twoFaVerifyAction = async (
  prevState: TwoFaVerifyState,
  formData: FormData
): Promise<TwoFaVerifyState> => {
  const validatedFields = twoFaVerifySchema.safeParse({
    code: formData.get('code'),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, success: false };
  }

  const res = await AuthApi.twoFaVerify(validatedFields.data);

  if (res.error) {
    return {
      errors: {
        server: res.message,
      },
      success: false,
    };
  }

  await createSession(res.access_token);
  redirect('/dashboard');
};
