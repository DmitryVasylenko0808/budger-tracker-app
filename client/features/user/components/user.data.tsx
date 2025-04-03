'use client';

import Image from 'next/image';

import { useModal } from '@/hooks';

import { Block, Button, Container } from '@/shared/ui';

import { EditProfileModal } from './edit.profile.modal';

type UserDataProps = Readonly<{
  user: User;
}>;

export const UserData = ({ user }: UserDataProps) => {
  const modal = useModal();

  return (
    <section className="pb-10">
      <Container>
        <Block title="Personal Details">
          <div className="mb-2">
            <div className="flex items-center gap-4">
              <Image
                src={user.avatar}
                alt="user-avatar"
                width={96}
                height={96}
                className="h-24 w-24 rounded-full"
              />
              <div>
                <h3 className="mb-0.5 text-lg font-semibold">{user.name}</h3>
                <p className="text-gray-200">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="secondary" size="lg" onClick={modal.onOpen}>
              Edit
            </Button>
          </div>
        </Block>
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
