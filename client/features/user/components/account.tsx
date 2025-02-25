"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks";
import { logOut } from "@/features/auth/actions/log.out";
import { Button, Menu } from "@/shared/ui";

type AccountProps = {
  user: User;
};

export const Account = ({ user }: AccountProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpenMenu(false));

  const handleToggleMenu = () => setOpenMenu((openMenu) => !openMenu);
  const handleClickMyProfile = () => router.push("/profile");
  const handleClickLogOut = () => logOut();

  const avatarUrl = user.avatar
    ? `http://localhost:3000/avatars/${user.avatar}`
    : `http://localhost:3000/avatars/nullavatar.jpg`;

  return (
    <div>
      <Menu
        trigger={
          <Button variant="text" onClick={handleToggleMenu}>
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
        open={openMenu}
        ref={ref}
      />
    </div>
  );
};
