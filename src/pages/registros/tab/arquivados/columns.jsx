import React from "react";

import { TableActionsCell } from "../../../../components/dataGrid/cells/tableActionsCell";

import { DefaultCell } from "../../../../components/dataGrid/cells/default";
import { RestaurarTicketAction } from "../../../../components/dataGrid/actions/restaurarTicketArquivado";

export const makeTicketsArquivadosDynamicColumns = () => {
  return [
    {
      accessorKey: "acoes",
      header: "Ações",
      enableSorting: false,
      size: 55,
      cell: (props) => (
        <TableActionsCell>
          <RestaurarTicketAction ticket={props.row.original} />
        </TableActionsCell>
      ),
    },
    {
      accessorKey: "_id",
      header: "ID",
      cell: DefaultCell,
      enableSorting: false,
      enableColumnFilter: true,
      meta: { filterKey: "_id" },
    },
    {
      accessorKey: "titulo",
      header: "Titulo",
      cell: DefaultCell,
      enableSorting: false,
      enableColumnFilter: true,
      meta: { filterKey: "titulo" },
    },
    {
      accessorKey: "prestador.nome",
      header: "Prestador",
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
  ];
};
