import type { Metadata } from "next";
import { SignUpForm, WithAccount } from "@/features/auth/components";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUpPage() {
  return (
    <>
      <SignUpForm />
      <WithAccount />
    </>
  );
}
