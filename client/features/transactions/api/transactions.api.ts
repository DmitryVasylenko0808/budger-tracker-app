import axios from 'axios';

import { instance } from '@/lib/instance';

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

export class TransactionsApi {
  static async getTransactions(params: GetTransactionsParams) {
    try {
      const res = await instance.get<TransactionPagination>(`/transactions`, {
        params: {
          ...params,
          category_ids: params.category_ids?.map((item) => item.toString()).join(',') || null,
        },
      });

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async getOneTransaction(params: GetOneTransactionParams) {
    try {
      const res = await instance.get<Transaction>(`/transactions/${params.id}`);

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async createTransaction(params: CreateTransactionParams) {
    try {
      const res = await instance.post('/transactions', params);

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async editTransaction(params: EditTransactionParams) {
    try {
      const { id, ...data } = params;

      const res = await instance.patch(`/transactions/${id}`, data);

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async deleteTransacitons(params: DeleteTransactionsParama) {
    try {
      const ids = params.ids.map((id) => id.toString()).join(',');

      const res = await instance.delete('/transactions', {
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
  }
}
