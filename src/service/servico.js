import { api } from "../config/api";

export const listarServicos = async ({ filters }) => {
  const { data } = await api.get("/servicos", { params: filters });

  return data;
};

export const criarServico = async ({ body }) => {
  const { data } = await api.post("/servicos", body);

  return data;
};

export const atualizarServico = async ({ id, body }) => {
  const { data } = await api.patch(`servicos/${id}`, body);
  return data;
};

export const ServicoService = {
  listarServicos,
  criarServico,
  atualizarServico,
};
