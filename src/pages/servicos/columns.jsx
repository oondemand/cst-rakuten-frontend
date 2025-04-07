import React from "react";

import { SelectListaCell } from "../../components/dataGrid/cells/selectLista";
import { DateCell } from "../../components/dataGrid/cells/dateCell";
import { CompetenciaCell } from "../../components/dataGrid/cells/competenciaCell";
import { CurrencyCell } from "../../components/dataGrid/cells/currencyCell";
import { DisabledCurrencyCell } from "../../components/dataGrid/cells/disabledCurrencyCell";
import { DisabledDefaultCell } from "../../components/dataGrid/cells/disabledDefaultCell";
import { SelectPrestadorCell } from "../../components/dataGrid/cells/selectPrestador";
import { ServicosDialog } from "./dialog";
import { formatDateToDDMMYYYY } from "../../utils/formatting";
import { IconButton } from "@chakra-ui/react";
import { Pencil } from "lucide-react";
import { TableActionsCell } from "../../components/dataGrid/cells/tableActionsCell";
import { DeleteServicoAction } from "../../components/dataGrid/actions/deleteServicoButton";
import { SelectAutoCompleteCell } from "../../components/dataGrid/cells/selectAutoComplete";
import { DefaultEditableCell } from "../../components/dataGrid/cells/defaultEditable";

