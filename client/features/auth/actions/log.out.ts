"use server";

import { deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const logOut = async () => {
  await deleteSession();

  redirect("/sign-in");
};
