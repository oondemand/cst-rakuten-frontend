import React, { useMemo } from "react";

import { Flex, Spinner, Box, Button } from "@chakra-ui/react";
import { useQuery, keepPreviousData, useMutation } from "@tanstack/react-query";
import { ServicoService } from "../../service/servico";
import { DebouncedInput } from "../../components/DebouncedInput";
import { DataGrid } from "../../components/dataGrid";
import { useFilters } from "../../hooks/useFilters";
import { sortByToState, stateToSortBy } from "../../utils/sorting";
import { useColumnVisibility } from "../../hooks/useColumnVisibility";
import { useColumnSizing } from "../../hooks/useColumnSizing";

import { makeServicoDynamicColumns } from "./columns";

import { api } from "../../config/api";
import { toaster } from "../../components/ui/toaster";
import { queryClient } from "../../config/react-query";
import { useListas } from "../../hooks/useListas";

import { VisibilityControlDialog } from "../../components/vibilityControlDialog";
import { ServicosDialog } from "./dialog";
import { ExportData } from "../../components/dataGrid/exportData";

import { formatDate } from "../../utils/formatting";
import { ImportDataDialog } from "../../components/dataGrid/importDataDialog";
import { useNavigate } from "react-router-dom";

export const ServicosList = () => {
  const navigate = useNavigate();

  const { filters, resetFilters, setFilters } = useFilters({
    key: "SERVICOS",
  });

  const { columnVisibility, setColumnVisibility } = useColumnVisibility({
    key: "SERVICOS",
  });

  const {
    columnSizing,
    columnSizingInfo,
    setColumnSizing,
    setColumnSizingInfo,
  } = useColumnSizing({
    key: "SERVICOS",
  });

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["listar-servicos", { filters }],
    queryFn: async () => await ServicoService.listarServicos({ filters }),
    placeholderData: keepPreviousData,
  });

  const paginationState = {
    pageIndex: filters.pageIndex ?? 0,
    pageSize: filters.pageSize ?? 10,
  };

  const sortingState = sortByToState(filters.sortBy);
  const columns = useMemo(() => makeServicoDynamicColumns({}), []);
  const modeloDeExportacao = [
    {
      accessorKey: "prestador.nome",
      header: "Nome Prestador",
    },
    {
      accessorKey: "prestador.sid",
      header: "SID Prestador",
    },
    {
      accessorKey: "prestador.documento",
      header: "Documento Prestador",
    },
    ...columns
      .filter((e) => e.accessorKey !== "prestador")
      .map((e) => ({ accessorKey: e.accessorKey, header: e.header })),
  ];

  const { mutateAsync: updateServicoMutation } = useMutation({
    mutationFn: async ({ id, data }) => await api.patch(`servicos/${id}`, data),
    onSuccess() {
      queryClient.refetchQueries(["listar-servicos", { filters }]);
      toaster.create({
        title: "Serviço atualizado com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro ao atualizar o serviço",
        type: "error",
      });
    },
  });

  const { mutateAsync: importServicosMutation } = useMutation({
    mutationFn: async ({ files }) =>
      await ServicoService.importarServicos({ files }),
    onSuccess() {
      queryClient.refetchQueries(["listar-servicos", { filters }]);
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

  const getAllServicosWithFilters = async (pageSize) => {
    const { servicos } = await ServicoService.listarServicos({
      filters: {
        ...filters,
        pageSize: pageSize ? pageSize : data?.pagination?.totalItems,
        pageIndex: 0,
      },
    });

    return servicos.map((e) => ({
      ...e,
      dataProvisaoContabil: formatDate(e?.dataProvisaoContabil),
      dataRegistro: formatDate(e?.dataRegistro),
      competencia: `${e?.competencia?.mes.toString().padStart(2, 0)}/${
        e?.competencia?.ano
      }`,
    }));
  };

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
      >
        <Box>
          <Flex gap="2" alignItems="center">
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
              <ServicosDialog />
              {/* <ImportDataDialog
                accept=".xlsx, .xls, .xlsm, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                handleImport={async ({ files }) => {
                  await importServicosMutation({ files });
                }}
              /> */}
              <Button
                size="sm"
                variant="subtle"
                fontWeight="semibold"
                color="brand.500"
                onClick={() => navigate("/servicos/importacao")}
                _hover={{ backgroundColor: "gray.50" }}
              >
                Importar Serviços
              </Button>
              <ExportData
                label="Exportar modelo"
                columns={modeloDeExportacao}
                dataToExport={() => getAllServicosWithFilters(1)}
              />
              <ExportData
                columns={modeloDeExportacao}
                dataToExport={getAllServicosWithFilters}
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
              data={data?.servicos || []}
              columnVisibility={columnVisibility}
              setColumnVisibility={setColumnVisibility}
              columnSizing={columnSizing}
              columnSizingInfo={columnSizingInfo}
              setColumnSizing={setColumnSizing}
              setColumnSizingInfo={setColumnSizingInfo}
              onUpdateData={async (values) => {
                await updateServicoMutation({
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
