"use server";

import { z } from "zod";
import { editUser } from "../api";
import { revalidatePath } from "next/cache";

const editProfileSchema = z.object({
  name: z.string().min(2, "Name must contain at least 2 characters").trim(),
  email: z.string().min(1, "Email is required").email("Invalid email").trim(),
  avatar: z.any().optional(),
});

type EditProfileState = {
  errors?: {
    name?: string[];
    email?: string[];
    avatar?: string[];
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
    avatar: formData.get("avatar"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { avatar, ...textData } = validatedFields.data;
  const rawData = avatar.size ? validatedFields.data : textData;

  const res = await editUser({ id, ...rawData });

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
