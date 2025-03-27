'use client';

import Image from 'next/image';

import { useModal } from '@/hooks';

import { Button, Container } from '@/shared/ui';

import { EditProfileModal } from './edit.profile.modal';

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
              src={user.avatar}
              alt="user-avatar"
              width={128}
              height={128}
              className="h-32 w-32 rounded-full"
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
