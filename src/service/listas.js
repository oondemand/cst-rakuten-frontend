import { api } from "../config/api";

const getListByCode = async ({ cod }) => {
  const { data } = await api.get(`listas/${cod}`);
  return data;
};

export const ListaService = {
  getListByCode,
};