export const makeServicoDynamicColumns = () => {
  return [
    {
      accessorKey: "acoes",
      header: "Ações",
      enableSorting: false,
      cell: (props) => (
        <TableActionsCell>
          <DeleteServicoAction id={props.row.original?._id} />
          <ServicosDialog
            trigger={
              <IconButton variant="surface" colorPalette="gray" size="2xs">
                <Pencil />
              </IconButton>
            }
            label="Serviço"
            defaultValues={{
              ...props.row.original,
              prestador: {
                label: `${props.row.original?.prestador?.nome}-${props.row.original?.prestador?.sid}-${props.row.original?.prestador?.documento}`,
                value: props.row.original?.prestador?._id,
              },
              dataProvisaoContabil: formatDateToDDMMYYYY(
                props.row.original?.dataProvisaoContabil
              ),
              dataRegistro: formatDateToDDMMYYYY(
                props.row.original?.dataRegistro
              ),
              competencia: `${props.row.original.competencia.mes
                .toString()
                .padStart(2, "0")}/${props.row.original.competencia.ano}`,
              valores: {
                ...props.row.original?.valores,
                revisionMonthProvision: formatDateToDDMMYYYY(
                  props.row.original?.valores?.revisionMonthProvision
                ),
              },
            }}
          />
        </TableActionsCell>
      ),
    },
    {
      accessorKey: "notaFiscal",
      header: "Nota fiscal",
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: {
        filterKey: "notaFiscal",
      },
    },
    {
      accessorKey: "tipoDocumentoFiscal",
      header: "Documento Fiscal",
      enableSorting: false,
      cell: (props) => (
        <SelectListaCell {...props} cod={"tipo-documento-fiscal"} />
      ),
      enableColumnFilter: true,
      meta: {
        filterKey: "tipoDocumentoFiscal",
        filterVariant: "select",
        filterOptions: [
          { label: "INVOICE", value: "INVOICE" },
          { label: "RPA", value: "RPA" },
          { label: "NF", value: "NF" },
          { label: "RECIBO", value: "RECIBO" },
          { label: "FATURA", value: "FATURA" },
        ],
      },
    },
    {
      accessorKey: "prestador",
      header: "Prestador",
      enableSorting: false,
      cell: SelectPrestadorCell,
      enableColumnFilter: true,
      meta: {
        filterVariant: "selectPrestador",
        filterKey: "prestador",
      },
    },
    {
      accessorKey: "dataProvisaoContabil",
      header: "Data Provisão Contábil",
      enableSorting: false,
      cell: DateCell,
      enableColumnFilter: true,
      meta: { filterKey: "dataProvisaoContabil" },
    },
    {
      accessorKey: "dataRegistro",
      header: "Data Registro",
      enableSorting: false,
      cell: DateCell,
      enableColumnFilter: true,
      meta: { filterKey: "dataRegistro" },
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
      accessorKey: "competencia",
      header: "Competência",
      enableSorting: false,
      cell: CompetenciaCell,
      enableColumnFilter: true,
      meta: { filterKey: "competencia", filterVariant: "competencia" },
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: false,
      cell: DisabledDefaultCell,
      enableColumnFilter: true,
      meta: {
        filterKey: "status",
        filterVariant: "select",
        filterOptions: [
          { label: "Em aberto", value: "aberto" },
          { label: "Pendente", value: "pendente" },
          { label: "Pago", value: "pago" },
          { label: "Pago externo", value: "pago-externo" },
        ],
      },
    },
    {
      accessorKey: "valores.grossValue",
      header: "Gross Value",
      enableSorting: false,
      cell: CurrencyCell,
      enableColumnFilter: true,
      meta: { filterKey: "valores.grossValue" },
    },
    {
      accessorKey: "valores.bonus",
      header: "Bonus",
      enableSorting: false,
      cell: CurrencyCell,
      enableColumnFilter: true,
      meta: { filterKey: "valores.bonus" },
    },
    {
      accessorKey: "valores.ajusteComercial",
      header: "Ajuste Comercial",
      enableSorting: false,
      cell: CurrencyCell,
      enableColumnFilter: true,
      meta: { filterKey: "valores.ajusteComercial" },
    },
    {
      accessorKey: "valores.paidPlacement",
      header: "Paid Placement",
      enableSorting: false,
      cell: CurrencyCell,
      enableColumnFilter: true,
      meta: { filterKey: "valores.paidPlacement" },
    },
    {
      accessorKey: "valores.totalServico",
      header: "Total Serviço",
      enableSorting: false,
      cell: DisabledCurrencyCell,
      enableColumnFilter: false,
      meta: { filterKey: "valores.totalServico" },
    },
    {
      accessorKey: "valores.revisionMonthProvision",
      header: "Data de revisão",
      enableSorting: false,
      cell: DateCell,
      enableColumnFilter: true,
      meta: { filterKey: "valores.revisionMonthProvision" },
    },
    {
      accessorKey: "valores.revisionGrossValue",
      header: "Revisão - Gross Value",
      enableSorting: false,
      cell: CurrencyCell,
      enableColumnFilter: true,
      meta: { filterKey: "valores.revisionGrossValue" },
    },
    {
      accessorKey: "valores.revisionProvisionBonus",
      header: "Revisão - Bonus",
      enableSorting: false,
      cell: CurrencyCell,
      enableColumnFilter: true,
      meta: { filterKey: "valores.revisionProvisionBonus" },
    },
    {
      accessorKey: "valores.revisionComissaoPlataforma",
      header: "Revisão - Comissão Plataforma",
      enableSorting: false,
      cell: CurrencyCell,
      enableColumnFilter: true,
      meta: { filterKey: "valores.revisionComissaoPlataforma" },
    },
    {
      accessorKey: "valores.revisionPaidPlacement",
      header: "Revisão - Paid Placement",
      enableSorting: false,
      cell: CurrencyCell,
      enableColumnFilter: true,
      meta: { filterKey: "valores.revisionPaidPlacement" },
    },
    {
      accessorKey: "valores.totalRevisao",
      header: "Total Revisão",
      enableSorting: false,
      cell: DisabledCurrencyCell,
      enableColumnFilter: false,
      meta: { filterKey: "valores.totalRevisao" },
    },
    {
      accessorKey: "valores.imposto",
      header: "Imposto",
      enableSorting: false,
      cell: CurrencyCell,
      enableColumnFilter: true,
      meta: { filterKey: "valores.imposto" },
    },
    {
      accessorKey: "valor",
      header: "Valor total",
      enableSorting: false,
      cell: DisabledCurrencyCell,
      enableColumnFilter: false,
      meta: { filterKey: "valor" },
    },
  ];
};
