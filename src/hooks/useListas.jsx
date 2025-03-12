import { useQueries, keepPreviousData } from "@tanstack/react-query";
import { ListaService } from "../service/listas";

export const useListas = () => {
  const staleTime = 1000 * 60 * 10; // 10 minutos de staleTime
  const original = useQueries({
    queries: [
      {
        queryKey: ["listas-bancos"],
        queryFn: ListaService.getBancos,
        staleTime,
        placeholderData: keepPreviousData,
      },
      {
        queryKey: ["listas-estados"],
        queryFn: ListaService.getEstados,
        staleTime,
        placeholderData: keepPreviousData,
      },
    ],
  });

  const bancos = original[0].data?.map((banco) => ({
    label: banco.nome,
    value: banco._id,
  }));

  const estados = original[1].data?.map((estado) => ({
    cidades: estado.cidades,
    label: estado.nome,
    value: estado._id,
  }));

  const prestadorTipos = [
    { label: "PF", value: "PF" },
    { label: "PJ", value: "PJ" },
    { label: "EXT", value: "EXT" },
  ];

  const prestadorTipoConta = [
    { label: "Conta corrente", value: "Conta Corrente" },
    { label: "Conta poupança", value: "Conta Poupança" },
  ];

  const status = [
    { label: "Ativo", value: "ativo" },
    { label: "Inativo", value: "inativo" },
  ];

  return {
    original,
    bancos,
    estados,
    status,
    prestadorTipos,
    prestadorTipoConta,
  };
};
