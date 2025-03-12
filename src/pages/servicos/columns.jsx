import React from "react";

import { SelectListaCell } from "../../components/dataGrid/cells/selectLista";
import { DateInputCell } from "../../components/dataGrid/cells/dateInput";
import { CompetenciaInputCell } from "../../components/dataGrid/cells/competenciaInput";
import { CurrencyInputCell } from "../../components/dataGrid/cells/currencyInput";
import { DisabledCurrencyInputCell } from "../../components/dataGrid/cells/disabledCurrencyInput";
import { DisabledDefaultCell } from "../../components/dataGrid/cells/disabledDefaultCell";
import { SelectPrestadorCell } from "../../components/dataGrid/cells/selectPrestador";

export const makeServicoDynamicColumns = ({}) => {
  return [
    // {
    //   accessorKey: "acoes",
    //   header: "Ações",
    //   enableSorting: false,
    //   cell: TableActions,
    // },
    {
      accessorKey: "tipoDocumentoFiscal",
      header: "Documento Fiscal",
      enableSorting: false,
      cell: (props) => (
        <SelectListaCell {...props} cod={"tipo-documento-fiscal"} />
      ),
      enableColumnFilter: true,
      meta: { filterKey: "tipoDocumentoFiscal" },
    },
    {
      accessorKey: "prestador",
      header: "Prestador",
      enableSorting: false,
      cell: SelectPrestadorCell,
      enableColumnFilter: false,
      meta: { filterKey: "prestador.nome" },
    },
    {
      accessorKey: "dataProvisaoContabil",
      header: "Data Provisão Contábil",
      enableSorting: false,
      cell: DateInputCell,
      enableColumnFilter: false,
      meta: { filterKey: "dataProvisaoContabil" },
    },
    {
      accessorKey: "dataRegistro",
      header: "Data Registro",
      enableSorting: false,
      cell: DateInputCell,
      enableColumnFilter: false,
      meta: { filterKey: "dataRegistro" },
    },
    {
      accessorKey: "competencia",
      header: "Competência",
      enableSorting: false,
      cell: CompetenciaInputCell,
      enableColumnFilter: true,
      meta: { filterKey: "competencia.mes" },
    },
    {
      accessorKey: "campanha",
      header: "Campanha",
      enableSorting: false,
      cell: (props) => <SelectListaCell {...props} cod={"campanha"} />,
      enableColumnFilter: true,
      meta: { filterKey: "campanha" },
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: false,
      cell: DisabledDefaultCell,
      enableColumnFilter: true,
      meta: { filterKey: "status" },
    },
    {
      accessorKey: "valores.grossValue",
      header: "Gross Value",
      enableSorting: false,
      cell: CurrencyInputCell,
      enableColumnFilter: true,
      meta: { filterKey: "valores.grossValue" },
    },
    {
      accessorKey: "valores.bonus",
      header: "Bonus",
      enableSorting: false,
      cell: CurrencyInputCell,
      enableColumnFilter: true,
      meta: { filterKey: "valores.bonus" },
    },
    {
      accessorKey: "valores.ajusteComercial",
      header: "Ajuste Comercial",
      enableSorting: false,
      cell: CurrencyInputCell,
      enableColumnFilter: true,
      meta: { filterKey: "valores.ajusteComercial" },
    },
    {
      accessorKey: "valores.paidPlacement",
      header: "Paid Placement",
      enableSorting: false,
      cell: CurrencyInputCell,
      enableColumnFilter: true,
      meta: { filterKey: "valores.paidPlacement" },
    },
    // {
    //   accessorKey: "valores.revisionMonthProvision",
    //   header: "Revisão - Mês Provisão",
    //   enableSorting: false,
    //   cell: InputCell,
    //   enableColumnFilter: true,
    //   meta: { filterKey: "valores.revisionMonthProvision" },
    // },
    {
      accessorKey: "valores.revisionGrossValue",
      header: "Revisão - Gross Value",
      enableSorting: false,
      cell: CurrencyInputCell,
      enableColumnFilter: true,
      meta: { filterKey: "valores.revisionGrossValue" },
    },
    {
      accessorKey: "valores.revisionProvisionBonus",
      header: "Revisão - Bonus",
      enableSorting: false,
      cell: CurrencyInputCell,
      enableColumnFilter: true,
      meta: { filterKey: "valores.revisionProvisionBonus" },
    },
    {
      accessorKey: "valores.revisionComissaoPlataforma",
      header: "Revisão - Comissão Plataforma",
      enableSorting: false,
      cell: CurrencyInputCell,
      enableColumnFilter: true,
      meta: { filterKey: "valores.revisionComissaoPlataforma" },
    },
    {
      accessorKey: "valores.revisionPaidPlacement",
      header: "Revisão - Paid Placement",
      enableSorting: false,
      cell: CurrencyInputCell,
      enableColumnFilter: true,
      meta: { filterKey: "valores.revisionPaidPlacement" },
    },
    {
      accessorKey: "valores.totalServico",
      header: "Total Serviço",
      enableSorting: false,
      cell: DisabledCurrencyInputCell,
      enableColumnFilter: false,
      meta: { filterKey: "valores.totalServico" },
    },
    {
      accessorKey: "valores.totalRevisao",
      header: "Total Revisão",
      enableSorting: false,
      cell: DisabledCurrencyInputCell,
      enableColumnFilter: false,
      meta: { filterKey: "valores.totalRevisao" },
    },
    {
      accessorKey: "valor",
      header: "Valor total",
      enableSorting: false,
      cell: DisabledCurrencyInputCell,
      enableColumnFilter: false,
      meta: { filterKey: "valor" },
    },
  ];
};
