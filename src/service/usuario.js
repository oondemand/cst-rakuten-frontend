import { api } from "../config/api";

const adicionarUsuario = async ({ body }) => {
  const { data } = await api.post("/usuarios", body);
  return data;
};

const alterarUsuario = async ({ id, body }) => {
  const { data } = await api.put(`/usuarios/${id}`, body);
  return data;
};

const excluirUsuario = async ({ id }) => {
  return await api.delete(`/usuarios/${id}`);
};

const listarUsuarios = async ({ filters }) => {
  const { data } = await api.get("/usuarios", { params: filters });
  return data;
};

const enviarConvite = async ({ userId }) => {
  const { data } = await api.post("/usuarios/enviar-convite", { userId });
  return data;
};

export const UsuarioService = {
  adicionarUsuario,
  alterarUsuario,
  excluirUsuario,
  listarUsuarios,
  enviarConvite,
};
