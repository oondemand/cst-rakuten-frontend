import { api } from "../config/api";

export const listarPrestadores = async ({ filters }) => {
  const { data } = await api.get("prestadores", { params: filters });

  return data;
};

export const criarPrestador = async ({ body }) => {
  const { data } = await api.post("/prestadores", body);

  return data;
};

export const atualizarPrestador = async ({ id, body }) => {
  const { data } = await api.patch(`/prestadores/${id}`, body);

  return data;
};

export const PrestadorService = {
  listarPrestadores,
  criarPrestador,
  atualizarPrestador,
};
