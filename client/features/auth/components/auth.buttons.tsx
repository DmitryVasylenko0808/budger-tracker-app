"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui";

export const AuthButtons = () => {
  const router = useRouter();

  const handleClickLogin = () => router.push("/sign-in");
  const handleClickSignUp = () => router.push("/sign-up");

  return (
    <div className="flex gap-3">
      <Button variant="secondary" onClick={handleClickLogin}>
        Login
      </Button>
      <Button variant="primary" onClick={handleClickSignUp}>
        Sign Up
      </Button>
    </div>
  );
};
