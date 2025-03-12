import React from "react";
import { FloatInputField } from "../../components/buildForm/filds/floatingInput";
import { SelectAutoCompleteField } from "../../components/buildForm/filds/selectAutocomplete";
import { TextareaField } from "../../components/buildForm/filds/textarea";

export const createDynamicFormFields = () => {
  return [
    {
      disabled: false,
      accessorKey: "descricao",
      label: "Descrição",
      render: TextareaField,
    },
    {
      accessorKey: "mesCompetencia",
      label: "Mês de competência",
      render: FloatInputField,
    },
    {
      accessorKey: "anoCompetencia",
      label: "Ano de competência",
      render: FloatInputField,
    },
    {
      accessorKey: "valor",
      label: "Valor",
      render: FloatInputField,
    },
  ];
};
