import { api } from "../config/api";

const exportarServicos = async () => {
  const { data } = await api.post("acoes-etapas/exportar-servicos");
  return { data };
};

const exportarPrestadores = async () => {
  const { data } = await api.post("acoes-etapas/exportar-prestadores");
  return { data };
};

export const IntegracaoRpaService = {
  exportarServicos,
  exportarPrestadores,
};
