import { Text, Box, Flex } from "@chakra-ui/react";
import { currency } from "../../../../utils/currency";

export const makeServicoDynamicColumns = () => {
  return [
    {
      accessorKey: "acoes",
      header: "Ações",
      enableSorting: false,
      size: 50,
      cell: (props) => (
        <Flex minH="8">
          <Text alignSelf="center" fontSize="sm" truncate>
            {props.getValue()}
          </Text>
        </Flex>
      ),
    },
    {
      accessorKey: "prestador.sid",
      header: "Sid",
      enableSorting: false,
      cell: (props) => (
        <Flex minH="8">
          <Text alignSelf="center" fontSize="sm" truncate>
            {props.getValue()}
          </Text>
        </Flex>
      ),
      size: 80,
    },
    {
      accessorKey: "prestador.nome",
      header: "Nome",
      enableSorting: false,
      cell: (props) => (
        <Flex minH="8">
          <Text alignSelf="center" fontSize="sm" truncate>
            {props.getValue()}
          </Text>
        </Flex>
      ),
      size: 400,
    },
    {
      accessorKey: "prestador.tipo",
      header: "Tipo",
      enableSorting: false,
      cell: (props) => (
        <Flex minH="8">
          <Text alignSelf="center" fontSize="sm" truncate>
            {props.getValue()?.toUpperCase()}
          </Text>
        </Flex>
      ),
      size: 50,
    },
    {
      accessorKey: "prestador.documento",
      header: "Documento",
      enableSorting: false,
      cell: (props) => (
        <Flex minH="8">
          <Text alignSelf="center" fontSize="sm" truncate>
            {props.getValue()}
          </Text>
        </Flex>
      ),
    },
    {
      accessorKey: "competencia",
      header: "Competência",
      enableSorting: false,
      cell: (props) => (
        <Flex minH="8">
          <Text alignSelf="center" fontSize="sm" truncate>
            {props.getValue()?.mes?.toString()?.padStart(2, "0")}/
            {props.getValue()?.ano}
          </Text>
        </Flex>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: false,
      cell: (props) => (
        <Flex minH="8">
          <Text alignSelf="center" fontSize="sm" truncate>
            {props.getValue()}
          </Text>
        </Flex>
      ),
      enableColumnFilter: true,
      meta: {
        filterKey: "status",
        filterVariant: "select",
        filterOptions: [
          { label: "Em aberto", value: "aberto" },
          { label: "Pendente", value: "pendente" },
          { label: "Processando", value: "processando" },
        ],
      },
    },
    {
      accessorKey: "valor",
      header: "Valor total",
      enableSorting: false,
      meta: { filterKey: "valor" },
      enableColumnFilter: false,
      cell: (props) => (
        <Flex minH="8">
          <Text alignSelf="center" fontSize="sm" truncate>
            {currency.format(props.getValue())}
          </Text>
        </Flex>
      ),
    },
  ];
};
