import { api } from "../config/api";

const sincronizarEsteira = async () => {
  return api.post("/planejamento/sincronizar-esteira");
};

export const PlanejamentoService = {
  sincronizarEsteira,
};
