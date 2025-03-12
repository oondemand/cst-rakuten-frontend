import React from "react";
import { FloatInputField } from "../../components/buildForm/filds/floatingInput";
import { SelectAutoCompleteField } from "../../components/buildForm/filds/selectAutocomplete";
import { TextareaField } from "../../components/buildForm/filds/textarea";

// const currencyValidation = preprocessEmptyToUndefined(
//   z.coerce
//     .string()
//     .transform((value) => {
//       return parseBRLCurrencyToNumber(value);
//     })
//     .optional()
// );

// const dateValidation = z
//   .string()
//   .transform((value) => {
//     if (!value) return undefined;
//     return parse(value, "dd/MM/yyyy", new Date());
//   })
//   .refine((value) => (value ? isValid(value) : true), {
//     message: "Data inválida ",
//   })
//   .optional();

export const createDynamicFormFields = () => {
  return [
    // {
    //   accessorKey: "prestador",
    //   label: "Prestador",
    //   render: SelectPrestadorField,
    //   validation: z.object(
    //     { label: z.string(), value: z.string() },
    //     { message: "Prestador é obrigatório" }
    //   ),
    //   colSpan: 2,
    // },
    // {
    //   accessorKey: "campanha",
    //   label: "Campanha",
    //   render: SelectLista,
    //   cod: "campanha",
    //   validation: z.string().optional(),
    //   colSpan: 2,
    // },
    // {
    //   accessorKey: "competencia",
    //   label: "Competência",
    //   render: CompetenciaField,
    //   validation: z.string().min(7, { message: "Data inválida" }),
    //   colSpan: 1,
    // },
    // {
    //   accessorKey: "tipoDocumentoFiscal",
    //   label: "Documento Fiscal",
    //   cod: "tipo-documento-fiscal",
    //   render: SelectLista,
    //   validation: z.string().optional(),
    //   colSpan: 1,
    // },
    // {
    //   accessorKey: "dataProvisaoContabil",
    //   label: "Data Provisão Contábil",
    //   render: DateField,
    //   validation: dateValidation,
    //   colSpan: 1,
    // },
    // {
    //   accessorKey: "dataRegistro",
    //   label: "Data Registro",
    //   render: DateField,
    //   validation: dateValidation,
    //   colSpan: 1,
    // },
    // {
    //   accessorKey: "valores.grossValue",
    //   label: "Gross Value",
    //   render: CurrencyInput,
    //   validation: currencyValidation,
    //   colSpan: 1,
    // },
    // {
    //   accessorKey: "valores.bonus",
    //   label: "Bonus",
    //   render: CurrencyInput,
    //   validation: currencyValidation,
    //   colSpan: 1,
    // },
    // {
    //   accessorKey: "valores.ajusteComercial",
    //   label: "Ajuste Comercial",
    //   render: CurrencyInput,
    //   validation: currencyValidation,
    //   colSpan: 1,
    // },
    // {
    //   accessorKey: "valores.paidPlacement",
    //   label: "Paid Placement",
    //   render: CurrencyInput,
    //   validation: currencyValidation,
    //   colSpan: 1,
    // },
    // {
    //   accessorKey: "valores.revisionMonthProvision",
    //   label: "Revisão - Mês Provisão",
    //   render: DefaultComponent,
    //   validation: preprocessEmptyToUndefined(
    //     z.coerce
    //       .number({ message: "Digite um número de 1 a 12." })
    //       .min(1, { message: "Digite um número de 1 a 12." })
    //       .max(12, { message: "Digite um número de 1 a 12." })
    //       .optional()
    //   ),
    //   colSpan: 1,
    // },
    // {
    //   accessorKey: "valores.revisionGrossValue",
    //   label: "Revisão - Gross Value",
    //   render: CurrencyInput,
    //   validation: currencyValidation,
    //   colSpan: 1,
    // },
    // {
    //   accessorKey: "valores.revisionProvisionBonus",
    //   label: "Revisão - Bonus",
    //   render: CurrencyInput,
    //   validation: currencyValidation,
    //   colSpan: 1,
    // },
    // {
    //   accessorKey: "valores.revisionComissaoPlataforma",
    //   label: "Revisão - Comissão Plataforma",
    //   render: CurrencyInput,
    //   validation: currencyValidation,
    //   colSpan: 1,
    // },
    // {
    //   accessorKey: "valores.revisionPaidPlacement",
    //   label: "Revisão - Paid Placement",
    //   render: CurrencyInput,
    //   validation: currencyValidation,
    //   colSpan: 1,
    // },
    // {
    //   accessorKey: "valores.totalServico",
    //   label: "Total Serviço",
    //   render: CurrencyInput,
    //   disabled: true,
    // },
    // {
    //   accessorKey: "valores.totalRevisao",
    //   label: "Total Revisão",
    //   render: CurrencyInput,
    //   disabled: true,
    // },
    // {
    //   accessorKey: "valor",
    //   label: "Valor total",
    //   render: CurrencyInput,
    //   disabled: true,
    // },
  ];
};
