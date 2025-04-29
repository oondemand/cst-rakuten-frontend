import { preprocessEmptyToUndefined } from "../../utils/zodHelpers";
import { SelectPrestadorField } from "../../components/buildForm/filds/selectPrestadorField";
import { z } from "zod";
import { CompetenciaField } from "../../components/buildForm/filds/competenciaField";
import { SelectListaField } from "../../components/buildForm/filds/selectListaField";
import { DateField } from "../../components/buildForm/filds/dateField";
import { CurrencyField } from "../../components/buildForm/filds/currencyField";
import { DefaultField } from "../../components/buildForm/filds/default";
import {
  dateValidation,
  currencyValidation,
  requiredCurrencyValidation,
} from "../../utils/zodHelpers";

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
      accessorKey: "competencia",
      label: "Competência",
      render: CompetenciaField,
      validation: z.string().optional(),
      colSpan: 1,
    },
    {
      accessorKey: "tipoDocumentoFiscal",
      label: "Documento Fiscal",
      cod: "tipo-documento-fiscal",
      render: SelectListaField,
      validation: z.string({
        message: "Campo obrigatório",
      }),
      colSpan: 1,
    },
    {
      accessorKey: "numero",
      label: "Numero",
      render: DefaultField,
      validation: z.string().nonempty("Número é obrigatório"),
      colSpan: 1,
    },
    {
      accessorKey: "valor",
      label: "Valor",
      render: CurrencyField,
      validation: requiredCurrencyValidation,
      colSpan: 1,
    },
    {
      accessorKey: "imposto",
      label: "Imposto",
      render: CurrencyField,
      validation: currencyValidation,
      colSpan: 1,
    },
    {
      accessorKey: "classificacaoFiscal",
      label: "Classificação Fiscal",
      render: DefaultField,
      validation: z.string().optional(),
      colSpan: 1,
    },
    {
      accessorKey: "descricao",
      label: "Descrição",
      render: DefaultField,
      validation: z.string().optional(),
      colSpan: 3,
    },
    {
      accessorKey: "motivoRecusa",
      label: "Motivo Recusa",
      cod: "motivo-recusa",
      render: SelectListaField,
      validation: z.string().optional(),
      colSpan: 1,
    },
    {
      accessorKey: "observacaoPrestador",
      label: "Observação Prestador",
      render: DefaultField,
      validation: z.string().optional(),
      colSpan: 4,
    },
    {
      accessorKey: "observacaoInterna",
      label: "Observação",
      render: DefaultField,
      validation: z.string().optional(),
      colSpan: 4,
    },
  ];
};
