"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInAction } from "../actions/sign.in";
import { TextField, Button } from "@/shared/ui";
import { LoaderCircle } from "lucide-react";

export const SignInForm = () => {
  const [state, formAction, isPending] = useActionState(signInAction, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/");
    }
  }, [state]);

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
        <p className="mb-8 text-center text-sm text-error">
          {state.errors.server}
        </p>
      )}

      <Button
        className="mb-5"
        variant="primary"
        size="lg"
        disabled={isPending}
        fullWidth
      >
        {isPending ? (
          <LoaderCircle size={20} className="text-white animate-spin" />
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
};
