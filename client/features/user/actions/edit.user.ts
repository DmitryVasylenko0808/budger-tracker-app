"use server";

import { z } from "zod";
import { editUser } from "../api";
import { revalidatePath } from "next/cache";

const editProfileSchema = z.object({
  name: z.string().min(2, "Name must contain at least 2 characters").trim(),
  email: z.string().min(1, "Email is required").email("Invalid email").trim(),
});

type EditProfileState = {
  errors?: {
    name?: string[];
    email?: string[];
    server?: string;
  };
  success?: boolean;
} | null;

export const editProfileAction = async (
  id: number,
  prevState: EditProfileState,
  formData: FormData
): Promise<EditProfileState> => {
  const validatedFields = editProfileSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const res = await editUser({ id, ...validatedFields.data });

  if (res.error) {
    return {
      errors: {
        server: res.message,
      },
      success: false,
    };
  }

  revalidatePath("/profile");

  return { success: true };
};
