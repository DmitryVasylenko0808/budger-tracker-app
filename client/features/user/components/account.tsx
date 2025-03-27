'use client';

import { logOut } from '@/features/auth/actions/log.out';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useToggleMenu } from '@/hooks';

import { Button, Menu } from '@/shared/ui';

type AccountProps = Readonly<{
  user: User;
}>;

export const Account = ({ user }: AccountProps) => {
  const router = useRouter();
  const { open, ref, onToggle } = useToggleMenu();

  const handleClickMyProfile = () => router.push('/profile');
  const handleClickLogOut = () => logOut();

  return (
    <div>
      <Menu
        trigger={
          <Button variant="text" onClick={onToggle}>
            <Image
              width={32}
              height={32}
              src={user.avatar}
              className="h-8 w-8 rounded-full duration-100 hover:h-9 hover:w-9"
              alt="avatar"
            />
          </Button>
        }
        content={
          <ul className="w-32">
            <li>
              <Button variant="menu" onClick={handleClickMyProfile}>
                My Profile
              </Button>
            </li>
            <li>
              <Button variant="menu" onClick={handleClickLogOut}>
                Log Out
              </Button>
            </li>
          </ul>
        }
        open={open}
        ref={ref}
      />
    </div>
  );
};
