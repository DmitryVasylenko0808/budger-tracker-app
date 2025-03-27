'use client';

import { useActionState, useEffect } from 'react';

import Link from 'next/link';

import { Button, Loader, TextField } from '@/shared/ui';

import { resetPasswordAction } from '../actions/reset.password';

export const ResetPasswordForm = () => {
  const [state, formAction, isPending] = useActionState(resetPasswordAction, null);

  useEffect(() => {
    if (state?.success) {
      alert(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <h1 className="mb-12 text-center text-2xl font-semibold">Reset Password</h1>
      <p className="mb-6 text-center font-medium text-gray-200">
        Please enter your email address, and we will send you a password reset link.
      </p>
      <TextField
        label="Email"
        type="email"
        name="email"
        error={state?.errors?.email?.[0]}
        className="mb-6"
      />
      {state?.errors?.server && (
        <p className="mb-8 text-center text-sm text-error">{state.errors.server}</p>
      )}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="mb-6"
        disabled={isPending}
        fullWidth
      >
        {isPending ? <Loader variant="secondary" size="sm" /> : 'Reset Password'}
      </Button>
      <div className="flex justify-center">
        <Link href="/sign-in" className="text-primary-100 underline">
          Back to Sign In
        </Link>
      </div>
    </form>
  );
};
