import React from "react";
import { CpfCnpjCell } from "../../components/dataGrid/cells/cpfCnpjCell";
import { SelectAutoCompleteCell } from "../../components/dataGrid/cells/selectAutoComplete";

import { DefaultEditableCell } from "../../components/dataGrid/cells/defaultEditable";
import { SelectListaCell } from "../../components/dataGrid/cells/selectLista";
import { DateCell } from "../../components/dataGrid/cells/dateCell";
import { DefaultCell } from "../../components/dataGrid/cells/default";
import { PisPasepCell } from "../../components/dataGrid/cells/pisPasepCell";
import { LISTA_ESTADOS, LISTA_PAISES_OMIE } from "../../constants/omie";
import { SelectBancoCell } from "../../components/dataGrid/cells/selectBancoCell";
import { SelectEstadoCell } from "../../components/dataGrid/cells/selectEstadoCell";
import { DeletePrestadorAction } from "../../components/dataGrid/actions/deletePrestadorButton";
import { TableActionsCell } from "../../components/dataGrid/cells/tableActionsCell";
import { PrestadoresDialog } from "./dialog";
import { IconButton } from "@chakra-ui/react";
import { Pencil } from "lucide-react";
import { formatDateToDDMMYYYY } from "../../utils/formatting";
import { EnviarConvitePrestadorAction } from "../../components/dataGrid/actions/enviarConvite";
import { Tooltip } from "../../components/ui/tooltip";
import { SyncOmieStatusCell } from "./syncOmieStatusCell";

