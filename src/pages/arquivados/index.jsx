import React, { useMemo } from "react";

import { Flex, Spinner, Box, Button, Text } from "@chakra-ui/react";
import { useQuery, keepPreviousData, useMutation } from "@tanstack/react-query";
import { DebouncedInput } from "../../components/DebouncedInput";
import { DataGrid } from "../../components/dataGrid";
import { useFilters } from "../../hooks/useFilters";
import { sortByToState, stateToSortBy } from "../../utils/sorting";
import { useColumnVisibility } from "../../hooks/useColumnVisibility";
import { useColumnSizing } from "../../hooks/useColumnSizing";

import { makeTicketsArquivadosDynamicColumns } from "./columns";

import { api } from "../../config/api";
import { toaster } from "../../components/ui/toaster";
import { queryClient } from "../../config/react-query";

import { VisibilityControlDialog } from "../../components/vibilityControlDialog";
import { TicketService } from "../../service/ticket";

export const ArquivadosPage = () => {
  const { filters, resetFilters, setFilters } = useFilters({
    key: "TICKETS-ARQUIVADOS",
  });

  const { columnVisibility, setColumnVisibility } = useColumnVisibility({
    key: "TICKETS-ARQUIVADOS",
  });

  const {
    columnSizing,
    columnSizingInfo,
    setColumnSizing,
    setColumnSizingInfo,
  } = useColumnSizing({
    key: "TICKETS-ARQUIVADOS",
  });

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["listar-tickets-arquivados", { filters }],
    queryFn: async () =>
      await TicketService.listarTicketsArquivados({ filters }),
    placeholderData: keepPreviousData,
  });

  const paginationState = {
    pageIndex: filters.pageIndex ?? 0,
    pageSize: filters.pageSize ?? 10,
  };

  const sortingState = sortByToState(filters.sortBy);
  const columns = useMemo(() => makeTicketsArquivadosDynamicColumns({}), []);

  console.log("DATA ->", data);

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
            Tickets arquivados
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
