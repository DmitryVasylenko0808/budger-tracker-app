'use client';

import { useMutation } from '@tanstack/react-query';

import { useActionState } from 'react';

import { useSearchParams } from 'next/navigation';

import { Button, Loader, TextField } from '@/shared/ui';

import { twoFaVerifyAction } from '../actions/twofa.verify';
import { AuthApi } from '../api';

export const TwoFaForm = () => {
  const [state, formAction, isPending] = useActionState(twoFaVerifyAction, null);
  const searchParams = useSearchParams();
  const { mutate, isPending: isPendingResend } = useMutation({
    mutationKey: [],
    mutationFn: AuthApi.resendTwoFaCode,
    onSettled: (data) => {
      if (data?.error) {
        alert(data.message);
      }
    },
  });

  const handleClickResend = () => {
    const email = searchParams.get('email');

    if (!email) {
      alert('Invalid email');

      return;
    }

    mutate({ email });
  };

  return (
    <form action={formAction}>
      <h1 className="mb-12 text-center text-2xl font-semibold">Two-Factor Authentication</h1>
      <p className="mb-6 text-center font-medium text-gray-200">
        For your security, we’ve sent a 6-digit verification code to your email.
      </p>
      <TextField
        label="Verification Code"
        name="code"
        error={state?.errors?.code?.[0]}
        className="mb-6"
      />
      {state?.errors?.server && (
        <p className="mb-8 text-center text-sm text-error">{state.errors.server}</p>
      )}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="mb-3"
        disabled={isPending}
        fullWidth
      >
        {isPending ? <Loader variant="secondary" size="sm" /> : 'Verify'}
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="lg"
        disabled={isPendingResend}
        onClick={handleClickResend}
        fullWidth
      >
        {isPendingResend ? <Loader variant="tertiary" size="sm" /> : 'Resend Verification Code'}
      </Button>
    </form>
  );
};
