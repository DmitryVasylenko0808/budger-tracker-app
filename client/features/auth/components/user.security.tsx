'use client';

import { AuthApi } from '@/features/auth/api';
import { useMutation } from '@tanstack/react-query';

import { useModal } from '@/hooks';

import { Block, Button, Container } from '@/shared/ui';

import { TwoFaModal } from './twofa.modal';

type UserSecurityProps = {
  user: User;
};

export const UserSecurity = ({ user }: Readonly<UserSecurityProps>) => {
  const modal = useModal();
  const { mutate, isPending } = useMutation({
    mutationKey: [''],
    mutationFn: AuthApi.toggleTwoFa,
    onSuccess: modal.onOpen,
    onError: (error) => {
      alert(error);
    },
  });

  const handleClickToggle = () => mutate();

  return (
    <section className="pb-10">
      <Container>
        <Block title="Two-Factor Authentication (2FA)">
          <p className="mb-2 text-gray-200">
            Protect your account by adding an extra layer of security.
          </p>
          <div className="flex justify-end">
            <Button variant="secondary" size="lg" disabled={isPending} onClick={handleClickToggle}>
              {user.twoFa ? 'Disable 2FA' : 'Enable 2FA'}
            </Button>
          </div>
        </Block>
      </Container>
      <TwoFaModal user={user} open={modal.open} onClose={modal.onClose} />
    </section>
  );
};
