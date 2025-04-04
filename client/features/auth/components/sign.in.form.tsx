'use client';

import { useActionState } from 'react';

import Link from 'next/link';

import { Button, Loader, TextField } from '@/shared/ui';

import { signInAction } from '../actions/sign.in';

export const SignInForm = () => {
  const [state, formAction, isPending] = useActionState(signInAction, null);

  return (
    <form action={formAction}>
      <h1 className="mb-12 text-center text-2xl font-semibold">Login</h1>
      <TextField
        label="Email"
        type="email"
        className="mb-6"
        name="email"
        error={state?.errors?.email?.[0]}
      />
      <TextField
        label="Password"
        type="password"
        className="mb-6"
        name="password"
        error={state?.errors?.password?.[0]}
      />

      {state?.errors?.server && (
        <p className="mb-8 text-center text-sm text-error">{state.errors.server}</p>
      )}

      <div className="mb-6 flex justify-center">
        <Link href="/reset-password" className="text-primary-100 underline">
          Forgot Password
        </Link>
      </div>

      <Button className="mb-5" variant="primary" size="lg" disabled={isPending} fullWidth>
        {isPending ? <Loader variant="secondary" /> : 'Sign In'}
      </Button>
    </form>
  );
};
