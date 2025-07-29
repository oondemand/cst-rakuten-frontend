import { api } from "../../../config/api";

const listarTodos = async ({ time }) => {
  const { data } = await api.get("/integracao/conta-pagar/omie-central/todos", {
    params: { time },
  });
  return data;
};

const processar = async () => {
  const { data } = await api.post(
    "/integracao/conta-pagar/omie-central/processar"
  );
  return data;
};

const arquivar = async ({ id }) => {
  const { data } = await api.post(
    `/integracao/conta-pagar/omie-central/arquivar/${id}`
  );
  return data;
};

const reprocessar = async ({ id }) => {
  const { data } = await api.post(
    `/integracao/conta-pagar/omie-central/reprocessar/${id}`
  );
  return data;
};

const listarComPaginacao = async ({ filtros }) => {
  const { data } = await api.get(`/integracao/conta-pagar/omie-central/`, {
    params: filtros,
  });
  return data;
};

export const IntegracaoContaPagarOmieCentralService = {
  listarTodos,
  processar,
  arquivar,
  reprocessar,
  listarComPaginacao,
};
