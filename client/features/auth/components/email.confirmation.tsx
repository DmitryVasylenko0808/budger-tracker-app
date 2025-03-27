'use client';

import { useTransition } from 'react';

import { useSearchParams } from 'next/navigation';

import { Button, Loader } from '@/shared/ui';

import { resendConfirmationEmailAction } from '../actions/resend.confirmation.email';

export const EmailConfirmation = () => {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleClickResend = () =>
    startTransition(async () => {
      const email = searchParams.get('email');

      const res = await resendConfirmationEmailAction(email as string);

      if (!res?.success) {
        alert(res?.error);
      }

      if (res?.success) {
        alert('The confirmation email has been successfully sent.');
      }
    });

  return (
    <div>
      <h1 className="mb-12 text-center text-2xl font-semibold">Email Confirmation</h1>
      <p className="mb-6 text-center font-medium text-gray-200">
        We have sent an email to your address to confirm it. Please check your inbox. If you didn’t
        receive the email, you can request it again.
      </p>
      <Button
        variant="primary"
        size="lg"
        disabled={isPending}
        fullWidth
        onClick={handleClickResend}
      >
        {isPending ? <Loader variant="secondary" size="sm" /> : 'Resend Confirmation Email'}
      </Button>
    </div>
  );
};

export default EmailConfirmation;
