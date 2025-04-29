import React, { useMemo } from "react";

import { Flex, Spinner, Box, Button, Text } from "@chakra-ui/react";
import { useQuery, keepPreviousData, useMutation } from "@tanstack/react-query";
import { DocumentosFiscaisService } from "../../service/documentos-fiscais";
import { DebouncedInput } from "../../components/DebouncedInput";
import { DataGrid } from "../../components/dataGrid";
import { useFilters } from "../../hooks/useFilters";
import { sortByToState, stateToSortBy } from "../../utils/sorting";
import { useColumnVisibility } from "../../hooks/useColumnVisibility";
import { useColumnSizing } from "../../hooks/useColumnSizing";

import { makeDocumentoFiscalDynamicColumns } from "./columns";

import { api } from "../../config/api";
import { toaster } from "../../components/ui/toaster";
import { queryClient } from "../../config/react-query";
import { useListas } from "../../hooks/useListas";

import { VisibilityControlDialog } from "../../components/vibilityControlDialog";
import { DocumentosFiscaisDialog } from "./dialog";
import { ExportData } from "../../components/dataGrid/exportData";

import { formatDateToDDMMYYYY } from "../../utils/formatting";
// import { ImportDataDialog } from "../../components/dataGrid/importDataDialog";
import { useNavigate } from "react-router-dom";
import { Container } from "../../components/container";

export const DocumentosFiscaisList = () => {
  const navigate = useNavigate();

  const { filters, resetFilters, setFilters } = useFilters({
    key: "DOCUMENTOS_FISCAIS",
  });

  const { columnVisibility, setColumnVisibility } = useColumnVisibility({
    key: "DOCUMENTOS_FISCAIS",
  });

  const {
    columnSizing,
    columnSizingInfo,
    setColumnSizing,
    setColumnSizingInfo,
  } = useColumnSizing({
    key: "DOCUMENTOS_FISCAIS",
  });

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["listar-documentos-fiscais", { filters }],
    queryFn: async () =>
      await DocumentosFiscaisService.listarDocumentosFiscais({ filters }),
    placeholderData: keepPreviousData,
  });

  const paginationState = {
    pageIndex: filters.pageIndex ?? 0,
    pageSize: filters.pageSize ?? 10,
  };

  const sortingState = sortByToState(filters.sortBy);
  const columns = useMemo(() => makeDocumentoFiscalDynamicColumns({}), []);
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

  const { mutateAsync: updateDocumentoFiscalMutation } = useMutation({
    mutationFn: async ({ id, data }) =>
      await api.patch(`documentos-fiscais/${id}`, data),
    onSuccess() {
      queryClient.invalidateQueries(["listar-documentos-fiscais", { filters }]);
      toaster.create({
        title: "Documento fiscal atualizado com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro ao atualizar o documento fiscal",
        description: error?.response?.data?.message ?? "",
        type: "error",
      });
    },
  });

  const getAllDocumentosFiscaisWithFilters = async (pageSize) => {
    const { documentosFiscais } =
      await DocumentosFiscaisService.listarDocumentosFiscais({
        filters: {
          ...filters,
          pageSize: pageSize ? pageSize : data?.pagination?.totalItems,
          pageIndex: 0,
        },
      });

    return documentosFiscais.map((e) => ({
      ...e,
      dataProvisaoContabil: formatDateToDDMMYYYY(e?.dataProvisaoContabil),
      dataRegistro: formatDateToDDMMYYYY(e?.dataRegistro),
      revisionMonthProvision: formatDateToDDMMYYYY(e?.revisionMonthProvision),
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
        bg="#F8F9FA"
      >
        <Box>
          <Text fontSize="lg" color="gray.700" fontWeight="semibold">
            Documentos fiscais
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
              <DocumentosFiscaisDialog />
              <Button
                size="sm"
                variant="subtle"
                fontWeight="semibold"
                color="brand.500"
                onClick={() => navigate("/documentos-fiscais/importacao")}
                _hover={{ backgroundColor: "gray.50" }}
              >
                Importar Documentos fiscais
              </Button>
              <ExportData
                label="Exportar modelo"
                columns={modeloDeExportacao}
                dataToExport={() => getAllDocumentosFiscaisWithFilters(1)}
              />
              <ExportData
                columns={modeloDeExportacao}
                dataToExport={getAllDocumentosFiscaisWithFilters}
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
              data={data?.documentosFiscais || []}
              columnVisibility={columnVisibility}
              setColumnVisibility={setColumnVisibility}
              columnSizing={columnSizing}
              columnSizingInfo={columnSizingInfo}
              setColumnSizing={setColumnSizing}
              setColumnSizingInfo={setColumnSizingInfo}
              onUpdateData={async (values) => {
                await updateDocumentoFiscalMutation({
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
