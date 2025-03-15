import Link from "next/link";
import { Logo } from "./logo";
import { NavBar } from "./navbar";
import { Container } from "../ui";
import { getUser } from "@/features/user/api";
import { Account } from "@/features/user/components";
import { verifySession } from "@/lib/session";

export const Header = async () => {
  const session = await verifySession();
  const user = await getUser({ id: Number(session?.userId) });

  return (
    <header className="h-16 border-b border-gray-100/15">
      <Container className="flex">
        <div className="flex-1 h-full flex items-center">
          <Link href="/">
            <span className="inline-flex items-center gap-2">
              <Logo />
              <span className="text-xl font-semibold">Budget Tracker</span>
            </span>
          </Link>
        </div>
        <div className="flex-1 h-full flex items-center">
          <NavBar />
        </div>
        <div className="flex-1 h-full flex items-center">
          <div className="w-full flex justify-end">
            <Account user={user} />
          </div>
        </div>
      </Container>
    </header>
  );
};
