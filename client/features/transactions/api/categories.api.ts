import axios from 'axios';

import { instance } from '@/lib/instance';

type GetCategoriesParams = {
  type?: TransactionType;
  search?: string;
};

type GetOneCategoryParams = {
  id: number;
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

type GetTransactionsByCategoryParams = {
  id: number;
  page: number;
  limit: number;
};

export class CategoriesApi {
  static async getCategories(params: GetCategoriesParams) {
    const { type, search } = params;

    try {
      const res = await instance.get('/categories', {
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
  }

  static async getOneCategory(params: GetOneCategoryParams) {
    try {
      const res = await instance.get(`/categories/${params.id}`);

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async getTransactionsByCategory(params: GetTransactionsByCategoryParams) {
    try {
      const { id, page, limit } = params;

      const res = await instance.get(`/categories/${id}/transactions`, {
        params: { page, limit },
      });

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async addCategory(params: AddCategoryParams) {
    try {
      const res = await instance.post('/categories', params);

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async editCategory(params: EditCategoryParams) {
    try {
      const { id, ...data } = params;

      const res = await instance.patch(`/categories/${params.id}`, data);

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async deleteCategory(params: DeleteCategoryParams) {
    try {
      const res = await instance.delete(`/categories/${params.id}`);

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }
}
