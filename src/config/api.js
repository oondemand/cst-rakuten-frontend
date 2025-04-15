import axios from "axios";

import { env } from "./env";

export const api = axios.create({
  baseURL: env.VITE_API_URL,
});

api.interceptors.request.use(async (req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...req.headers,
    };
  }

  return req;
});

api.interceptors.response.use(
  async (res) => {
    return res;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("usuario");
      localStorage.removeItem("token");

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return error;
  }
);
