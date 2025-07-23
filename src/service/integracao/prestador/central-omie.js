import { api } from "../../../config/api";

const listarTodos = async ({ time }) => {
  const { data } = await api.get("/integracao/prestador/central-omie/todos", {
    params: { time },
  });
  return data;
};

const processar = async () => {
  const { data } = await api.post(
    "/integracao/prestador/central-omie/processar"
  );
  return data;
};

const arquivar = async ({ id }) => {
  const { data } = await api.post(
    `/integracao/prestador/central-omie/arquivar/${id}`
  );
  return data;
};

const reprocessar = async ({ id }) => {
  const { data } = await api.post(
    `/integracao/prestador/central-omie/reprocessar/${id}`
  );
  return data;
};

const listarComPaginacao = async ({ filtros }) => {
  const { data } = await api.get(`/integracao/prestador/central-omie/`, {
    params: filtros,
  });
  return data;
};

export const IntegracaoPrestadorCentralOmieService = {
  listarTodos,
  processar,
  arquivar,
  reprocessar,
  listarComPaginacao,
};
