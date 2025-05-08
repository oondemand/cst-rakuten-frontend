import React from "react";

import { TableActionsCell } from "../../components/dataGrid/cells/tableActionsCell";

import { DefaultCell } from "../../components/dataGrid/cells/default";
import { AnexarArquivoAoTicketAction } from "../../components/dataGrid/actions/anexarArquivoAoTicket";
import { Text } from "@chakra-ui/react";
import { currency } from "../../utils/currency";
import { FilesDetailsCell } from "../../components/dataGrid/cells/filesDetailsCell";
import { ServicosDetailsCell } from "../../components/dataGrid/cells/servicosDetailsCell";
import { formatDateToDDMMYYYY } from "../../utils/formatting";
import { DocumentosFiscaisDetailsCell } from "../../components/dataGrid/cells/documentosFiscaisDetailsCell";

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
      enableSorting: false,
      meta: { filterKey: "titulo" },
    },
    {
      accessorKey: "createdAt",
      header: "Criado em",
      cell: (props) => (
        <Text fontSize="sm">
          {formatDateToDDMMYYYY(props.row.original?.createdAt)}
        </Text>
      ),
      enableSorting: false,
      enableColumnFilter: true,
      meta: { filterKey: "createdAt" },
    },
    {
      accessorKey: "prestador.nome",
      header: "Prestador",
      cell: DefaultCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "prestador.nome" },
    },
    {
      accessorKey: "prestador.sid",
      header: "SID",
      cell: DefaultCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "prestador.sid" },
    },
    {
      accessorKey: "prestador.documento",
      header: "Documento",
      cell: DefaultCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "prestador.documento" },
    },
    {
      accessorKey: "tipoDocumento",
      header: "Tipo",
      enableColumnFilter: false,
      enableSorting: false,
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
      enableSorting: false,
      cell: ServicosDetailsCell,
    },
    {
      accessorKey: "valorTotalDosServicos",
      header: "Valor total dos serviços",
      enableColumnFilter: false,
      enableSorting: false,
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
      enableSorting: false,
      cell: FilesDetailsCell,
    },
    {
      accessorKey: "quantidadeTotalDeDocumentosFiscais",
      header: "Documentos fiscais",
      enableColumnFilter: false,
      enableSorting: false,
      cell: DocumentosFiscaisDetailsCell,
    },
  ];
};
