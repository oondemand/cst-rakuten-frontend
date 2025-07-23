import { DefaultCell } from "../../../../components/dataGrid/cells/default";

export const makeTicketsArquivadosDynamicColumns = () => {
  return [
    {
      accessorKey: "_id",
      header: "ID",
      cell: DefaultCell,
      enableSorting: false,
      enableColumnFilter: false,
      meta: { filterKey: "_id" },
    },
    {
      accessorKey: "prestador.nome",
      header: "Nome do Prestador",
      cell: DefaultCell,
      enableSorting: false,
      enableColumnFilter: false,
      meta: { filterKey: "prestador.nome" },
    },
    {
      accessorKey: "prestador.sid",
      header: "SID",
      cell: DefaultCell,
      enableSorting: false,
      enableColumnFilter: false,
      meta: { filterKey: "prestador.sid" },
    },
    {
      accessorKey: "prestador.documento",
      header: "Documento",
      cell: DefaultCell,
      enableSorting: false,
      enableColumnFilter: false,
      meta: { filterKey: "prestador.documento" },
    },
    {
      accessorKey: "motivoArquivamento",
      header: "Motivo do Arquivamento",
      cell: DefaultCell,
      enableSorting: false,
      enableColumnFilter: true,
      meta: {
        filterKey: "motivoArquivamento",
        filterVariant: "select",
        filterOptions: [
          { label: "Duplicidade", value: "duplicidade" },
          { label: "Arquivado pelo usuario", value: "arquivado pelo usuario" },
          { label: "Exterior", value: "ext" },
        ],
      },
    },
  ];
};
