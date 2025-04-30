import React from "react";

import { SelectListaCell } from "../../components/dataGrid/cells/selectLista";
import { DateCell } from "../../components/dataGrid/cells/dateCell";
import { CompetenciaCell } from "../../components/dataGrid/cells/competenciaCell";
import { CurrencyCell } from "../../components/dataGrid/cells/currencyCell";
import { DisabledCurrencyCell } from "../../components/dataGrid/cells/disabledCurrencyCell";
import { DisabledDefaultCell } from "../../components/dataGrid/cells/disabledDefaultCell";
import { SelectPrestadorCell } from "../../components/dataGrid/cells/selectPrestador";
import { DocumentosFiscaisDialog } from "./dialog";
import { formatDateToDDMMYYYY } from "../../utils/formatting";
import { IconButton } from "@chakra-ui/react";
import { Pencil } from "lucide-react";
import { TableActionsCell } from "../../components/dataGrid/cells/tableActionsCell";
import { DeleteDocumentoFiscalAction } from "../../components/dataGrid/actions/deleteDocumentoFiscalButton";
import { SelectAutoCompleteCell } from "../../components/dataGrid/cells/selectAutoComplete";
import { DefaultEditableCell } from "../../components/dataGrid/cells/defaultEditable";
import { DocumentosFiscaisFilesDetailsCell } from "../../components/dataGrid/cells/documentosFiscaisFilesDetailsCell";

export const makeDocumentoFiscalDynamicColumns = () => {
  return [
    {
      accessorKey: "acoes",
      header: "Ações",
      enableSorting: false,
      cell: (props) => (
        <TableActionsCell>
          <DeleteDocumentoFiscalAction id={props.row.original?._id} />
          <DocumentosFiscaisDialog
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
              competencia: `${props.row.original.competencia?.mes
                ?.toString()
                .padStart(2, "0")}/${props.row.original.competencia?.ano}`,
            }}
          />
        </TableActionsCell>
      ),
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
      accessorKey: "tipoDocumentoFiscal",
      header: "Documento Fiscal",
      enableSorting: false,
      cell: (props) => (
        <SelectListaCell {...props} cod={"tipo-documento-fiscal"} />
      ),
      enableColumnFilter: true,
      meta: {
        filterKey: "tipoDocumentoFiscal",
        filterVariant: "selectLista",
        cod: "tipo-documento-fiscal",
      },
    },
    {
      accessorKey: "numero",
      header: "Numero",
      enableSorting: false,
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      meta: {
        filterKey: "numero",
      },
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
      accessorKey: "valor",
      header: "Valor",
      enableSorting: false,
      cell: CurrencyCell,
      enableColumnFilter: true,
      meta: { filterKey: "valor" },
    },
    {
      accessorKey: "imposto",
      header: "Imposto",
      enableSorting: false,
      cell: CurrencyCell,
      enableColumnFilter: true,
      meta: { filterKey: "imposto" },
    },
    {
      accessorKey: "classificacaoFiscal",
      header: "Classificação Fiscal",
      enableSorting: false,
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      meta: { filterKey: "classificacaoFiscal" },
    },
    {
      accessorKey: "descricao",
      header: "Descrição",
      enableSorting: false,
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      meta: { filterKey: "descricao" },
    },
    {
      accessorKey: "motivoRecusa",
      header: "Motivo recusa",
      enableSorting: false,
      cell: (props) => <SelectListaCell {...props} cod={"motivo-recusa"} />,
      enableColumnFilter: true,
      meta: {
        filterKey: "motivoRecusa",
        filterVariant: "selectLista",
        cod: "motivo-recusa",
      },
    },
    {
      accessorKey: "observacaoPrestador",
      header: "Observação Prestador",
      enableSorting: false,
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      meta: { filterKey: "observacaoPrestador" },
    },
    {
      accessorKey: "observacaoInterna",
      header: "Observação",
      enableSorting: false,
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      meta: { filterKey: "observacaoInterna" },
    },
    {
      accessorKey: "arquivo",
      header: "Arquivo",
      enableSorting: false,
      cell: DocumentosFiscaisFilesDetailsCell,
      enableColumnFilter: false,
    },
    {
      accessorKey: "statusValidacao",
      header: "Status validação",
      enableSorting: false,
      cell: (props) => (
        <SelectAutoCompleteCell
          {...props}
          options={[
            { label: "Pendente", value: "pendente" },
            { label: "Recusado", value: "recusado" },
            { label: "Aprovado", value: "aprovado" },
          ]}
        />
      ),
      enableColumnFilter: true,
      meta: {
        filterKey: "statusValidacao",
        filterVariant: "select",
        filterOptions: [
          { label: "Pendente", value: "pendente" },
          { label: "Recusado", value: "recusado" },
          { label: "Aprovado", value: "aprovado" },
        ],
      },
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
          { label: "Processando", value: "processando" },
          { label: "Pago", value: "pago" },
        ],
      },
    },
  ];
};
