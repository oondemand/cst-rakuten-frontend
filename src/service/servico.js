import { api } from "../config/api";

const listarServicos = async ({ filters }) => {
  const { data } = await api.get("/servicos", { params: filters });
  return data;
};

const listarServicosPorPrestador = async ({ prestadorId, dataRegistro }) => {
  const { data } = await api.get(
    `/servicos/prestador/${prestadorId}?dataRegistro=${dataRegistro}`
  );
  return data;
};

const criarServico = async ({ body }) => {
  const { data } = await api.post("/servicos", body);
  return data;
};

const atualizarServico = async ({ id, body }) => {
  const { data } = await api.patch(`servicos/${id}`, body);
  return data;
};

const atualizarStatus = async ({ ids, status }) => {
  const { data } = await api.patch(`servicos`, { ids, status });
  return data;
};

const deletarServico = async ({ id }) => {
  const { data } = await api.delete(`servicos/${id}`);
  return data;
};

const importarServicos = async ({ files }) => {
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
  atualizarStatus,
};
