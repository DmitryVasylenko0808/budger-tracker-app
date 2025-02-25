import { getSession } from "@/lib/session";
import axios from "axios";

type GetUserParams = {
  id: string;
};

type EditUserParams = {
  id: number;
  name: string;
  email: string;
};

export const getUser = async (params: GetUserParams) => {
  const access_token = await getSession();

  try {
    const res = await axios.get(
      `http://localhost:3000/api/users/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
  }
};

export const editUser = async (params: EditUserParams) => {
  const { id, ...data } = params;

  const formData = new FormData();

  Object.entries(data).forEach(([k, v]) => formData.append(k, v));

  const access_token = await getSession();

  try {
    const res = await axios.patch(
      `http://localhost:3000/api/users/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
  }
};
