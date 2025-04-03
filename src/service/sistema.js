import { api } from "../config/api";

const obterConfiguracoesSistema = async () => {
  const { data } = await api.get("/sistema");
  return data;
};

const atualizarConfiguracoesSistema = async ({ id, body }) => {
  const { data } = await api.put(`/sistema/${id}`, body);
  return data;
};

const testarEnvioEmail = async ({ body }) => {
  return await api.post(`/sistema/teste-email`, body);
};

const listarCategorias = async () => {
  const { data } = await api.get("/sistema/listar-categorias");
  return data;
};

const listarContaCorrente = async () => {
  const { data } = await api.get("/sistema/listar-conta-corrente");
  return data;
};

export const SistemaService = {
  obterConfiguracoesSistema,
  atualizarConfiguracoesSistema,
  testarEnvioEmail,
  listarCategorias,
  listarContaCorrente,
};
