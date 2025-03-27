import { UsersApi } from '@/features/user/api';
import { Account } from '@/features/user/components';

import Link from 'next/link';

import { verifySession } from '@/lib/session';

import { Container } from '../ui';
import { Logo } from './logo';
import { NavBar } from './navbar';

export const Header = async () => {
  const session = await verifySession();
  const user = await UsersApi.getUser({ id: Number(session?.userId) });

  return (
    <header className="h-16 border-b border-gray-100/15">
      <Container className="flex">
        <div className="flex h-full flex-1 items-center">
          <Link href="/">
            <span className="inline-flex items-center gap-2">
              <Logo />
              <span className="text-xl font-semibold">Budget Tracker</span>
            </span>
          </Link>
        </div>
        <div className="flex h-full flex-1 items-center">
          <NavBar />
        </div>
        <div className="flex h-full flex-1 items-center">
          <div className="flex w-full justify-end">
            <Account user={user} />
          </div>
        </div>
      </Container>
    </header>
  );
};
