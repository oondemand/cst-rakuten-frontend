import { api } from "../config/api";

const obterTodosRegistros = async ({ filters }) => {
  const { data } = await api.get("/registros", { params: filters });
  return data;
};

export const RegistroService = {
  obterTodosRegistros,
};
