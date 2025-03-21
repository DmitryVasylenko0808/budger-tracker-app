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

type ConfirmEmailParams = {
  token: string;
};

type ResendConfirmEmailParams = {
  email: string;
};

type ResetPasswordParams = {
  email: string;
};

type ChangePasswordParams = {
  password: string;
  token: string;
};

export const signUp = async (data: SignUpParams) => {
  try {
    const res = await instance.post("/auth/sign-up", data);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
  }
};

export const signIn = async (data: SignInParams) => {
  try {
    const res = await instance.post("/auth/sign-in", data);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
  }
};

export const confirmEmail = async (data: ConfirmEmailParams) => {
  try {
    const res = await instance.post("/auth/email-confirmation/confirm", data);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
  }
};

export const resendConfirmationEmail = async (
  data: ResendConfirmEmailParams
) => {
  try {
    const res = await instance.post("/auth/email-confirmation/resend", data);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
  }
};

export const resetPassword = async (data: ResetPasswordParams) => {
  try {
    const res = await instance.post("/auth/password-recovery/reset", data);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
  }
};

export const changePassword = async (data: ChangePasswordParams) => {
  try {
    const res = await instance.post(
      "/auth/password-recovery/change-password",
      data
    );
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
  }
};
