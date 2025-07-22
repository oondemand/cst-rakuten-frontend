import { api } from "../config/api";

const obterValoresPorStatus = async () => {
  const { data } = await api.get("/dashboard/servicos/valores");
  return data;
};

const obterTicketsPorStatus = async () => {
  const { data } = await api.get("/dashboard/tickets/status");
  return data;
};

const obterTicketsPorEtapa = async () => {
  const { data } = await api.get("/dashboard/tickets/etapa");
  return data;
};

const integracaoPrestadorCentralOmie = async () => {
  const { data } = await api.get(
    "/dashboard/integracao/prestador/central-omie"
  );
  return data;
};

export const DashboardService = {
  obterValoresPorStatus,
  obterTicketsPorStatus,
  obterTicketsPorEtapa,
  integracaoPrestadorCentralOmie,
};
