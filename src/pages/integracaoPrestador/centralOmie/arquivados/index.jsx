import { Box, Flex, Button, Spinner, Text } from "@chakra-ui/react";
import { useFilters } from "../../../../hooks/useFilters";
import { useColumnVisibility } from "../../../../hooks/useColumnVisibility";
import { useColumnSizing } from "../../../../hooks/useColumnSizing";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { IntegracaoService } from "../../../../service/integracao";
import { sortByToState, stateToSortBy } from "../../../../utils/sorting";
import { useMemo } from "react";
import { makeTicketsArquivadosDynamicColumns } from "./columns";
import { VisibilityControlDialog } from "../../../../components/vibilityControlDialog";
import { DataGrid } from "../../../../components/dataGrid";
import { DebouncedInput } from "../../../../components/DebouncedInput";

export const IntegracaoPrestadorCentralOmieArquivados = () => {
  const { filters, resetFilters, setFilters } = useFilters({
    key: "PRESTADOR-CENTRAL-OMIE-TICKETS-ARQUIVADOS",
  });

  const { columnVisibility, setColumnVisibility } = useColumnVisibility({
    key: "PRESTADOR-CENTRAL-OMIE-TICKETS-ARQUIVADOS",
  });

  const {
    columnSizing,
    columnSizingInfo,
    setColumnSizing,
    setColumnSizingInfo,
  } = useColumnSizing({
    key: "PRESTADOR-CENTRAL-OMIE-TICKETS-ARQUIVADOS",
  });

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["listar-tickets-arquivados", { filters }],
    queryFn: async () =>
      await IntegracaoService.listarIntegracaoPrestadorCentralOmieArquivados({
        filtros: filters,
      }),
    placeholderData: keepPreviousData,
  });

  const paginationState = {
    pageIndex: filters.pageIndex ?? 0,
    pageSize: filters.pageSize ?? 10,
  };

  const sortingState = sortByToState(filters.sortBy);
  const columns = useMemo(() => makeTicketsArquivadosDynamicColumns({}), []);

  return (
    <Flex
      flex="1"
      pt="8"
      px="6"
      pb="2"
      itens="center"
      overflow="auto"
      scrollbarWidth="thin"
      bg="#F8F9FA"
    >
      <Box>
        <Text fontSize="lg" color="gray.700" fontWeight="semibold">
          Integrações prestador central {"->"} omie arquivadas
        </Text>
        <Box mt="4" bg="white" py="6" px="4" rounded="lg" shadow="xs">
          <Flex
            w="full"
            alignItems="center"
            justifyContent="flex-start"
            pb="2"
            gap="4"
          >
            <DebouncedInput
              value={filters.searchTerm}
              debounce={700}
              onChange={(value) => {
                setFilters((prev) => ({
                  ...prev,
                  searchTerm: value,
                  pageIndex: 0,
                }));
              }}
              size="sm"
              iconSize={18}
              startOffset="2px"
              color="gray.700"
            />
            <Button
              size="sm"
              variant="subtle"
              color="brand.500"
              fontWeight="semibold"
              onClick={resetFilters}
              minW="32"
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
            data={data?.integracaoPrestador || []}
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
      </Box>
    </Flex>
  );
};
