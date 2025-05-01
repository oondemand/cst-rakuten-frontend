import { preprocessEmptyToUndefined } from "../../utils/zodHelpers";
import { SelectPrestadorField } from "../../components/buildForm/filds/selectPrestadorField";
import { z } from "zod";
import { CompetenciaField } from "../../components/buildForm/filds/competenciaField";
import { SelectListaField } from "../../components/buildForm/filds/selectListaField";
import { DateField } from "../../components/buildForm/filds/dateField";
import { CurrencyField } from "../../components/buildForm/filds/currencyField";
import { DefaultField } from "../../components/buildForm/filds/default";
import { currencyValidation, dateValidation } from "../../utils/zodHelpers";

export const createDynamicFormFields = () => {
  return [
    {
      accessorKey: "prestador",
      label: "Prestador",
      render: SelectPrestadorField,
      validation: z.object(
        { label: z.string(), value: z.string() },
        { message: "Prestador é obrigatório" }
      ),
      colSpan: 2,
    },
    {
      accessorKey: "campanha",
      label: "Campanha",
      render: SelectListaField,
      cod: "campanha",
      validation: z.string().optional(),
      colSpan: 2,
    },
    {
      accessorKey: "competencia",
      label: "Competência",
      render: CompetenciaField,
      validation: z.string().min(7, { message: "Data inválida" }),
      colSpan: 1,
    },
    {
      accessorKey: "notaFiscal",
      label: "Nota Fiscal",
      render: DefaultField,
      validation: z.string().optional(),
      colSpan: 1,
    },
    {
      accessorKey: "tipoDocumentoFiscal",
      label: "Documento Fiscal",
      cod: "tipo-documento-fiscal",
      render: SelectListaField,
      validation: z.string().optional(),
      colSpan: 1,
    },
    {
      accessorKey: "dataProvisaoContabil",
      label: "Data Provisão Contábil",
      render: DateField,
      validation: dateValidation,
      colSpan: 1,
    },
    {
      accessorKey: "dataRegistro",
      label: "Data Registro",
      render: DateField,
      validation: dateValidation,
      colSpan: 1,
    },
    {
      accessorKey: "valores.grossValue",
      label: "Gross Value",
      render: CurrencyField,
      validation: currencyValidation,
      colSpan: 1,
    },
    {
      accessorKey: "valores.bonus",
      label: "Bonus",
      render: CurrencyField,
      validation: currencyValidation,
      colSpan: 1,
    },
    {
      accessorKey: "valores.ajusteComercial",
      label: "Ajuste Comercial",
      render: CurrencyField,
      validation: currencyValidation,
      colSpan: 1,
    },
    {
      accessorKey: "valores.paidPlacement",
      label: "Paid Placement",
      render: CurrencyField,
      validation: currencyValidation,
      colSpan: 1,
    },
    {
      accessorKey: "valores.revisionMonthProvision",
      label: "Data de revisão",
      render: DateField,
      validation: dateValidation,
      colSpan: 1,
    },
    {
      accessorKey: "valores.revisionGrossValue",
      label: "Revisão - Gross Value",
      render: CurrencyField,
      validation: currencyValidation,
      colSpan: 1,
    },
    {
      accessorKey: "valores.revisionProvisionBonus",
      label: "Revisão - Bonus",
      render: CurrencyField,
      validation: currencyValidation,
      colSpan: 1,
    },
    {
      accessorKey: "valores.revisionComissaoPlataforma",
      label: "Revisão - Comissão Plataforma",
      render: CurrencyField,
      validation: currencyValidation,
      colSpan: 1,
    },
    {
      accessorKey: "valores.revisionPaidPlacement",
      label: "Revisão - Paid Placement",
      render: CurrencyField,
      validation: currencyValidation,
      colSpan: 1,
    },
    {
      accessorKey: "valores.totalServico",
      label: "Total Serviço",
      render: CurrencyField,
      disabled: true,
    },
    {
      accessorKey: "valores.totalRevisao",
      label: "Total Revisão",
      render: CurrencyField,
      disabled: true,
    },
    {
      accessorKey: "valores.imposto",
      label: "Imposto",
      render: CurrencyField,
      validation: currencyValidation,
      colSpan: 1,
    },
    {
      accessorKey: "valor",
      label: "Valor total",
      render: CurrencyField,
      disabled: true,
    },
  ];
};