export const makePrestadorDynamicColumns = () => {
  return [
    {
      accessorKey: "acoes",
      header: "Ações",
      enableSorting: false,
      enableColumnFilter: true,
      meta: {
        filterKey: "status_sincronizacao_omie",
        filterVariant: "select",
        filterOptions: [
          { label: "Erro", value: "erro" },
          { label: "Sucesso", value: "sucesso" },
          { label: "Processando", value: "processando" },
        ],
      },
      cell: (props) => (
        <TableActionsCell>
          <SyncOmieStatusCell {...props} />
          <DeletePrestadorAction id={props.row.original?._id} />
          <PrestadoresDialog
            trigger={
              <IconButton variant="surface" colorPalette="gray" size="2xs">
                <Pencil />
              </IconButton>
            }
            label="Prestador"
            defaultValues={{
              ...props.row.original,
              pessoaFisica: {
                ...props.row.original.pessoaFisica,
                dataNascimento: formatDateToDDMMYYYY(
                  props?.row?.original?.pessoaFisica?.dataNascimento
                ),
              },
            }}
          />
          <EnviarConvitePrestadorAction prestador={props.row.original} />
        </TableActionsCell>
      ),
    },
    {
      accessorKey: "_id",
      header: "ID",
      cell: DefaultCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: {
        filterKey: "_id",
      },
    },
    {
      accessorKey: "sciUnico",
      header: "SCI Único",
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "sciUnico" },
    },
    {
      accessorKey: "manager",
      header: "Manager",
      cell: (props) => <SelectListaCell {...props} cod="manager" />,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "manager" },
    },
    {
      accessorKey: "nome",
      header: "Nome Completo",
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "nome" },
    },
    {
      accessorKey: "sid",
      header: "SID",
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "sid" },
    },
    {
      accessorKey: "tipo",
      header: "Tipo",
      cell: (props) => (
        <SelectAutoCompleteCell
          {...props}
          options={[
            { label: "Pessoa física", value: "pf" },
            { label: "Pessoa jurídica", value: "pj" },
            { label: "Exterior", value: "ext" },
          ]}
        />
      ),
      enableColumnFilter: true,
      enableSorting: false,
      meta: {
        filterKey: "tipo",
        filterVariant: "select",
        filterOptions: [
          { label: "Pessoa física", value: "pf" },
          { label: "Pessoa jurídica", value: "pj" },
          { label: "Exterior", value: "ext" },
        ],
      },
    },
    {
      accessorKey: "documento",
      header: "Documento",
      cell: (props) => <CpfCnpjCell {...props} />,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "documento" },
    },
    {
      accessorKey: "dadosBancarios.banco",
      header: "Banco",
      cell: SelectBancoCell,
      enableColumnFilter: false,
      enableSorting: false,
      meta: { filterKey: "dadosBancarios.banco" },
    },
    {
      accessorKey: "dadosBancarios.agencia",
      header: "Agência",
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "dadosBancarios.agencia" },
    },
    {
      accessorKey: "dadosBancarios.conta",
      header: "Conta Bancária",
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "dadosBancarios.conta" },
    },
    {
      accessorKey: "dadosBancarios.tipoConta",
      header: "Tipo de Conta",
      cell: (props) => (
        <SelectAutoCompleteCell
          {...props}
          options={[
            { label: "Poupança", value: "poupanca" },
            { label: "Corrente", value: "corrente" },
          ]}
        />
      ),
      enableColumnFilter: true,
      enableSorting: false,
      meta: {
        filterKey: "dadosBancarios.tipoConta",
        filterVariant: "select",
        filterOptions: [
          { label: "Poupança", value: "poupanca" },
          { label: "Corrente", value: "corrente" },
        ],
      },
    },
    {
      accessorKey: "email",
      header: "E-mail",
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "email" },
    },
    {
      accessorKey: "endereco.cep",
      header: "CEP",
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "endereco.cep" },
    },
    {
      accessorKey: "endereco.rua",
      header: "Rua",
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "endereco.rua" },
    },
    {
      accessorKey: "endereco.numero",
      header: "Número",
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "endereco.numero" },
    },
    {
      accessorKey: "endereco.complemento",
      header: "Complemento",
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "endereco.complemento" },
    },
    {
      accessorKey: "endereco.cidade",
      header: "Cidade",
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "endereco.cidade" },
    },
    {
      accessorKey: "endereco.estado",
      header: "Estado",
      cell: SelectEstadoCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: {
        filterKey: "endereco.estado",
        filterOptions: LISTA_ESTADOS,
        filterVariant: "select",
      },
    },
    {
      accessorKey: "endereco.pais.cod",
      header: "País",
      cell: (props) => (
        <SelectAutoCompleteCell
          {...props}
          options={LISTA_PAISES_OMIE.map((e) => ({
            value: e.cCodigo,
            label: e.cDescricao,
          }))}
        />
      ),
      enableColumnFilter: true,
      enableSorting: false,
      meta: {
        filterKey: "endereco.pais.cod",
        filterVariant: "select",
        filterOptions: LISTA_PAISES_OMIE.map((e) => ({
          value: e.cCodigo,
          label: e.cDescricao,
        })),
      },
    },
    {
      accessorKey: "pessoaFisica.dataNascimento",
      header: "Data de Nascimento",
      cell: DateCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "pessoaFisica.dataNascimento" },
    },
    {
      accessorKey: "pessoaFisica.pis",
      header: "PIS",
      cell: PisPasepCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "pessoaFisica.pis" },
    },
    {
      accessorKey: "pessoaJuridica.nomeFantasia",
      header: "Nome Fantasia",
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "pessoaJuridica.nomeFantasia" },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (props) => (
        <SelectAutoCompleteCell
          {...props}
          options={[
            { label: "Ativo", value: "ativo" },
            { label: "Pendente de revisão", value: "pendente-de-revisao" },
            { label: "Inativo", value: "inativo" },
            { label: "Arquivado", value: "arquivado" },
          ]}
        />
      ),
      enableColumnFilter: true,
      enableSorting: false,
      meta: {
        filterKey: "status",
        filterVariant: "select",
        filterOptions: [
          { label: "Ativo", value: "ativo" },
          { label: "Pendente de revisão", value: "pendente-de-revisao" },
          { label: "Inativo", value: "inativo" },
          { label: "Arquivado", value: "arquivado" },
        ],
      },
    },
    {
      accessorKey: "codigo_cliente_omie",
      header: "Código cliente omie",
      cell: DefaultCell,
      enableSorting: false,
      meta: { filterKey: "codigo_cliente_omie" },
    },
    {
      accessorKey: "createdAt",
      header: "Criado em",
      cell: DateCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "createdAt" },
    },
    {
      accessorKey: "updatedAt",
      header: "Atualizado em",
      cell: DateCell,
      enableColumnFilter: true,
      enableSorting: false,
      meta: { filterKey: "updatedAt" },
    },
  ];
};
