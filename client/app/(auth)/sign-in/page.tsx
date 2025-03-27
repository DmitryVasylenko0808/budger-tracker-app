import { SignInForm, SocialsSignIn, WithoutAccount } from '@/features/auth/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default async function SignInPage() {
  return (
    <>
      <SignInForm />
      <SocialsSignIn />
      <WithoutAccount />
    </>
  );
}
