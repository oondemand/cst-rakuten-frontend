import { DefaultField } from "../../components/buildForm/filds/default";
import { DateField } from "../../components/buildForm/filds/dateField";
import { z } from "zod";
import { SelectCategoriaField } from "../../components/buildForm/filds/selectCategoriaField";
import { SelectContaCorrenteField } from "../../components/buildForm/filds/selectContaCorrenteField";
import { dateValidation } from "../../utils/zodHelpers";

export const FORMS = [
  {
    title: "Sci Unico",
    fields: [
      {
        accessorKey: "sci.codigo_empresa",
        label: "Código empresa",
        render: DefaultField,
        validation: z.string().min(1, "Codigo empresa é um campo obrigatório."),
        colSpan: 1,
      },
      {
        accessorKey: "sci.codigo_centro_custo",
        label: "Código centro custo",
        render: DefaultField,
        validation: z
          .string()
          .min(1, "Código centro custo é um campo obrigatório."),
        colSpan: 1,
      },
      {
        accessorKey: "sci.porcentagem_iss",
        label: "Porcentagem iss",
        render: DefaultField,
        validation: z.coerce
          .number({
            invalid_type_error: "Porcentagem iss tem que ser um número.",
          })
          .optional(),
        colSpan: 1,
      },
      {
        accessorKey: "sci.dias_pagamento",
        label: "Dias de pagamento",
        render: DefaultField,
        validation: z.coerce
          .number()
          .nonnegative()
          .min(1, "Dias de pagamento é um campo obrigatório!"),
        colSpan: 1,
      },
      {
        accessorKey: "sci.cbo",
        label: "CBO",
        render: DefaultField,
        validation: z.string().min(1, "CBO é um campo obrigatório."),
        colSpan: 1,
      },
      {
        accessorKey: "sci.cfip",
        label: "CFIP",
        render: DefaultField,
        validation: z.string().min(1, "CFIP é um campo obrigatório."),
        colSpan: 1,
      },
      {
        accessorKey: "sci.e_social",
        label: "E-SOCIAL",
        render: DefaultField,
        validation: z.string().min(1, "E-SOCIAL é um campo obrigatório."),
        colSpan: 1,
      },
    ],
  },
  {
    title: "Omie",
    fields: [
      {
        accessorKey: "omie.id_conta_corrente",
        label: "Id conta corrente",
        render: SelectContaCorrenteField,
        validation: z.number(),
        colSpan: 1,
      },
      {
        accessorKey: "omie.codigo_categoria",
        label: "Codigo categoria",
        render: SelectCategoriaField,
        validation: z
          .string()
          .nonempty("Código categoria é um campo obrigatório"),
        colSpan: 1,
      },
    ],
  },
  {
    title: "Geral",
    fields: [
      {
        accessorKey: "remetente.nome",
        label: "Nome remetente",
        render: DefaultField,
        validation: z.string().nonempty(),
        colSpan: 1,
      },
      {
        accessorKey: "remetente.email",
        label: "Email remetente",
        render: DefaultField,
        validation: z.string().email("Email inválido!").nonempty(),
        colSpan: 1,
      },
      {
        accessorKey: "data_corte_app_publisher",
        label: "Data de corte app publisher",
        render: DateField,
        validation: dateValidation,
        colSpan: 1,
      },
    ],
  },
];
