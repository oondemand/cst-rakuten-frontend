import { Table, Popover, Portal } from "@chakra-ui/react";
import { memo } from "react";
import { JsonView, allExpanded } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

import { flexRender } from "@tanstack/react-table";

const customTheme = {};

const TableBody = ({ rows, columns, data }) => {
  return (
    <Table.Body>
      {rows.map((row) => (
        <Popover.Root positioning={{ placement: "right-end" }}>
          <Table.Row key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Table.Cell
                px="1"
                fontSize="md"
                w={`calc(var(--col-${cell.column.id}-size) * 1px)`}
                key={cell.id}
              >
                <Popover.Trigger w="full" h="full">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Popover.Trigger>
              </Table.Cell>
            ))}
          </Table.Row>
          <Portal>
            <Popover.Positioner>
              <Popover.Content width="auto">
                <Popover.Arrow />
                <Popover.Body
                  maxW="700px"
                  overflow="auto"
                  className="custom-scrollbar"
                >
                  <JsonView
                    container={{ backgroundColor: "red" }}
                    data={row.original}
                    shouldExpandNode={allExpanded}
                    style={customTheme}
                  />
                </Popover.Body>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
      ))}
    </Table.Body>
  );
};

export const MemoizedTableBody = memo(TableBody, (prev, next) => {
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
