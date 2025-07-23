import { api } from "../config/api";

const integracaoPrestador = async ({ time }) => {
  const { data } = await api.get("/integracao/prestador", { params: { time } });
  return data;
};

const processarIntegracaoPrestador = async () => {
  const { data } = await api.post("/integracao/prestador/processar");
  return data;
};

const arquivarIntegracaoPrestador = async ({ id }) => {
  const { data } = await api.post(`/integracao/prestador/arquivar/${id}`);
  return data;
};

const reprocessarIntegracaoPrestador = async ({ id }) => {
  const { data } = await api.post(`/integracao/prestador/reprocessar/${id}`);
  return data;
};

const listarIntegracaoPrestadorCentralOmieArquivados = async ({ filtros }) => {
  const { data } = await api.get(`/integracao/prestador/arquivados`, {
    params: filtros,
  });
  return data;
};

export const IntegracaoService = {
  integracaoPrestador,
  processarIntegracaoPrestador,
  arquivarIntegracaoPrestador,
  reprocessarIntegracaoPrestador,
  listarIntegracaoPrestadorCentralOmieArquivados,
};
