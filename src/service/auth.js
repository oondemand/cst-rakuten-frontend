import { api } from "../config/api";

const validateToken = async () => {
  const response = await api.get("/auth/validar-token");

  return response.data;
};

const logIn = async ({ email, senha }) => {
  console.log(email, senha);

  const response = await api.post("/auth/login", { email, senha });

  return response.data;
};

const firstAccess = async ({ body, code }) => {
  return await api.post("/auth/primeiro-acesso", {
    ...body,
    code,
  });
};

export const LoginService = {
  validateToken,
  logIn,
  firstAccess,
};
