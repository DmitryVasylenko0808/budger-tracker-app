'use server';

import { AuthApi } from '../api';

type ResendConfirmationEmailState = {
  success: boolean;
  error?: string;
} | null;

export const resendConfirmationEmailAction = async (
  email: string
): Promise<ResendConfirmationEmailState> => {
  if (!email) {
    return {
      success: false,
      error: 'Invalid email',
    };
  }

  const res = await AuthApi.resendConfirmationEmail({ email });

  if (res.error) {
    return {
      success: false,
      error: res.message,
    };
  }

  return { success: true };
};
