import React, { useMemo } from "react";

import { Flex, Spinner, Box, Button, Text } from "@chakra-ui/react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { DebouncedInput } from "../../components/DebouncedInput";
import { DataGrid } from "../../components/dataGrid";
import { useFilters } from "../../hooks/useFilters";
import { sortByToState, stateToSortBy } from "../../utils/sorting";
import { useColumnVisibility } from "../../hooks/useColumnVisibility";
import { useColumnSizing } from "../../hooks/useColumnSizing";

import { makeTicketsArquivadosDynamicColumns } from "./columns";

import { VisibilityControlDialog } from "../../components/vibilityControlDialog";
import { TicketService } from "../../service/ticket";

export const TicketsPagosPage = () => {
  const { filters, resetFilters, setFilters } = useFilters({
    key: "TICKETS-PAGOS",
  });

  const { columnVisibility, setColumnVisibility } = useColumnVisibility({
    key: "TICKETS-PAGOS",
  });

  const {
    columnSizing,
    columnSizingInfo,
    setColumnSizing,
    setColumnSizingInfo,
  } = useColumnSizing({
    key: "TICKETS-PAGOS",
  });

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["listar-tickets-pagos", { filters }],
    queryFn: async () => await TicketService.listarTicketsPagos({ filters }),
    placeholderData: keepPreviousData,
  });

  const paginationState = {
    pageIndex: filters.pageIndex ?? 0,
    pageSize: filters.pageSize ?? 10,
  };

  const sortingState = sortByToState(filters.sortBy);
  const columns = useMemo(() => makeTicketsArquivadosDynamicColumns({}), []);

  return (
    <>
      <Flex
        flex="1"
        py="8"
        px="6"
        pb="2"
        itens="center"
        overflow="auto"
        scrollbarWidth="thin"
        bg="#F8F9FA"
      >
        <Box>
          <Text fontSize="lg" color="gray.700" fontWeight="semibold">
            Tickets pagos
          </Text>
          <Box bg="white" mt="4" py="6" px="4" rounded="lg" shadow="xs">
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
              data={data?.tickets || []}
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
    </>
  );
};
