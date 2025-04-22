import { DefaultField } from "../../components/buildForm/filds/default";
import { z } from "zod";
import { SelectField } from "../../components/buildForm/filds/selectField";

export const createDynamicFormFields = () => {
  return [
    {
      accessorKey: "nome",
      label: "Nome Completo",
      render: DefaultField,
      validation: z.coerce
        .string()
        .min(3, { message: "Nome precisa ter pelo menos 3 caracteres" }),
      colSpan: 2,
    },
    {
      accessorKey: "tipo",
      label: "Tipo",
      render: SelectField,
      validation: z.string({ message: "Tipo é um campo obrigatório" }),
      colSpan: 1,
      options: [
        { value: "contabilidade", label: "Contabil" },
        { value: "tomador", label: "Tomador" },
        { value: "admin", label: "Administrador" },
      ],
    },
    {
      accessorKey: "email",
      label: "E-mail",
      render: DefaultField,
      validation: z
        .string()
        .email({ message: "Email é um campo obrigatório!" }),
      colSpan: 2,
    },
    {
      accessorKey: "status",
      label: "Status",
      render: SelectField,
      validation: z.string({ message: "Tipo é um campo obrigatório" }),
      colSpan: 1,
      options: [
        { value: "ativo", label: "Ativo" },
        { value: "inativo", label: "Inativo" },
      ],
    },

    {
      accessorKey: "senha",
      label: "Senha",
      render: DefaultField,
      validation: z
        .string()
        .min(6, { message: "A senha precisa ter no mínimo 6 dígitos" }),
      colSpan: 1,
    },
  ];
};
