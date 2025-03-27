'use client';

import { useMutation } from '@tanstack/react-query';

import { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Loader } from '@/shared/ui';

import { AuthApi } from '../api';

export const VerifyingUserEmail = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ['verifying'],
    mutationFn: () => AuthApi.confirmEmail({ token: searchParams.get('token') as string }),
    onSettled: (data) => {
      if (data.error) {
        alert(data.message);
      } else {
        alert('Your email has been successfully verified. Log in to your account');
      }

      router.replace('/sign-in');
    },
  });

  useEffect(() => {
    mutate();
  }, []);

  return (
    <div>
      <h1 className="mb-12 text-center text-2xl font-semibold">Verifying your email</h1>
      <div className="flex items-center justify-center">
        {isPending && <Loader variant="primary" size="lg" />}
      </div>
    </div>
  );
};
