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
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      accessorKey: "titulo",
      header: "Titulo",
      enableColumnFilter: false,
      cell: DefaultCell,
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
  ];
};
