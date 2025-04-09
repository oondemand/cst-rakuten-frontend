import React from "react";

import { TableActionsCell } from "../../../../components/dataGrid/cells/tableActionsCell";

import { DefaultCell } from "../../../../components/dataGrid/cells/default";
// import { RestaurarTicketAction } from "../../../../components/dataGrid/actions/restaurarTicketArquivado";
import { format } from "date-fns";

export const makeTicketsArquivadosDynamicColumns = () => {
  return [
    {
      accessorKey: "dataHora",
      header: "Data",
      cell: (props) => (
        <DefaultCell
          {...{
            ...props,
            getValue: () => {
              return format(props.getValue(), "dd/MM/yyyy hh:ss");
            },
          }}
        />
      ),
      enableSorting: false,
      enableColumnFilter: true,
      meta: { filterKey: "dataHora" },
    },
    {
      accessorKey: "usuario.nome",
      header: "Usuario",
      cell: DefaultCell,
      enableSorting: false,
      enableColumnFilter: true,
      meta: { filterKey: "usuario.nome" },
    },
    {
      accessorKey: "tipoRegistroAlterado",
      header: "Tipo de registro",
      cell: DefaultCell,
      enableSorting: false,
      enableColumnFilter: true,
      meta: {
        filterKey: "tipoRegistroAlterado",
        filterVariant: "select",
        filterOptions: [
          { value: "usuario", label: "Usuario" },
          { value: "ticket", label: "Ticket" },
        ],
      },
    },
    {
      accessorKey: "idRegistroAlterado",
      header: "Id",
      cell: DefaultCell,
      enableSorting: false,
      enableColumnFilter: true,
      meta: { filterKey: "idRegistroAlterado" },
    },
    {
      accessorKey: "origem",
      header: "Origem",
      cell: DefaultCell,
      enableSorting: false,
      enableColumnFilter: true,
      meta: { filterKey: "origem" },
    },
    {
      accessorKey: "acao",
      header: "Ação",
      cell: DefaultCell,
      enableSorting: false,
      enableColumnFilter: true,
      meta: {
        filterKey: "acao",
        filterVariant: "select",
        filterOptions: [
          { value: "adicionar", label: "Adicionar" },
          { value: "alterar", label: "Alterar" },
          { value: "aprovar", label: "Aprovar" },
          { value: "excluir", label: "Excluir" },
          { value: "reprovar", label: "Reprovar" },
          { value: "status", label: "Status" },
        ],
      },
    },
  ];
};
