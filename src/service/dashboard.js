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

const integracao = async () => {
  const { data } = await api.get("/dashboard/integracao");
  return data;
};

export const DashboardService = {
  obterValoresPorStatus,
  obterTicketsPorStatus,
  obterTicketsPorEtapa,
  integracao,
};
