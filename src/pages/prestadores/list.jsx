import React, { useMemo } from "react";

import { Flex, Spinner, Box, Button } from "@chakra-ui/react";
import { useQuery, keepPreviousData, useMutation } from "@tanstack/react-query";
import { importarPrestadores, PrestadorService } from "../../service/prestador";
import { DebouncedInput } from "../../components/DebouncedInput";
import { DataGrid } from "../../components/dataGrid";
import { useFilters } from "../../hooks/useFilters";
import { sortByToState, stateToSortBy } from "../../utils/sorting";
import { useColumnVisibility } from "../../hooks/useColumnVisibility";
import { useColumnSizing } from "../../hooks/useColumnSizing";

import { makePrestadorDynamicColumns } from "./columns";

import { api } from "../../config/api";
import { toaster } from "../../components/ui/toaster";
import { queryClient } from "../../config/react-query";

import { VisibilityControlDialog } from "../../components/vibilityControlDialog";
import { PrestadoresDialog } from "./dialog";
import { ExportData } from "../../components/dataGrid/exportData";

import { formatDate } from "../../utils/formatting";
import { ImportDataDialog } from "../../components/dataGrid/importDataDialog";

export const PrestadoresList = () => {
  const { filters, resetFilters, setFilters } = useFilters({
    key: "PRESTADORES",
  });

  const { columnVisibility, setColumnVisibility } = useColumnVisibility({
    key: "PRESTADORES",
  });

  const {
    columnSizing,
    columnSizingInfo,
    setColumnSizing,
    setColumnSizingInfo,
  } = useColumnSizing({
    key: "PRESTADORES",
  });

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["listar-prestadores", { filters }],
    queryFn: async () => await PrestadorService.listarPrestadores({ filters }),
    placeholderData: keepPreviousData,
  });

  const paginationState = {
    pageIndex: filters.pageIndex ?? 0,
    pageSize: filters.pageSize ?? 10,
  };

  const sortingState = sortByToState(filters.sortBy);
  const columns = useMemo(() => makePrestadorDynamicColumns(), []);
  const modeloDeExportacao = columns
    .filter(
      (e) =>
        !["dataExportacao", "createdAt", "updatedAt"].includes(e.accessorKey)
    )
    .map((e) => ({
      accessorKey: e.accessorKey,
      header: e.header,
    }));

  const { mutateAsync: updatePrestadorMutation } = useMutation({
    mutationFn: async ({ id, data }) =>
      await api.patch(`prestadores/${id}`, data),
    onSuccess() {
      queryClient.refetchQueries(["listar-prestadores", { filters }]);
      toaster.create({
        title: "Prestador atualizado com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro ao atualizar o prestador",
        type: "error",
      });
    },
  });

  const { mutateAsync: importPrestadoresMutation } = useMutation({
    mutationFn: async ({ files }) => await importarPrestadores({ files }),
    onSuccess() {
      queryClient.refetchQueries(["listar-prestadores", { filters }]);
      toaster.create({
        title: "Arquivo enviado",
        description: "Aguardando processamento.",
        type: "info",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro ao enviar arquivo!",
        type: "error",
      });
    },
  });

  const getAllPrestadoresWithFilters = async (pageSize) => {
    const { prestadores } = await PrestadorService.listarPrestadores({
      filters: {
        ...filters,
        pageSize: pageSize ? pageSize : data?.pagination?.totalItems,
        pageIndex: 0,
      },
    });

    return prestadores.map((e) => ({
      ...e,
      pessoaFisica: {
        ...e.pessoaFisica,
        dataNascimento: formatDate(e?.pessoaFisica?.dataNascimento),
      },
    }));
  };

  return (
    <>
      <Flex
        flex="1"
        pt="8"
        px="6"
        pb="2"
        itens="center"
        overflow="auto"
        scrollbarWidth="thin"
      >
        <Box>
          <Flex gap="2" alignItems="center">
            <DebouncedInput
              value={filters.searchTerm}
              debounce={700}
              onChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  searchTerm: value,
                  pageIndex: 0,
                }))
              }
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
            >
              Limpar filtros
            </Button>
            {(isLoading || isFetching) && <Spinner size="md" />}
          </Flex>
          <Box mt="4">
            <Flex
              w="full"
              alignItems="center"
              justifyContent="flex-start"
              pb="2"
              gap="4"
            >
              <PrestadoresDialog />
              <ExportData
                columns={modeloDeExportacao}
                dataToExport={getAllPrestadoresWithFilters}
              />
              <ExportData
                label="Exportar modelo"
                columns={modeloDeExportacao}
                dataToExport={() => getAllPrestadoresWithFilters(1)}
              />
              <ImportDataDialog
                handleImport={async ({ files }) => {
                  await importPrestadoresMutation({ files });
                }}
              />
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
              data={data?.prestadores || []}
              columnVisibility={columnVisibility}
              setColumnVisibility={setColumnVisibility}
              columnSizing={columnSizing}
              columnSizingInfo={columnSizingInfo}
              setColumnSizing={setColumnSizing}
              setColumnSizingInfo={setColumnSizingInfo}
              onUpdateData={async (values) => {
                await updatePrestadorMutation({
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
