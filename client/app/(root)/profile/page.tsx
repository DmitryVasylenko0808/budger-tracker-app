import { getUser } from "@/features/user/api";
import { UserProfile } from "@/features/user/components";
import { verifySession } from "@/lib/session";
import { notFound } from "next/navigation";

export default async function ProfilePage() {
  const session = await verifySession();
  const user = await getUser({ id: session?.userId as string });

  if (!user.id) {
    notFound();
  }

  return <UserProfile user={user} />;
}
