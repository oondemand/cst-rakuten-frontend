import React from "react";

import { TableActionsCell } from "../../components/dataGrid/cells/tableActionsCell";

import { DefaultCell } from "../../components/dataGrid/cells/default";
import { AnexarArquivoAoTicketAction } from "../../components/dataGrid/actions/anexarArquivoAoTicket";
import { Text } from "@chakra-ui/react";
import { currency } from "../../utils/currency";
import { FilesDetailsCell } from "../../components/dataGrid/cells/filesDetailsCell";
import { ServicosDetailsCell } from "../../components/dataGrid/cells/servicosDetailsCell";
import { formatDateToDDMMYYYY } from "../../utils/formatting";

export const makeTicketsArquivadosDynamicColumns = () => {
  return [
    {
      accessorKey: "acoes",
      header: "Ações",
      enableSorting: false,
      size: 55,
      cell: (props) => (
        <TableActionsCell>
          <AnexarArquivoAoTicketAction ticket={props.row.original} />
        </TableActionsCell>
      ),
    },
    {
      accessorKey: "titulo",
      header: "Titulo",
      cell: DefaultCell,
      enableColumnFilter: true,
      meta: { filterKey: "dataRegistro" },
    },
    {
      accessorKey: "createdAt",
      header: "Criado em",
      cell: (props) => (
        <Text fontSize="sm">
          {formatDateToDDMMYYYY(props.row.original?.createdAt)}
        </Text>
      ),
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      accessorKey: "prestador.nome",
      header: "Prestador",
      enableColumnFilter: false,
      cell: DefaultCell,
    },
    {
      accessorKey: "prestador.sid",
      header: "SID",
      enableColumnFilter: false,
      cell: DefaultCell,
    },
    {
      accessorKey: "prestador.documento",
      header: "Documento",
      enableColumnFilter: false,
      cell: DefaultCell,
    },
    {
      accessorKey: "tipoDocumento",
      header: "Tipo",
      enableColumnFilter: false,
      cell: (props) => (
        <Text fontSize="sm">
          {props.row.original?.servicos?.[0]?.tipoDocumentoFiscal}
        </Text>
      ),
    },
    {
      accessorKey: "quantidadeTotalDeServicos",
      header: "Numero de serviços",
      enableColumnFilter: false,
      cell: ServicosDetailsCell,
    },
    {
      accessorKey: "valorTotalDosServicos",
      header: "Valor total dos serviços",
      enableColumnFilter: false,
      cell: (props) => (
        <Text fontSize="sm">
          {currency.format(
            props.row.original?.servicos.reduce((acc, curr) => {
              acc = acc + (curr.valor ?? 0);
              return acc;
            }, 0)
          )}
        </Text>
      ),
    },
    {
      accessorKey: "quantidadeTotalDeAnexos",
      header: "Numero de anexos",
      enableColumnFilter: false,
      cell: FilesDetailsCell,
    },
  ];
};
