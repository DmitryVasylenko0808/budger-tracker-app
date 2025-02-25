import { getSession } from "@/lib/session";
import axios from "axios";

type GetUserParams = {
  id: string;
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
