import axios from "axios";
import { instance } from "../../lib/instance";

type SignUpParams = {
  name: string;
  email: string;
  password: string;
};

type SignInParams = {
  email: string;
  password: string;
};

export const signUp = async (data: SignUpParams) => {
  try {
    const res = await instance.post(
      "http://localhost:3000/api/auth/sign-up",
      data
    );
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
  }
};

export const signIn = async (data: SignInParams) => {
  try {
    const res = await instance.post(
      "http://localhost:3000/api/auth/sign-in",
      data
    );
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
  }
};
