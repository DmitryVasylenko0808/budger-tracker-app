import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";

type JWTPayload = JwtPayload & { userId: string };

export const createSession = async (access_token: string) => {
  const cookieStore = await cookies();
  const currentDate = new Date();
  const expirationDate = currentDate.setDate(currentDate.getDate() + 30);

  cookieStore.set({
    name: "access_token",
    value: access_token,
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: expirationDate,
  });
};

export const deleteSession = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("access_token");
};

export const getSession = cache(async () => {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value;

  return access_token;
});

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value;

  if (!access_token) {
    return null;
  }

  const payload = jwtDecode(access_token) as JWTPayload;

  return payload;
});
