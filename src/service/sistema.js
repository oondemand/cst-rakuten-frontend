import { api } from "../config/api";

const obterConfiguracoesSistema = async () => {
  const { data } = await api.get("/sistema");
  return data;
};

const atualizarConfiguracoesSistema = async ({ id, body }) => {
  const { data } = await api.put(`/sistema/${id}`, body);
  return data;
};

export const SistemaService = {
  obterConfiguracoesSistema,
  atualizarConfiguracoesSistema,
};
