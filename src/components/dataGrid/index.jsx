import {
  Box,
  Table,
  Button,
  Text,
  Flex,
  createListCollection,
} from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../ui/select";
import { ArrowDown, ArrowUp, Repeat2 } from "lucide-react";
import { Filter } from "../filter";
import { memo, useMemo } from "react";
import { DebouncedInput } from "../DebouncedInput";

const pageSizeOptions = createListCollection({
  items: [
    { label: "05", value: 5 },
    { label: "10", value: 10 },
    { label: "15", value: 15 },
    { label: "20", value: 20 },
    { label: "25", value: 25 },
  ],
});

const sortingIconsMap = {
  asc: <ArrowUp size={14} />,
  desc: <ArrowDown size={14} />,
  false: <Repeat2 size={14} />,
};

export const DataGrid = ({
  data,
  filters,
  columns,
  onFilterChange,
  sorting,
  pagination,
  paginationOptions,
  onSortingChange,
  columnVisibility,
  setColumnVisibility,
  columnSizing,
  columnSizingInfo,
  setColumnSizingInfo,
  setColumnSizing,
  onUpdateData,
  striped = true,
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
      sorting,
      columnVisibility,
      columnSizing,
      columnSizingInfo,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange,
    defaultColumn: {
      minSize: 60,
      maxSize: 800,
    },
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    ...paginationOptions,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    onColumnSizingInfoChange: setColumnSizingInfo,
    onColumnSizingChange: setColumnSizing,
    meta: {
      updateData: async (...props) => await onUpdateData(...props),
    },
  });

  const columnSizeVars = useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes = {};
    for (const header of headers) {
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }
    return colSizes;
  }, [table.getState().columnSizingInfo, table.getState().columnSizing]);

  return (
    <>
      <Box>
        <Table.Root
          size="xs"
          overflowY="scroll"
          colorScheme="gray"
          stickyHeader
          {...columnSizeVars}
          width={`${table.getTotalSize()}px`}
          striped={striped}
        >
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const fieldMeta = header.column.columnDef.meta;

                  return (
                    <Table.ColumnHeader
                      border="1px solid"
                      borderColor="gray.200"
                      p="0.5"
                      key={header.id}
                      w={`calc(var(--header-${header?.id}-size) * 1px)`}
                      colSpan={header.colSpan}
                      position="relative"
                      bg="brand.350"
                    >
                      <Flex flexDir="column" p="0.5" gap="0.5">
                        <Flex onClick={header.column.getToggleSortingHandler()}>
                          <Flex alignItems="center" gap="2" cursor="pointer">
                            <Text
                              fontWeight="semibold"
                              textWrap="nowrap"
                              color="white"
                              fontSize="sm"
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </Text>
                            <Box
                              rounded="full"
                              p="0.5"
                              bg="zinc.400"
                              color="white"
                            >
                              {header.column.getCanSort() &&
                                (sortingIconsMap[header.column.getIsSorted()] ??
                                  null)}
                            </Box>
                          </Flex>
                        </Flex>

                        {header.column.getCanFilter() &&
                          fieldMeta?.filterKey !== undefined && (
                            <Filter
                              bg="white"
                              minW="full"
                              value={filters[fieldMeta?.filterKey] ?? ""}
                              fieldMeta={fieldMeta}
                              onChange={onFilterChange}
                            />
                          )}
                      </Flex>
                      <Box
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        position="absolute"
                        top="0"
                        right="0"
                        w="8px"
                        h="full"
                        bg={
                          header.column.getIsResizing()
                            ? "brand.300"
                            : "brand.200"
                        }
                        cursor="col-resize"
                        userSelect="none"
                        touchAction="none"
                        rounded="xs"
                        _hover={{ opacity: 1 }}
                        opacity={header.column.getIsResizing() ? 1 : 0}
                      />
                    </Table.ColumnHeader>
                  );
                })}
              </Table.Row>
            ))}
          </Table.Header>
          <MemoizedTableBody
            data={table.options.data}
            columns={table.getVisibleLeafColumns()}
            rows={table.getRowModel().rows}
          />
        </Table.Root>

        <Flex mt="4" alignItems="flex-end" gap="6">
          <Flex flexDir="column" gap="2">
            <Flex alignItems="center" gap="1" fontSize="sm">
              <Text>Page</Text>
              <Text fontWeight="semibold">
                {table.getState().pagination.pageIndex + 1} de{" "}
                {table.getPageCount()}
              </Text>
            </Flex>
            <Flex gap="2">
              <Button
                size="xs"
                variant="subtle"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                {"<<"}
              </Button>
              <Button
                size="xs"
                variant="subtle"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {"<"}
              </Button>
              <Button
                size="xs"
                variant="subtle"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                {">"}
              </Button>
              <Button
                size="xs"
                variant="subtle"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                {">>"}
              </Button>
            </Flex>
          </Flex>

          <Flex gap="4" align="flex-end">
            <SelectRoot
              w="100px"
              size="xs"
              value={[table.getState().pagination.pageSize]}
              onValueChange={({ value }) => table.setPageSize(Number(...value))}
              collection={pageSizeOptions}
            >
              <SelectLabel fontSize="sm">Mostrar</SelectLabel>
              <SelectTrigger>
                <SelectValueText />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.items.map((item) => (
                  <SelectItem item={item} key={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>

            <Flex flexDir="column" gap="1">
              <Text fontSize="sm" fontWeight="medium">
                Ir para a página:
              </Text>
              <DebouncedInput
                debounce={1500}
                iconVisible={false}
                size="xs"
                value={
                  (table.getState().pagination.pageIndex + 1).toString() ?? ""
                }
                onChange={(value) => {
                  const page = Number(value) - 1;
                  table.setPageIndex(page);
                }}
              />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

const TableBody = ({ rows, columns, data }) => {
  return (
    <Table.Body>
      {rows.map((row) => (
        <Table.Row key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <Table.Cell
              px="1"
              fontSize="md"
              w={`calc(var(--col-${cell.column.id}-size) * 1px)`}
              key={cell.id}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  );
};

// const MemoizedTableBody = TableBody;

const MemoizedTableBody = memo(TableBody, (prev, next) => {
  if (prev.columns.length !== next.columns.length) {
    return false;
  }

  if (prev.rows.length !== next.rows.length) {
    return false;
  }

  if (prev.data !== next.data) {
    return false;
  }

  return true;
});
