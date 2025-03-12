import React from "react";
import { CpfCnpjCell } from "../../components/dataGrid/cells/cpfCnpj";
import { SelectAutoCompleteCell } from "../../components/dataGrid/cells/selectAutoComplete";

import { DefaultCell } from "../../components/dataGrid/cells/default";
import { SelectCell } from "../../components/dataGrid/cells/select";
import { TableActions } from "./tableActions";

export const makeServicoDynamicColumns = ({}) => {
  return [
    {
      accessorKey: "acoes",
      header: "Ações",
      enableSorting: false,
      cell: TableActions,
    },
    {
      accessorKey: "mesCompetencia",
      header: "Mês de competência",
      cell: DefaultCell,
      enableColumnFilter: true,
      meta: { filterKey: "mesCompetencia" },
    },
    {
      accessorKey: "anoCompetencia",
      header: "Ano de competência",
      cell: DefaultCell,
      enableColumnFilter: true,
      meta: { filterKey: "anoCompetencia" },
    },
    {
      accessorKey: "descricao",
      header: "Descrição",
      enableColumnFilter: true,
      cell: DefaultCell,
      meta: { filterKey: "descricao" },
    },
    {
      accessorKey: "valor",
      header: "Valor",
      cell: DefaultCell,
      enableColumnFilter: true,
      meta: { filterKey: "valor" },
    },
  ];
};
