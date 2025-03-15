"use client";

import { TextField, Button, FileSelect } from "@/shared/ui";
import { ModalProps, Modal } from "@/shared/ui/modal";
import { LoaderCircle } from "lucide-react";
import { editProfileAction } from "../actions/edit.user";
import { useActionState, useEffect } from "react";

type EditProfileModalProps = ModalProps &
  Readonly<{
    user: User;
  }>;

export const EditProfileModal = ({
  user,
  onClose,
  ...modalProps
}: EditProfileModalProps) => {
  const editProfileActionWithId = editProfileAction.bind(null, user.id);
  const [state, formAction, isPending] = useActionState(
    editProfileActionWithId,
    null
  );

  useEffect(() => {
    if (state?.success) {
      onClose();
    }
  }, [state]);

  return (
    <Modal title="Editing Profile" onClose={onClose} {...modalProps}>
      <form action={formAction}>
        <TextField
          label="Name"
          name="name"
          defaultValue={user.name}
          error={state?.errors?.name?.[0]}
          className="mb-6"
        />
        <TextField
          label="Email"
          name="email"
          defaultValue={user.email}
          error={state?.errors?.email?.[0]}
          className="mb-6"
        />
        <FileSelect
          label="Avatar"
          name="avatar"
          error={state?.errors?.avatar?.[0]}
          className="mb-6"
        />
        {state?.errors?.server && (
          <p className="mb-8 text-center text-sm text-error">
            {state.errors.server}
          </p>
        )}
        <div className="flex justify-end">
          <Button type="submit" variant="primary" disabled={isPending}>
            {isPending ? (
              <LoaderCircle size={20} className="text-white animate-spin" />
            ) : (
              "Edit"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
