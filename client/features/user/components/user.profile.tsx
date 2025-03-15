"use client";

import Image from "next/image";
import { Button, Container } from "@/shared/ui";
import { EditProfileModal } from "./edit.profile.modal";
import { useModal } from "@/hooks";

type UserProfileProps = Readonly<{
  user: User;
}>;

export const UserProfile = ({ user }: UserProfileProps) => {
  const modal = useModal();

  return (
    <section className="py-10">
      <Container>
        <div className="mb-4">
          <div className="flex items-center gap-4">
            <Image
              src={`${process.env.NEXT_PUBLIC_AVATARS_URL}/${user.avatar}`}
              alt="user avatar"
              width={128}
              height={128}
              className="w-32 h-32 rounded-full"
            />
            <div>
              <h1 className="mb-1.5 text-2xl font-semibold">{user.name}</h1>
              <p className="text-gray-200">{user.email}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button variant="secondary" size="lg" onClick={modal.onOpen}>
            Edit
          </Button>
        </div>
      </Container>
      <EditProfileModal
        open={modal.open}
        onClose={modal.onClose}
        title="Editing Profile"
        user={user}
      />
    </section>
  );
};
