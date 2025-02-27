import { getSession } from "@/lib/session";
import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

instance.interceptors.request.use(async (cfg) => {
  const access_token = await getSession();

  cfg.headers.Authorization = `Bearer ${access_token}`;

  return cfg;
});
