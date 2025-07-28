import { api } from "../../../config/api";

const listarTodos = async ({ time }) => {
  const { data } = await api.get("/integracao/arquivos/central-omie/todos", {
    params: { time },
  });
  return data;
};

const processar = async () => {
  const { data } = await api.post(
    "/integracao/arquivos/central-omie/processar"
  );
  return data;
};

const arquivar = async ({ id }) => {
  const { data } = await api.post(
    `/integracao/arquivos/central-omie/arquivar/${id}`
  );
  return data;
};

const reprocessar = async ({ id }) => {
  const { data } = await api.post(
    `/integracao/arquivos/central-omie/reprocessar/${id}`
  );
  return data;
};

const listarComPaginacao = async ({ filtros }) => {
  const { data } = await api.get(`/integracao/arquivos/central-omie/`, {
    params: filtros,
  });
  return data;
};

export const IntegracaoArquivosCentralOmieService = {
  listarTodos,
  processar,
  arquivar,
  reprocessar,
  listarComPaginacao,
};
