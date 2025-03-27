import { deleteTransacitons } from '../api';

export type DeleteTransactionState = {
  errors?: {
    server?: string;
  };
  success?: boolean;
} | null;

export const deleteTransactionAction = async (ids: number[]): Promise<DeleteTransactionState> => {
  const res = await deleteTransacitons({ ids });

  if (res?.error) {
    return {
      errors: {
        server: res.message,
      },
      success: false,
    };
  }

  return { success: true };
};
