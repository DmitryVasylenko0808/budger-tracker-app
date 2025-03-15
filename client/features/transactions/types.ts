type TransactionType = "INCOME" | "EXPENSE";

type Category = {
  id: number;
  name: string;
  type: TransactionType;
  color: string;
  userId: number;
};

type Transaction = {
  id: number;
  name: string;
  amount: number;
  createdAt: Date;
  categoryId: number;
  userId: number;
  category: Category;
  notes?: string;
};

type TransactionPagination = {
  data: Transaction[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};

type BreakdownStatsItem = {
  categoryId: number;
  categoryName: string;
  categoryColor: string;
  value: number;
};

type BreakdownStats = BreakdownStatsItem[];
