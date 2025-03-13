import { DefaultField } from "../../components/buildForm/filds/default";
import { z } from "zod";
import { preprocessEmptyToUndefined } from "../../utils/zodHelpers";
import { CpfCnpjField } from "../../components/buildForm/filds/cpfCnpjField";
import { DateField } from "../../components/buildForm/filds/dateField";
import { SelectListaField } from "../../components/buildForm/filds/selectListaField";
import { CepField } from "../../components/buildForm/filds/cepField";
import { SelectEstadoField } from "../../components/buildForm/filds/selectEstadoField";
import { SelectBancoField } from "../../components/buildForm/filds/selectBancoField";
import { SelectField } from "../../components/buildForm/filds/selectField";
import { LISTA_PAISES_OMIE } from "../../constants/omie";
import { parse, isValid } from "date-fns";
import { PisPasepField } from "../../components/buildForm/filds/pisField";

const dateValidation = z
  .string()
  .transform((value) => {
    if (!value) return undefined;
    return parse(value, "dd/MM/yyyy", new Date());
  })
  .refine((value) => (value ? isValid(value) : true), {
    message: "Data inválida ",
  })
  .optional();

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
      accessorKey: "sid",
      label: "SID",
      render: DefaultField,
      validation: z.coerce
        .string()
        .regex(/^\d{7}$/, "O SID deve ter exatamente 7 dígitos."),
      colSpan: 1,
    },
    {
      accessorKey: "sciUnico",
      label: "SCI Único",
      render: DefaultField,
      validation: preprocessEmptyToUndefined(
        z.coerce
          .string()
          .regex(/^\d{5,}$/)
          .optional()
      ),
      colSpan: 1,
    },
    {
      accessorKey: "email",
      label: "E-mail",
      render: DefaultField,
      validation: z.string().email().optional().or(z.literal("")).nullable(),
      colSpan: 2,
    },
    {
      accessorKey: "tipo",
      label: "Tipo de Prestador",
      render: SelectField,
      validation: z.string({ message: "Tipo é um campo obrigatório" }),
      colSpan: 1,
      options: [
        { value: "pf", label: "Pessoa física" },
        { value: "pj", label: "Pessoa jurídica" },
        { value: "ext", label: "Exterior" },
      ],
    },
    {
      accessorKey: "documento",
      label: "Documento",
      render: CpfCnpjField,
      validation: z
        .string({ message: "Documento é um campo obrigatório" })
        .nonempty({ message: "Documento é um campo obrigatório" })
        .transform((value) => value.replace(/\D/g, "")),
      colSpan: 1,
    },
    {
      accessorKey: "manager",
      label: "Manager",
      render: SelectListaField,
      cod: "manager",
      validation: z.string().optional(),
      colSpan: 1,
    },
    {
      accessorKey: "pessoaFisica.dataNascimento",
      label: "Data Nascimento",
      render: DateField,
      validation: dateValidation.nullable(),
      colSpan: 1,
    },
    {
      accessorKey: "pessoaFisica.pis",
      label: "PIS",
      render: PisPasepField,
      validation: z
        .string()
        .transform((value) => value.replace(/\D/g, ""))
        .optional(),
      colSpan: 1,
    },
    {
      accessorKey: "pessoaFisica.nomeMae",
      label: "Nome da Mãe",
      render: DefaultField,
      validation: z.string().optional(),
      colSpan: 1,
    },
    {
      accessorKey: "pessoaJuridica.nomeFantasia",
      label: "Nome Fantasia",
      render: DefaultField,
      validation: z.string().optional(),
      colSpan: 2,
    },
    {
      accessorKey: "endereco.rua",
      label: "Logradouro",
      render: DefaultField,
      validation: z.string().optional(),
      colSpan: 2,
    },
    {
      accessorKey: "endereco.numero",
      label: "Número",
      render: DefaultField,
      validation: z.string().optional(),
      colSpan: 1,
    },
    {
      accessorKey: "endereco.complemento",
      label: "Complemento",
      render: DefaultField,
      validation: z.string().optional(),
      colSpan: 1,
    },
    {
      accessorKey: "endereco.cidade",
      label: "Cidade",
      render: DefaultField,
      validation: z.string().optional(),
      colSpan: 1,
    },
    {
      accessorKey: "endereco.cep",
      label: "CEP",
      render: CepField,
      validation: preprocessEmptyToUndefined(
        z
          .string()
          .transform((value) => value.replace(/\D/g, ""))
          .refine((cleanedValue) => cleanedValue.length === 8, {
            message: "CEP deve conter exatamente 8 dígitos.",
          })
          .optional()
      ),
      colSpan: 1,
    },
    {
      accessorKey: "endereco.estado",
      label: "Estado",
      render: SelectEstadoField,
      validation: z.string().optional(),
      colSpan: 1,
    },
    {
      accessorKey: "endereco.pais.cod",
      label: "País",
      render: SelectField,
      validation: z.coerce.string().optional(),
      colSpan: 1,
      options: LISTA_PAISES_OMIE.map((e) => ({
        value: e.cCodigo,
        label: e.cDescricao,
      })),
    },
    {
      accessorKey: "dadosBancarios.banco",
      label: "Banco",
      render: SelectBancoField,
      cod: "bancos",
      validation: z.string().optional(),
      colSpan: 1,
    },
    {
      accessorKey: "dadosBancarios.agencia",
      label: "Agência",
      render: DefaultField,
      validation: z.string().optional(),
      colSpan: 1,
    },
    {
      accessorKey: "dadosBancarios.conta",
      label: "Conta",
      render: DefaultField,
      validation: z.string().optional(),
      colSpan: 1,
    },
    {
      accessorKey: "dadosBancarios.tipoConta",
      label: "Tipo de Conta",
      render: SelectField,
      validation: z.string().optional(),
      colSpan: 1,
      options: [
        { value: "corrente", label: "Conta Corrente" },
        { value: "poupanca", label: "Conta poupança" },
      ],
    },
  ];
};
