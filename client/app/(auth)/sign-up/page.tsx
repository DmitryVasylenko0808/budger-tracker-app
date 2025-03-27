import { SignUpForm, SocialsSignIn, WithAccount } from '@/features/auth/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function SignUpPage() {
  return (
    <>
      <SignUpForm />
      <SocialsSignIn />
      <WithAccount />
    </>
  );
}
