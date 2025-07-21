import { api } from "../config/api";

const integracaoPrestador = async () => {
  const { data } = await api.get("/integracao/prestador");
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
export const IntegracaoService = {
  integracaoPrestador,
  processarIntegracaoPrestador,
  arquivarIntegracaoPrestador,
  reprocessarIntegracaoPrestador,
};
