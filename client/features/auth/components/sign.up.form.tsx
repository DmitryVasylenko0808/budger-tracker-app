"use client";

import { useActionState } from "react";
import { signUpAction } from "../actions/sign.up";
import { TextField, Button, Loader } from "@/shared/ui";

export const SignUpForm = () => {
  const [state, formAction, isPending] = useActionState(signUpAction, null);

  return (
    <form action={formAction}>
      <h1 className="mb-12 text-center text-2xl font-semibold">Registration</h1>
      <TextField
        label="Name"
        className="mb-6"
        name="name"
        error={state?.errors?.name?.[0]}
      />
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
      <TextField
        label="Confirm Password"
        type="password"
        className="mb-8"
        name="confirmPassword"
        error={state?.errors?.confirmPassword?.[0]}
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
        {isPending ? <Loader variant="secondary" /> : "Sign Up"}
      </Button>
    </form>
  );
};
