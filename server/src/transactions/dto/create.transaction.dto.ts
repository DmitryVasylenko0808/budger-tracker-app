export type CreateTransactionDto = {
  readonly name: string;
  readonly amount: number;
  readonly createdAt: Date;
  readonly categoryId: number;

  readonly notes?: string;
};
