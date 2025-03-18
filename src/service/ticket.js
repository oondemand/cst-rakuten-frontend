import { api } from "../config/api";

const adicionarTicket = async (ticket) => {
  const response = await api.post("tickets", ticket);
  return response.data;
};

const alterarTicket = async ({ id, body }) => {
  const response = await api.patch(`tickets/${id}`, body);
  return response.data;
};

const carregarTicket = async (id) => {
  const response = await api.get(`tickets/${id}`);
  return response.data;
};

const listarTickets = async (filtro) => {
  const { data } = await api.get("/tickets", { params: filtro });
  return data;
};

const aprovarTicket = async ({ id }) => {
  const response = await api.post(`/aprovacoes/${id}/aprovar`);
  return response.data;
};

const reprovarTicket = async ({ id }) => {
  const response = await api.post(`/aprovacoes/${id}/recusar`);
  return response.data;
};

const salvarTicket = async (ticket) => {
  if (ticket._id) {
    return alterarTicket(ticket._id, ticket);
  } else {
    return adicionarTicket(ticket);
  }
};

const uploadFiles = async ({ ticketId, files }) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append("arquivos", file);
  }

  return await api.post(`/tickets/${ticketId}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteFile = async ({ id }) => {
  return await api.delete(`/tickets/arquivo/${id}`);
};

const getFile = async ({ id }) => {
  return await api.get(`/tickets/arquivo/${id}`);
};

const listarArquivosDoTicket = async (filtro) => {
  const { data } = await api.get(`/tickets/${filtro}/arquivos`);
  return data;
};

const adicionarServico = async ({ ticketId, servicoId }) => {
  const { data } = await api.post(
    `/tickets/adicionar-servico/${ticketId}/${servicoId}`
  );

  return data;
};

const removerServico = async ({ ticketId, servicoId }) => {
  const { data } = await api.post(
    `/tickets/remover-servico/${ticketId}/${servicoId}`
  );

  return data;
};

export const TicketService = {
  listarTickets,
  adicionarTicket,
  alterarTicket,
  aprovarTicket,
  reprovarTicket,
  deleteFile,
  uploadFiles,
  getFile,
  removerServico,
  adicionarServico,
};
