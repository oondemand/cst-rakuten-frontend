import { api } from "../config/api";

const exportarServicos = async () => {
  const { data } = await api.post("acoes-etapas/exportar-servicos");
  return { data };
};

const exportarPrestadores = async () => {
  const { data } = await api.post("acoes-etapas/exportar-prestadores");
  return { data };
};

export const importarRPAs = async ({ files }) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append("file", file);
  }

  const response = await api.post("acoes-etapas/importar-rpas", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

export const IntegracaoRpaService = {
  exportarServicos,
  exportarPrestadores,
  importarRPAs,
};
