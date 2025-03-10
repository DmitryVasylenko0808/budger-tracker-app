import { instance } from "@/lib/instance";
import axios from "axios";

type GetCategoriesParams = {
  type?: TransactionType;
  search?: string;
};

type AddCategoryParams = {
  name: string;
  type: TransactionType;
};

type EditCategoryParams = {
  id: number;
  name: string;
};

type DeleteCategoryParams = {
  id: number;
};

type GetTransactionsParams = {
  page: number;
  limit: number;
  category_ids?: number[];
};

type GetOneTransactionParams = {
  id: number;
};

type CreateTransactionParams = {
  name: string;
  amount: number;
  categoryId: number;
  createdAt: Date;
  notes?: string;
};

type EditTransactionParams = {
  id: number;
  name: string;
  amount: number;
  categoryId: number;
  createdAt: Date;
  notes?: string;
};

type DeleteTransactionsParama = {
  ids: number[];
};

type GetBreakdownParams = {
  type: TransactionType;
  from?: string;
  to?: string;
};

export const getCategories = async (params: GetCategoriesParams) => {
  const { type, search } = params;

  try {
    const res = await instance.get("/categories", {
      params: {
        type,
        search,
      },
    });

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
  }
};

export const addCategory = async (params: AddCategoryParams) => {
  try {
    const res = await instance.post("/categories", params);

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
  }
};

export const editCategory = async (params: EditCategoryParams) => {
  try {
    const { id, ...data } = params;

    const res = await instance.patch(`/categories/${params.id}`, data);

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
  }
};

export const deleteCategory = async (params: DeleteCategoryParams) => {
  try {
    const res = await instance.delete(`/categories/${params.id}`);

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
  }
};

export const getTransactions = async (params: GetTransactionsParams) => {
  try {
    const res = await instance.get<TransactionPagination>(`/transactions`, {
      params: {
        ...params,
        category_ids:
          params.category_ids?.map((item) => item.toString()).join(",") || null,
      },
    });

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
  }
};

export const getOneTransaction = async (params: GetOneTransactionParams) => {
  try {
    const res = await instance.get<Transaction>(`/transactions/${params.id}`);

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
  }
};

export const createTransaction = async (params: CreateTransactionParams) => {
  try {
    const res = await instance.post("/transactions", params);

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
  }
};

export const editTransaction = async (params: EditTransactionParams) => {
  try {
    const { id, ...data } = params;

    const res = await instance.patch(`/transactions/${id}`, data);

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
  }
};

export const deleteTransacitons = async (params: DeleteTransactionsParama) => {
  try {
    const ids = params.ids.map((id) => id.toString()).join(",");

    const res = await instance.delete("/transactions", {
      params: {
        ids,
      },
    });

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
  }
};

export const getSummary = async () => {
  try {
    const res = await instance.get(`/stats/summary`);

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
  }
};

export const getMonthly = async () => {
  try {
    const res = await instance.get(`/stats/monthly`);

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
  }
};

export const getBreakdown = async (params: GetBreakdownParams) => {
  try {
    const res = await instance.get(`/stats/breakdown`, { params });

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
  }
};
