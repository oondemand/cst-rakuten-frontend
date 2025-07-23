import { DefaultCell } from "../../../../components/dataGrid/cells/default";

export const makeTicketsArquivadosDynamicColumns = () => {
  return [
    {
      accessorKey: "_id",
      header: "ID",
      cell: DefaultCell,
      enableSorting: false,
      enableColumnFilter: true,
      meta: { filterKey: "_id" },
    },
    {
      accessorKey: "prestador.nome",
      header: "Nome do Prestador",
      cell: DefaultCell,
      enableSorting: false,
      enableColumnFilter: true,
      meta: { filterKey: "prestador.nome" },
    },
    {
      accessorKey: "prestador.sid",
      header: "SID",
      cell: DefaultCell,
      enableSorting: false,
      enableColumnFilter: true,
      meta: { filterKey: "prestador.sid" },
    },
    {
      accessorKey: "prestador.documento",
      header: "Documento",
      cell: DefaultCell,
      enableSorting: false,
      enableColumnFilter: true,
      meta: { filterKey: "prestador.documento" },
    },
    {
      accessorKey: "motivoArquivamento",
      header: "Motivo do Arquivamento",
      cell: DefaultCell,
      enableSorting: false,
      enableColumnFilter: true,
      meta: { filterKey: "motivoArquivamento" },
    },
  ];
};
