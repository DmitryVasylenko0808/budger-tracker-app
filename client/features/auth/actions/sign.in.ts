"use server";

import { z } from "zod";
import { signIn } from "../api";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email").trim(),
  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .trim(),
});

type SignInState = {
  errors?: {
    email?: string[];
    password?: string[];
    server?: string;
  };
  success?: boolean;
} | null;

export const signInAction = async (
  prevState: SignInState,
  formData: FormData
): Promise<SignInState> => {
  const validatedFields = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }
  const res = await signIn(validatedFields.data);

  if (res.error) {
    return {
      errors: {
        server: res.message,
      },
      success: false,
    };
  }

  return { success: true };
};
