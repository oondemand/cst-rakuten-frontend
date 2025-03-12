import axios from "axios";

import { env } from "./env";

export const api = axios.create({
  baseURL: env.VITE_API_URL,
});

api.interceptors.request.use(async (req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers = {
      ...req.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  return req;
});
