import { api } from "../config/api";

const listarDocumentosFiscais = async ({ filters }) => {
  const { data } = await api.get("/documentos-fiscais", { params: filters });
  return data;
};

const listarDocumentosFiscaisPorPrestador = async ({
  prestadorId,
  dataRegistro,
}) => {
  const { data } = await api.get(
    `/documentos-fiscais/prestador/${prestadorId}?dataRegistro=${dataRegistro}`
  );
  return data;
};

const criarDocumentoFiscal = async ({ body }) => {
  const { data } = await api.post("/documentos-fiscais", body);
  return data;
};

const atualizarDocumentoFiscal = async ({ id, body }) => {
  const { data } = await api.patch(`/documentos-fiscais/${id}`, body);
  return data;
};

const atualizarStatus = async ({ ids, status }) => {
  const { data } = await api.patch(`/documentos-fiscais`, { ids, status });
  return data;
};

const deletarDocumentoFiscal = async ({ id }) => {
  const { data } = await api.delete(`/documentos-fiscais/${id}`);
  return data;
};

const deleteFile = async ({ id, documentoFiscalId }) => {
  return await api.delete(
    `/documentos-fiscais/excluir-arquivo/${documentoFiscalId}/${id}`
  );
};

const anexarArquivo = async ({ file, id }) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(
    `/documentos-fiscais/anexar-arquivo/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};

export const importarDocumentosFiscais = async ({ files }) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append("file", file);
  }

  const response = await api.post(
    "/acoes-etapas/importar-documentos-fiscais",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};

export const DocumentosFiscaisService = {
  listarDocumentosFiscais,
  criarDocumentoFiscal,
  atualizarDocumentoFiscal,
  deletarDocumentoFiscal,
  listarDocumentosFiscaisPorPrestador,
  atualizarStatus,
  anexarArquivo,
  deleteFile,
  importarDocumentosFiscais,
};
