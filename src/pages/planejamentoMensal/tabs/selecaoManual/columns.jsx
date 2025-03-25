import { CompetenciaCell } from "../../../../components/dataGrid/cells/competenciaCell";
import { DisabledDefaultCell } from "../../../../components/dataGrid/cells/disabledDefaultCell";
import { DisabledCurrencyCell } from "../../../../components/dataGrid/cells/disabledCurrencyCell";
import { Text, Box, Flex } from "@chakra-ui/react";
import { currency } from "../../../../utils/currency";

export const makeServicoDynamicColumns = () => {
  return [
    {
      accessorKey: "acoes",
      header: "Ações",
      enableSorting: false,
      size: 50,
      cell: (props) => (
        <Flex minH="8">
          <Text alignSelf="center" fontSize="sm" truncate>
            {props.getValue()}
          </Text>
        </Flex>
      ),
      // cell: (props) => (
      //   <TableActionsCell>
      //     <DeleteServicoAction id={props.row.original?._id} />
      //     <ServicosDialog
      //       trigger={
      //         <IconButton variant="surface" colorPalette="gray" size="2xs">
      //           <Pencil />
      //         </IconButton>
      //       }
      //       label="Serviço"
      //       defaultValues={{
      //         ...props.row.original,
      //         prestador: {
      //           label: `${props.row.original?.prestador?.nome}-${props.row.original?.prestador?.sid}-${props.row.original?.prestador?.documento}`,
      //           value: props.row.original?.prestador?._id,
      //         },
      //         dataProvisaoContabil: formatDate(
      //           props.row.original?.dataProvisaoContabil
      //         ),
      //         dataRegistro: formatDate(props.row.original?.dataRegistro),
      //         competencia: `${props.row.original.competencia.mes
      //           .toString()
      //           .padStart(2, "0")}/${props.row.original.competencia.ano}`,
      //         valores: {
      //           ...props.row.original?.valores,
      //           revisionMonthProvision: formatDate(
      //             props.row.original?.valores?.revisionMonthProvision
      //           ),
      //         },
      //       }}
      //     />
      //   </TableActionsCell>
      // ),
    },
    {
      accessorKey: "prestador.sid",
      header: "Sid",
      enableSorting: false,
      cell: (props) => (
        <Flex minH="8">
          <Text alignSelf="center" fontSize="sm" truncate>
            {props.getValue()}
          </Text>
        </Flex>
      ),
      size: 80,
    },
    {
      accessorKey: "prestador.nome",
      header: "Nome",
      enableSorting: false,
      cell: (props) => (
        <Flex minH="8">
          <Text alignSelf="center" fontSize="sm" truncate>
            {props.getValue()}
          </Text>
        </Flex>
      ),
      size: 400,
    },
    {
      accessorKey: "prestador.tipo",
      header: "Tipo",
      enableSorting: false,
      cell: (props) => (
        <Flex minH="8">
          <Text alignSelf="center" fontSize="sm" truncate>
            {props.getValue()?.toUpperCase()}
          </Text>
        </Flex>
      ),
      size: 50,
    },
    {
      accessorKey: "prestador.documento",
      header: "Documento",
      enableSorting: false,
      cell: (props) => (
        <Flex minH="8">
          <Text alignSelf="center" fontSize="sm" truncate>
            {props.getValue()}
          </Text>
        </Flex>
      ),
    },
    {
      accessorKey: "competencia",
      header: "Competência",
      enableSorting: false,
      cell: (props) => (
        <Flex minH="8">
          <Text alignSelf="center" fontSize="sm" truncate>
            {props.getValue()?.mes?.toString()?.padStart(2, "0")}/
            {props.getValue()?.ano}
          </Text>
        </Flex>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: false,
      cell: (props) => (
        <Flex minH="8">
          <Text alignSelf="center" fontSize="sm" truncate>
            {props.getValue()}
          </Text>
        </Flex>
      ),
      enableColumnFilter: true,
      meta: {
        filterKey: "status",
        filterVariant: "select",
        filterOptions: [
          { label: "Em aberto", value: "aberto" },
          { label: "Pendente", value: "pendente" },
          // { label: "Pago", value: "pago" },
          // { label: "Pago externo", value: "pago-externo" },
        ],
      },
    },
    // {
    //   accessorKey: "valores.grossValue",
    //   header: "Gross Value",
    //   enableSorting: false,
    //   cell: CurrencyCell,
    //   enableColumnFilter: true,
    //   meta: { filterKey: "valores.grossValue" },
    // },
    // {
    //   accessorKey: "valores.bonus",
    //   header: "Bonus",
    //   enableSorting: false,
    //   cell: CurrencyCell,
    //   enableColumnFilter: true,
    //   meta: { filterKey: "valores.bonus" },
    // },
    // {
    //   accessorKey: "valores.ajusteComercial",
    //   header: "Ajuste Comercial",
    //   enableSorting: false,
    //   cell: CurrencyCell,
    //   enableColumnFilter: true,
    //   meta: { filterKey: "valores.ajusteComercial" },
    // },
    // {
    //   accessorKey: "valores.paidPlacement",
    //   header: "Paid Placement",
    //   enableSorting: false,
    //   cell: CurrencyCell,
    //   enableColumnFilter: true,
    //   meta: { filterKey: "valores.paidPlacement" },
    // },
    // {
    //   accessorKey: "valores.revisionMonthProvision",
    //   header: "Data de revisão",
    //   enableSorting: false,
    //   cell: DateCell,
    //   enableColumnFilter: true,
    //   meta: { filterKey: "valores.revisionMonthProvision" },
    // },
    // {
    //   accessorKey: "valores.revisionGrossValue",
    //   header: "Revisão - Gross Value",
    //   enableSorting: false,
    //   cell: CurrencyCell,
    //   enableColumnFilter: true,
    //   meta: { filterKey: "valores.revisionGrossValue" },
    // },
    // {
    //   accessorKey: "valores.revisionProvisionBonus",
    //   header: "Revisão - Bonus",
    //   enableSorting: false,
    //   cell: CurrencyCell,
    //   enableColumnFilter: true,
    //   meta: { filterKey: "valores.revisionProvisionBonus" },
    // },
    // {
    //   accessorKey: "valores.revisionComissaoPlataforma",
    //   header: "Revisão - Comissão Plataforma",
    //   enableSorting: false,
    //   cell: CurrencyCell,
    //   enableColumnFilter: true,
    //   meta: { filterKey: "valores.revisionComissaoPlataforma" },
    // },
    // {
    //   accessorKey: "valores.revisionPaidPlacement",
    //   header: "Revisão - Paid Placement",
    //   enableSorting: false,
    //   cell: CurrencyCell,
    //   enableColumnFilter: true,
    //   meta: { filterKey: "valores.revisionPaidPlacement" },
    // },
    // {
    //   accessorKey: "valores.totalServico",
    //   header: "Total Serviço",
    //   enableSorting: false,
    //   cell: DisabledCurrencyCell,
    //   enableColumnFilter: false,
    //   meta: { filterKey: "valores.totalServico" },
    // },
    // {
    //   accessorKey: "valores.totalRevisao",
    //   header: "Total Revisão",
    //   enableSorting: false,
    //   cell: DisabledCurrencyCell,
    //   enableColumnFilter: false,
    //   meta: { filterKey: "valores.totalRevisao" },
    // },
    {
      accessorKey: "valor",
      header: "Valor total",
      enableSorting: false,
      meta: { filterKey: "valor" },
      enableColumnFilter: false,
      cell: (props) => (
        <Flex minH="8">
          <Text alignSelf="center" fontSize="sm" truncate>
            {currency.format(props.getValue())}
          </Text>
        </Flex>
      ),
    },
  ];
};
