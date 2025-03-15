import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getUser } from "@/features/user/api";
import { verifySession } from "@/lib/session";
import { UserProfile } from "@/features/user/components";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const session = await verifySession();
  const data = await getUser({ id: Number(session?.userId) });

  if (data.statusCode === 404) {
    notFound();
  }

  if (data.statusCode === 401) {
    redirect("/sign-in");
  }

  return <UserProfile user={data} />;
}
