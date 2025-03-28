import { api } from "../config/api";

export const listarServicos = async ({ filters }) => {
  const { data } = await api.get("/servicos", { params: filters });
  return data;
};

export const listarServicosPorPrestador = async ({ prestadorId, dataRegistro }) => {
  const { data } = await api.get(`/servicos/prestador/${prestadorId}?dataRegistro=${dataRegistro}`);
  return data;
};

export const criarServico = async ({ body }) => {
  const { data } = await api.post("/servicos", body);
  return data;
};

export const atualizarServico = async ({ id, body }) => {
  const { data } = await api.patch(`servicos/${id}`, body);
  return data;
};

export const deletarServico = async ({ id }) => {
  const { data } = await api.delete(`servicos/${id}`);
  return data;
};

export const importarServicos = async ({ files }) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append("file", file);
  }

  const response = await api.post("acoes-etapas/importar-servicos", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

export const ServicoService = {
  listarServicos,
  criarServico,
  atualizarServico,
  importarServicos,
  deletarServico,
  listarServicosPorPrestador,
};
