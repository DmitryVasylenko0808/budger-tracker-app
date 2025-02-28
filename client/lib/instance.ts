import { getAccessToken } from "@/features/auth/actions/get.access.token";
import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.API_URL,
});

instance.interceptors.request.use(async (cfg) => {
  const access_token = await getAccessToken();

  cfg.headers.Authorization = `Bearer ${access_token}`;

  return cfg;
});
