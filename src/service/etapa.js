import { api } from "../config/api";

const listarEtapas = async () => {
  const { data } = await api.get("/etapas/ativas");
  return data;
};

export const EtapaService = {
  listarEtapas,
};
