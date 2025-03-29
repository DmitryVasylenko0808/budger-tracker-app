import { ConfirmationTokenType } from '@prisma/client';

export type GenerateTokenArgs = {
  email: string;
  type: ConfirmationTokenType;
  variant?: 'token' | 'code';
  expiresIn?: number;
};
