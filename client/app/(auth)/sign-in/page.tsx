import type { Metadata } from "next";
import {
  SignInForm,
  SocialsSignIn,
  WithoutAccount,
} from "@/features/auth/components";

export const metadata: Metadata = {
  title: "Sign In",
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
