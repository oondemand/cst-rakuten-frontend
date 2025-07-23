import { Box, Flex, Text } from "@chakra-ui/react";
import { DefaultCell } from "../../../../../components/dataGrid/cells/default";

export const makeTicketsArquivadosDynamicColumns = () => {
  return [
    {
      accessorKey: "acoes",
      header: "Ações",
      // cell: DefaultCell,
      enableSorting: false,
      enableColumnFilter: false,
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
      accessorKey: "arquivado",
      header: "Arquivado",
      cell: (props) => (
        <Box minH="8" fontSize="sm" alignContent="center" px="1">
          {props.getValue() && "Arquivado"}
        </Box>
      ),
      enableColumnFilter: true,
      meta: {
        filterKey: "arquivado",
        filterVariant: "select",
        filterOptions: [{ label: "Arquivados", value: "true" }],
      },
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
        ],
      },
    },
  ];
};
