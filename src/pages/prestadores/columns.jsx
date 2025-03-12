import React from "react";
import { CpfCnpjCell } from "../../components/dataGrid/cells/cpfCnpj";
import { SelectAutoCompleteCell } from "../../components/dataGrid/cells/selectAutoComplete";

import { DefaultCell } from "../../components/dataGrid/cells/default";
import { SelectCell } from "../../components/dataGrid/cells/select";
import { TableActions } from "./tableActions";

export const makePrestadorDynamicColumns = ({
  bancos,
  prestadorTipos,
  statusOptions,
  estados,
  prestadorTipoConta,
}) => {
  return [
    {
      accessorKey: "acoes",
      header: "Ações",
      enableSorting: false,
      cell: TableActions,
    },
    {
      accessorKey: "nome",
      header: "Nome",
      enableColumnFilter: true,
      meta: { filterKey: "nome" },
      cell: DefaultCell,
    },
    {
      accessorKey: "razaoSocial",
      header: "Razão Social",
      cell: DefaultCell,
      enableColumnFilter: true,
      meta: { filterKey: "razaoSocial" },
    },
    {
      accessorKey: "tipo",
      header: "Tipo",
      size: 100,
      enableColumnFilter: true,
      cell: SelectCell,
      meta: {
        filterKey: "tipo",
        filterVariant: "select",
        filterOptions: prestadorTipos,
      },
    },
    {
      accessorKey: "dadosBancarios.cpfCnpj",
      header: "CPF/CNPJ",
      enableColumnFilter: true,
      meta: { filterKey: "dadosBancarios.cpfCnpj" },
      cell: CpfCnpjCell,
    },
    {
      accessorKey: "email",
      header: "E-mail",
      enableColumnFilter: true,
      meta: { filterKey: "email" },
      cell: DefaultCell,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: SelectCell,
      meta: {
        filterKey: "status",
        filterVariant: "select",
        filterOptions: statusOptions,
      },
    },
    {
      accessorKey: "endereco.estado",
      header: "UF",
      enableColumnFilter: true,
      meta: { filterKey: "endereco.estado" },
      cell: (props) => <SelectAutoCompleteCell {...props} options={estados} />,
    },
    {
      accessorKey: "endereco.cidade",
      header: "Cidade",
      enableColumnFilter: true,
      meta: { filterKey: "endereco.cidade" },
      cell: (props) => {
        const estado = props.row.original.endereco?.estado;

        const cidadesOptions =
          estados?.find((e) => e.label == estado)?.cidades || [];

        const options = cidadesOptions.map((e) => ({
          label: e.nome,
          value: e._id,
        }));

        return <SelectAutoCompleteCell {...props} options={options} />;
      },
    },
    {
      accessorKey: "endereco.cep",
      header: "Cep",
      enableColumnFilter: true,
      meta: { filterKey: "endereco.cep" },
      cell: DefaultCell,
    },
    {
      accessorKey: "endereco.rua",
      header: "Rua",
      enableColumnFilter: true,
      meta: { filterKey: "endereco.rua" },
      cell: DefaultCell,
    },
    {
      accessorKey: "endereco.numero",
      header: "Número",
      enableColumnFilter: true,
      meta: { filterKey: "endereco.numero" },
      cell: DefaultCell,
    },
    {
      accessorKey: "endereco.bairro",
      header: "Bairro",
      enableColumnFilter: true,
      meta: { filterKey: "endereco.bairro" },
      cell: DefaultCell,
    },
    {
      accessorKey: "endereco.complemento",
      header: "Complemento",
      enableColumnFilter: true,
      meta: { filterKey: "endereco.complemento" },
      cell: DefaultCell,
    },
    {
      accessorKey: "dadosBancarios.banco",
      header: "Banco",
      enableColumnFilter: true,
      meta: { filterKey: "dadosBancarios.banco" },
      cell: (props) => <SelectAutoCompleteCell {...props} options={bancos} />,
    },
    {
      accessorKey: "dadosBancarios.tipoConta",
      header: "Tipo de conta",
      enableColumnFilter: true,
      meta: {
        filterKey: "dadosBancarios.tipoConta",
        filterVariant: "select",
        filterOptions: prestadorTipoConta,
      },
      cell: SelectCell,
    },
    {
      accessorKey: "dadosBancarios.agencia",
      header: "Agência",
      enableColumnFilter: true,
      meta: { filterKey: "dadosBancarios.agencia" },
      cell: DefaultCell,
    },
    {
      accessorKey: "dadosBancarios.conta",
      header: "Conta",
      enableColumnFilter: true,
      meta: { filterKey: "dadosBancarios.conta" },
      cell: DefaultCell,
    },
  ];
};
