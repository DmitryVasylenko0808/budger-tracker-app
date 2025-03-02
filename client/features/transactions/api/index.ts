import { instance } from "@/lib/instance";
import axios from "axios";

type GetCategoriesParams = {
  type: TransactionType;
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
