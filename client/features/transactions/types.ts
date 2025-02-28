type TransactionType = "INCOME" | "EXPENSE";

type Category = {
  id: number;
  name: string;
  type: TransactionType;
  color: string;
  userId: number;
};
