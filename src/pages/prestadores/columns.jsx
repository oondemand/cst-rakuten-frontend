import React from "react";
import { CpfCnpjCell } from "../../components/dataGrid/cells/cpfCnpjCell";
import { SelectAutoCompleteCell } from "../../components/dataGrid/cells/selectAutoComplete";

import { DefaultCell } from "../../components/dataGrid/cells/default";
import { SelectListaCell } from "../../components/dataGrid/cells/selectLista";
import { DateCell } from "../../components/dataGrid/cells/dateCell";
import { PisPasepCell } from "../../components/dataGrid/cells/pisPasepCell";
import { LISTA_PAISES_OMIE } from "../../constants/omie";
import { SelectBancoCell } from "../../components/dataGrid/cells/selectBancoCell";
import { SelectEstadoCell } from "../../components/dataGrid/cells/selectEstadoCell";
import { DeletePrestadorAction } from "../../components/dataGrid/actions/deletePrestadorButton";
import { TableActionsCell } from "../../components/dataGrid/cells/tableActionsCell";
import { PrestadoresDialog } from "./dialog";
import { IconButton } from "@chakra-ui/react";
import { Pencil } from "lucide-react";
import { formatDate } from "../../utils/formatting";

export const makePrestadorDynamicColumns = () => {
  return [
    {
      accessorKey: "acoes",
      header: "Ações",
      enableSorting: false,
      cell: (props) => (
        <TableActionsCell>
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
                dataNascimento: formatDate(
                  props?.row?.original?.pessoaFisica?.dataNascimento
                ),
              },
            }}
          />
        </TableActionsCell>
      ),
    },
    {
      accessorKey: "sciUnico",
      header: "SCI Único",
      cell: DefaultCell,
      enableColumnFilter: true,
      meta: { filterKey: "sciUnico" },
    },
    {
      accessorKey: "manager",
      header: "Manager",
      cell: (props) => <SelectListaCell {...props} cod="manager" />,
      enableColumnFilter: true,
      meta: { filterKey: "manager" },
    },
    {
      accessorKey: "nome",
      header: "Nome Completo",
      cell: DefaultCell,
      enableColumnFilter: true,
      meta: { filterKey: "nome" },
    },
    {
      accessorKey: "sid",
      header: "SID",
      cell: DefaultCell,
      enableColumnFilter: true,
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
      meta: { filterKey: "tipo" },
    },
    {
      accessorKey: "documento",
      header: "Documento",
      cell: (props) => <CpfCnpjCell {...props} />,
      enableColumnFilter: true,
      meta: { filterKey: "documento" },
    },
    {
      accessorKey: "dadosBancarios.banco",
      header: "Banco",
      cell: SelectBancoCell,
      enableColumnFilter: false,
      meta: { filterKey: "dadosBancarios.banco" },
    },
    {
      accessorKey: "dadosBancarios.agencia",
      header: "Agência",
      cell: DefaultCell,
      enableColumnFilter: true,
      meta: { filterKey: "dadosBancarios.agencia" },
    },
    {
      accessorKey: "dadosBancarios.conta",
      header: "Conta Bancária",
      cell: DefaultCell,
      enableColumnFilter: true,
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
      meta: { filterKey: "dadosBancarios.tipoConta" },
    },
    {
      accessorKey: "email",
      header: "E-mail",
      cell: DefaultCell,
      enableColumnFilter: true,
      meta: { filterKey: "email" },
    },
    {
      accessorKey: "endereco.cep",
      header: "CEP",
      cell: DefaultCell,
      enableColumnFilter: true,
      meta: { filterKey: "endereco.cep" },
    },
    {
      accessorKey: "endereco.rua",
      header: "Rua",
      cell: DefaultCell,
      enableColumnFilter: true,
      meta: { filterKey: "endereco.rua" },
    },
    {
      accessorKey: "endereco.numero",
      header: "Número",
      cell: DefaultCell,
      enableColumnFilter: true,
      meta: { filterKey: "endereco.numero" },
    },
    {
      accessorKey: "endereco.complemento",
      header: "Complemento",
      cell: DefaultCell,
      enableColumnFilter: true,
      meta: { filterKey: "endereco.complemento" },
    },
    {
      accessorKey: "endereco.cidade",
      header: "Cidade",
      cell: DefaultCell,
      enableColumnFilter: true,
      meta: { filterKey: "endereco.cidade" },
    },
    {
      accessorKey: "endereco.estado",
      header: "Estado",
      cell: SelectEstadoCell,
      enableColumnFilter: false,
      meta: { filterKey: "endereco.estado" },
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
      enableColumnFilter: false,
      meta: { filterKey: "pessoaFisica.dataNascimento" },
    },
    {
      accessorKey: "pessoaFisica.pis",
      header: "PIS",
      cell: PisPasepCell,
      enableColumnFilter: true,
      meta: { filterKey: "pessoaFisica.pis" },
    },
    {
      accessorKey: "pessoaFisica.nomeMae",
      header: "Nome da Mãe",
      cell: DefaultCell,
      enableColumnFilter: true,
      meta: { filterKey: "pessoaFisica.nomeMae" },
    },
    {
      accessorKey: "pessoaJuridica.nomeFantasia",
      header: "Nome Fantasia",
      cell: DefaultCell,
      enableColumnFilter: true,
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
            { label: "Em-analise", value: "em-analise" },
            { label: "Pendente de revisão", value: "pendente-de-revisao" },
            { label: "Inativo", value: "inativo" },
            { label: "Arquivado", value: "arquivado" },
            { label: "Aguardado codigo sci", value: "aguardando-codigo-sci" },
          ]}
        />
      ),
      enableColumnFilter: true,
      meta: {
        filterKey: "status",
        filterVariant: "select",
        filterOptions: [
          { label: "Ativo", value: "ativo" },
          { label: "Em-analise", value: "em-analise" },
          { label: "Pendente de revisão", value: "pendente-de-revisao" },
          { label: "Inativo", value: "inativo" },
          { label: "Arquivado", value: "arquivado" },
          { label: "Aguardado codigo sci", value: "aguardando-codigo-sci" },
        ],
      },
    },
    {
      accessorKey: "dataExportacao",
      header: "Data de Exportação",
      cell: DateCell,
      enableColumnFilter: false,
      meta: { filterKey: "dataExportacao" },
    },
    {
      accessorKey: "createdAt",
      header: "Criado em",
      cell: DateCell,
      enableColumnFilter: false,
      meta: { filterKey: "createdAt" },
    },
    {
      accessorKey: "updatedAt",
      header: "Atualizado em",
      cell: DateCell,
      enableColumnFilter: false,
      meta: { filterKey: "updatedAt" },
    },
  ];
};
