import { instance } from "@/lib/instance";
import axios from "axios";

type GetCategoriesParams = {
  type: TransactionType;
  search?: string;
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
