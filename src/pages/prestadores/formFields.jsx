import React from "react";
import { FloatInputField } from "../../components/buildForm/filds/floatingInput";
import { SelectAutoCompleteField } from "../../components/buildForm/filds/selectAutocomplete";

export const createDynamicFormFields = ({
  bancos,
  estados,
  prestadorTipos,
  prestadorTipoConta,
}) => {
  return [
    {
      accessorKey: "nome",
      disabled: false,
      label: "Nome",
      render: FloatInputField,
    },
    {
      accessorKey: "email",
      label: "Email",
      render: FloatInputField,
    },
    {
      accessorKey: "razaoSocial",
      label: "Razão Social",
      render: FloatInputField,
    },
    {
      accessorKey: "tipo",
      label: "Tipo",
      options: prestadorTipos,
      render: SelectAutoCompleteField,
    },
    {
      accessorKey: "dadosBancarios.cpfCnpj",
      label: "CPF/CNPJ",
      render: FloatInputField,
    },
    {
      accessorKey: "endereco.estado",
      label: "Estado",
      options: estados,
      render: SelectAutoCompleteField,
    },
    {
      accessorKey: "endereco.cidade",
      label: "Cidade",
      render: (props) => {
        let options = estados?.reduce((acc, estado) => {
          estado.cidades.forEach((cidade) => {
            acc.push({
              label: cidade.nome,
              value: cidade._id,
            });
          });
          return acc;
        }, []);

        if (props?.data?.["endereco.estado"]) {
          options = estados
            ?.find((e) => {
              return e.value == props?.data?.["endereco.estado"];
            })
            ?.cidades.map((e) => ({
              label: e.nome,
              value: e._id,
            }));
        }

        return <SelectAutoCompleteField {...props} options={options} />;
      },
    },
    {
      accessorKey: "endereco.cep",
      label: "Cep",
      render: FloatInputField,
    },
    {
      accessorKey: "endereco.rua",
      label: "Rua",
      render: FloatInputField,
    },
    {
      accessorKey: "endereco.numero",
      label: "Número",
      render: FloatInputField,
    },
    {
      accessorKey: "endereco.bairro",
      label: "Bairro",
      render: FloatInputField,
    },
    {
      accessorKey: "endereco.complemento",
      label: "Complemento",
      render: FloatInputField,
    },
    {
      accessorKey: "dadosBancarios.banco",
      options: bancos,
      label: "Banco",
      render: SelectAutoCompleteField,
    },
    {
      accessorKey: "dadosBancarios.tipoConta",
      label: "Tipo de conta",
      options: prestadorTipoConta,
      render: SelectAutoCompleteField,
    },
    {
      accessorKey: "dadosBancarios.agencia",
      label: "Agência",
      render: FloatInputField,
    },
    {
      accessorKey: "dadosBancarios.conta",
      label: "Conta",
      render: FloatInputField,
    },
  ];
};
