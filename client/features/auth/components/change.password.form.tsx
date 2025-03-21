"use client";

import { TextField, Button, Loader } from "@/shared/ui";
import { useActionState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { changePasswordAction } from "../actions/change.password.dto";

export const ChangePasswordForm = () => {
  const searchParams = useSearchParams();
  const changePasswordActionWithToken = changePasswordAction.bind(
    null,
    searchParams.get("token")
  );
  const [state, formAction, isPending] = useActionState(
    changePasswordActionWithToken,
    null
  );
  const router = useRouter();

  useEffect(() => {
    if (state?.invalidToken) {
      alert(state.message);
    }

    if (state?.success) {
      alert(state.message);
      router.replace("/sign-in");
    }
  }, [state]);

  return (
    <form action={formAction}>
      <h1 className="mb-12 text-center text-2xl font-semibold">
        Change Password
      </h1>
      <TextField
        label="New Password"
        type="password"
        name="password"
        error={state?.errors?.password?.[0]}
        className="mb-6"
      />
      <TextField
        label="Confrim Password"
        type="password"
        name="confirmPassword"
        error={state?.errors?.confrimPassword?.[0]}
        className="mb-6"
      />
      {state?.errors?.server && (
        <p className="mb-8 text-center text-sm text-error">
          {state.errors.server}
        </p>
      )}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isPending}
        fullWidth
      >
        {isPending ? (
          <Loader variant="secondary" size="sm" />
        ) : (
          "Change Password"
        )}
      </Button>
    </form>
  );
};
