import { ChangePasswordForm } from "@/features/auth/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Password",
};

export default function ChangePasswordPage() {
  return <ChangePasswordForm />;
}
