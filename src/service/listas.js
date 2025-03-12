import { api } from "../config/api";

const getBancos = async () => {
  const { data } = await api.get("/listas/crud/Banco");
  return data;
};

const getEstados = async () => {
  const { data } = await api.get("/listas/crud/Estado");
  return data;
};

const getTipos = async () => {
  const { data } = await api.get("/listas/crud/Tipo");
  return data;
};

export const ListaService = {
  getBancos,
  getEstados,
};
