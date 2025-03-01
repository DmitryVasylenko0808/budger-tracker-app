"use client";

import Image from "next/image";
import { Button, Menu } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { useToggleMenu } from "@/hooks";
import { logOut } from "@/features/auth/actions/log.out";

type AccountProps = {
  user: User;
};

export const Account = ({ user }: AccountProps) => {
  const router = useRouter();
  const { open, ref, onToggle } = useToggleMenu();

  const handleClickMyProfile = () => router.push("/profile");
  const handleClickLogOut = () => logOut();

  const avatarUrl = user.avatar
    ? `${process.env.NEXT_PUBLIC_AVATARS_URL}/${user.avatar}`
    : `${process.env.NEXT_PUBLIC_AVATARS_URL}/nullavatar.jpg`;

  return (
    <div>
      <Menu
        trigger={
          <Button variant="text" onClick={onToggle}>
            <Image
              width={32}
              height={32}
              src={avatarUrl}
              className="w-8 h-8 rounded-full duration-100 hover:w-9 hover:h-9"
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
