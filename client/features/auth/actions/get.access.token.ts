"use server";

import { getSession } from "@/lib/session";

export const getAccessToken = async () => {
  const access_token = await getSession();

  return access_token;
};
