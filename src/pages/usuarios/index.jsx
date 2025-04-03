import React, { useMemo } from "react";

import { Flex, Spinner, Box, Button, Text } from "@chakra-ui/react";
import { useQuery, keepPreviousData, useMutation } from "@tanstack/react-query";
import { DebouncedInput } from "../../components/DebouncedInput";
import { DataGrid } from "../../components/dataGrid";
import { useFilters } from "../../hooks/useFilters";
import { sortByToState, stateToSortBy } from "../../utils/sorting";
import { useColumnVisibility } from "../../hooks/useColumnVisibility";
import { useColumnSizing } from "../../hooks/useColumnSizing";

import { makeUsuarioDynamicColumns } from "./columns";

import { api } from "../../config/api";
import { toaster } from "../../components/ui/toaster";
import { queryClient } from "../../config/react-query";

import { VisibilityControlDialog } from "../../components/vibilityControlDialog";
import { UsuarioService } from "../../service/usuario";
import { UsuariosDialog } from "./dialog";

export const UsuariosPage = () => {
  const { filters, resetFilters, setFilters } = useFilters({
    key: "USUARIOS",
  });

  const { columnVisibility, setColumnVisibility } = useColumnVisibility({
    key: "USUARIOS",
  });

  const {
    columnSizing,
    columnSizingInfo,
    setColumnSizing,
    setColumnSizingInfo,
  } = useColumnSizing({
    key: "USUARIOS",
  });

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["listar-usuarios", { filters }],
    queryFn: async () => await UsuarioService.listarUsuarios({ filters }),
    placeholderData: keepPreviousData,
  });

  const paginationState = {
    pageIndex: filters.pageIndex ?? 0,
    pageSize: filters.pageSize ?? 10,
  };

  const sortingState = sortByToState(filters.sortBy);
  const columns = useMemo(() => makeUsuarioDynamicColumns({}), []);

  const { mutateAsync: updateUsuariosMutation } = useMutation({
    mutationFn: async ({ id, data }) =>
      await UsuarioService.alterarUsuario({ body: data, id }),
    onSuccess() {
      queryClient.refetchQueries(["listar-usuarios", { filters }]);
      toaster.create({
        title: "Usuario atualizado com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro ao atualizar o usuario",
        type: "error",
      });
    },
  });

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
            Usuarios
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
              <UsuariosDialog />

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
              data={data?.usuarios || []}
              columnVisibility={columnVisibility}
              setColumnVisibility={setColumnVisibility}
              columnSizing={columnSizing}
              columnSizingInfo={columnSizingInfo}
              setColumnSizing={setColumnSizing}
              setColumnSizingInfo={setColumnSizingInfo}
              onUpdateData={async (values) => {
                await updateUsuariosMutation({
                  id: values.prestadorId,
                  data: values.data,
                });
              }}
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
