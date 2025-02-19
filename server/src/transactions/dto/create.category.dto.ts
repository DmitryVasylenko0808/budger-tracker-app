import { TransactionType } from '@prisma/client';

export type CreateCategoryDto = {
  readonly name: string;
  readonly type: TransactionType;
};
