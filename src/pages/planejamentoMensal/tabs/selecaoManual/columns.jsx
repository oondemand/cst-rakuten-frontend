import { Text, Box, Flex } from "@chakra-ui/react";
import { currency } from "../../../../utils/currency";
import { CheckAction } from "../../../../components/dataGrid/actions/checkbox";

export const makeServicoDynamicColumns = () => {
  return [
    {
      accessorKey: "acoes",
      header: "Ações",
      enableSorting: false,
      size: 50,
      cell: (props) => <CheckAction {...props} />,
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
      size: 120,
      enableColumnFilter: true,
      meta: {
        filterKey: "prestador.sid",
      },
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
      enableColumnFilter: true,
      meta: {
        filterKey: "prestador.nome",
      },
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
      enableColumnFilter: true,
      meta: {
        filterKey: "prestador.documento",
      },
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
