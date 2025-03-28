import { api } from "../config/api";

const obterValoresPorStatus = async () => {
  const { data } = await api.get("/dashboard/servicos/valores");
  return data;
};

export const DashboardService = {
  obterValoresPorStatus,
};
