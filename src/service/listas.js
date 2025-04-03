import { api } from "../config/api";

const getListByCode = async ({ cod }) => {
  const { data } = await api.get(`listas/${cod}`);
  return data;
};

const getListas = async () => {
  const { data } = await api.get(`/listas`);
  return data;
};

export const ListaService = {
  getListByCode,
  getListas,
};
