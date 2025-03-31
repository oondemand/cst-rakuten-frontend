import { api } from "../config/api";

const validateToken = async () => {
  const response = await api.get("/auth/validar-token");

  return response.data;
};

const logIn = async ({ email, senha }) => {
  const response = await api.post("/auth/login", { email, senha });

  return response.data;
};

const firstAccess = async ({ body, code }) => {
  return await api.post("/auth/primeiro-acesso", {
    ...body,
    code,
  });
};

const esqueciMinhaSenha = async (email) => {
  return await api.post("/auth/esqueci-minha-senha", { email });
};

export const LoginService = {
  validateToken,
  logIn,
  firstAccess,
  esqueciMinhaSenha,
};
