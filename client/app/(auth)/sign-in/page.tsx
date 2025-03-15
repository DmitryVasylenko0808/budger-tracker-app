import type { Metadata } from "next";
import { SignInForm, WithoutAccount } from "@/features/auth/components";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <>
      <SignInForm />
      <WithoutAccount />
    </>
  );
}
