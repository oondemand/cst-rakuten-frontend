import { useFilters } from "../../../../hooks/useFilters";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { ServicoService } from "../../../../service/servico";
import { sortByToState, stateToSortBy } from "../../../../utils/sorting";
import { useMemo } from "react";
import { makeServicoDynamicColumns } from "./columns";
import { Flex, Box, Text, Button, Spinner } from "@chakra-ui/react";
import { DataGrid } from "../../../../components/dataGrid";
import { useColumnVisibility } from "../../../../hooks/useColumnVisibility";
import { useColumnSizing } from "../../../../hooks/useColumnSizing";
import { VisibilityControlDialog } from "../../../../components/vibilityControlDialog";
import { PlanejamentoService } from "../../../../service/planejamento";

export const SelecaoManualTab = () => {
  const { filters, resetFilters, setFilters } = useFilters({
    key: "PLANEJAMENTO_MENSAL",
  });

  const { columnVisibility, setColumnVisibility } = useColumnVisibility({
    key: "PLANEJAMENTO_MENSAL",
  });

  const {
    columnSizing,
    columnSizingInfo,
    setColumnSizing,
    setColumnSizingInfo,
  } = useColumnSizing({
    key: "PLANEJAMENTO_MENSAL",
  });

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["planejamento-mensal-listar-servicos", { filters }],
    queryFn: async () => await PlanejamentoService.listarServicos({ filters }),
    placeholderData: keepPreviousData,
  });

  const paginationState = {
    pageIndex: filters.pageIndex ?? 0,
    pageSize: filters.pageSize ?? 10,
  };

  const sortingState = sortByToState(filters.sortBy);
  const columns = makeServicoDynamicColumns();

  return (
    <>
      <Box
        bg="white"
        py="4"
        px="2"
        rounded="lg"
        data-state="open"
        shadow="xs"
        _open={{
          animation: "fade-in 300ms ease-out",
        }}
      >
        <Flex
          w="full"
          alignItems="center"
          justifyContent="flex-start"
          pb="2"
          gap="4"
        >
          <Text fontSize="lg" fontWeight="semibold" color="gray.500">
            Serviços
          </Text>
          <Button
            size="sm"
            variant="subtle"
            color="brand.500"
            fontWeight="medium"
            onClick={resetFilters}
            minW="32"
            rounded="md"
          >
            {(isLoading || isFetching) && <Spinner size="md" />}
            {!isLoading && !isFetching && "Limpar filtros"}
          </Button>
          <VisibilityControlDialog
            fields={columns.map((e) => ({
              label: e.header,
              accessorKey: e.accessorKey.replaceAll(".", "_"),
            }))}
            title="Ocultar colunas"
            setVisibilityState={setColumnVisibility}
            visibilityState={columnVisibility}
          />
        </Flex>

        <DataGrid
          filters={filters}
          sorting={sortingState}
          columns={columns}
          pagination={paginationState}
          data={data?.servicos || []}
          striped={false}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
          columnSizing={columnSizing}
          columnSizingInfo={columnSizingInfo}
          setColumnSizing={setColumnSizing}
          setColumnSizingInfo={setColumnSizingInfo}
          onFilterChange={(value) => {
            setFilters((prev) => ({ ...prev, ...value, pageIndex: 0 }));
          }}
          paginationOptions={{
            onPaginationChange: (pagination) => {
              setFilters(pagination);
            },
            rowCount: data?.pagination?.totalItems,
          }}
          onSortingChange={(updaterOrValue) => {
            return setFilters((prev) => ({
              ...prev,
              sortBy: stateToSortBy(updaterOrValue(sortingState)),
            }));
          }}
        />
      </Box>
    </>
  );
};
