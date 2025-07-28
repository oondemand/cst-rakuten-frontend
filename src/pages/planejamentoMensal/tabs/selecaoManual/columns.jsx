import { Text, Box, Flex } from "@chakra-ui/react";
import { currency } from "../../../../utils/currency";
import { CheckActionCell } from "../../../../components/dataGrid/actions/checkbox-cell";
import { DefaultCell } from "../../../../components/dataGrid/cells/default";
import { DateCell } from "../../../../components/dataGrid/cells/dateCell";
import { formatDateToDDMMYYYY } from "../../../../utils/formatting";
import { HeaderCheckActionCell } from "../../../../components/dataGrid/actions/header-checkbox-cell";
import { TotalSumFooterCell } from "../../../../components/dataGrid/cells/totalSumFooterCell";

export const makeServicoDynamicColumns = () => {
  return [
    {
      accessorKey: "acoes",
      header: (props) => <HeaderCheckActionCell {...props} />,
      enableSorting: false,
      size: 50,
      cell: (props) => <CheckActionCell {...props} />,
    },
    {
      accessorKey: "_id",
      header: "ID",
      cell: DefaultCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: {
        filterKey: "_id",
      },
    },
    {
      accessorKey: "prestador.sid",
      header: "Sid",
      enableSorting: false,
      cell: DefaultCell,
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
      size: 120,
      enableColumnFilter: true,
      meta: {
        filterKey: "prestador.tipo",
        filterVariant: "select",
        filterOptions: [
          { label: "PJ", value: "pj" },
          { label: "PF", value: "pf" },
          { label: "EXT", value: "ext" },
        ],
      },
    },
    {
      accessorKey: "tipoDocumentoFiscal",
      header: "Documento fiscal",
      enableSorting: false,
      cell: (props) => (
        <Flex minH="8">
          <Text alignSelf="center" fontSize="sm" truncate>
            {props.getValue()?.toUpperCase()}
          </Text>
        </Flex>
      ),
      size: 120,
      enableColumnFilter: true,
      meta: {
        filterKey: "tipoDocumentoFiscal",
        filterVariant: "selectLista",
        cod: "tipo-documento-fiscal",
      },
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
      enableColumnFilter: true,
      meta: {
        filterKey: "competencia",
        filterVariant: "competencia",
      },
    },
    {
      accessorKey: "dataRegistro",
      header: "Data Registro",
      enableSorting: false,
      cell: (props) => (
        <Flex minH="8">
          <Text alignSelf="center" fontSize="sm" truncate>
            {formatDateToDDMMYYYY(props.getValue())}
          </Text>
        </Flex>
      ),
      enableColumnFilter: true,
      meta: { filterKey: "dataRegistro" },
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: false,
      cell: DefaultCell,
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
      footer: (props) => (
        <TotalSumFooterCell
          sum={props.table.options.data?.reduce((acc, cur) => {
            return acc + (cur?.valor ?? 0);
          }, 0)}
        />
      ),
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
