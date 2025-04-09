import React, { useMemo } from "react";

import { Flex, Spinner, Box, Button } from "@chakra-ui/react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { DebouncedInput } from "../../../../components/DebouncedInput";
import { DataGrid } from "../../../../components/dataGrid";
import { useFilters } from "../../../../hooks/useFilters";
import { sortByToState, stateToSortBy } from "../../../../utils/sorting";
import { useColumnVisibility } from "../../../../hooks/useColumnVisibility";
import { useColumnSizing } from "../../../../hooks/useColumnSizing";

import { makeTicketsArquivadosDynamicColumns } from "./columns";

import { VisibilityControlDialog } from "../../../../components/vibilityControlDialog";
import { RegistroService } from "../../../../service/registros";
import { MemoizedTableBody } from "./tableBody";

export const RastreabilidadeTab = () => {
  const { filters, resetFilters, setFilters } = useFilters({
    key: "REGISTROS-TAB",
  });

  const { columnVisibility, setColumnVisibility } = useColumnVisibility({
    key: "REGISTROS-TAB",
  });

  const {
    columnSizing,
    columnSizingInfo,
    setColumnSizing,
    setColumnSizingInfo,
  } = useColumnSizing({
    key: "REGISTROS-TAB",
  });

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["listar-registros-tab", { filters }],
    queryFn: async () => await RegistroService.obterTodosRegistros({ filters }),
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
      <Box bg="white" py="6" px="4" rounded="lg" shadow="xs">
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
          data={data?.registros || []}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
          columnSizing={columnSizing}
          columnSizingInfo={columnSizingInfo}
          setColumnSizing={setColumnSizing}
          setColumnSizingInfo={setColumnSizingInfo}
          TableBody={MemoizedTableBody}
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
