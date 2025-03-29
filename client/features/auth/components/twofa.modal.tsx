'use client';

import { verifyToggleTwoFaAction } from '@/features/auth/actions/verify.toggle.twofa';

import { useActionState, useEffect } from 'react';

import { Button, Loader, TextField } from '@/shared/ui';
import { Modal, ModalProps } from '@/shared/ui/modal';

type TwoFaModalProps = { user: User } & ModalProps;

export const TwoFaModal = ({ user, ...modalProps }: Readonly<TwoFaModalProps>) => {
  const [state, formAction, isPending] = useActionState(verifyToggleTwoFaAction, null);

  useEffect(() => {
    if (state?.errors?.server) {
      alert(state.errors.server);
    }

    if (state?.success) {
      modalProps.onClose();
    }
  }, [state]);

  return (
    <Modal title={`${user.twoFa ? 'Disable' : 'Enable'} Two-Factor Authentication`} {...modalProps}>
      <form action={formAction}>
        <p className="mb-4 text-center text-gray-200">
          A verification code has been sent to your email to enable/disable two-factor
          authentication. Enter it to confirm.
        </p>
        <TextField label="Code" name="code" error={state?.errors?.code?.[0]} className="mb-6" />
        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="lg" disabled={isPending}>
            {isPending ? (
              <Loader variant="secondary" size="sm" />
            ) : (
              `${user.twoFa ? 'Disable' : 'Enable'} 2FA`
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
