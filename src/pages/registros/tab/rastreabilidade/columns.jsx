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
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      accessorKey: "usuario.nome",
      header: "Usuario",
      cell: DefaultCell,
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      accessorKey: "tipoRegistroAlterado",
      header: "Tipo de registro",
      cell: DefaultCell,
      enableSorting: false,
      meta: {
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
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      accessorKey: "origem",
      header: "Origem",
      cell: DefaultCell,
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      accessorKey: "acao",
      header: "Ação",
      cell: DefaultCell,
      enableSorting: false,
      meta: {
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
