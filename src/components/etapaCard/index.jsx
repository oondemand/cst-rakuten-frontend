import React, { memo } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";

import { useRef, useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import "./custom-scrollbar.css";

const _Etapa = ({ etapa, tickets, action, card, bg = "#E8ECEF" }) => {
  const etapaTickets = useMemo(
    () => tickets.filter((ticket) => ticket.etapa === etapa.codigo),
    [tickets, etapa.codigo]
  );

  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: etapaTickets.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () =>
      ["integracao-omie", "conta-pagar-central-omie"].includes(etapa.codigo)
        ? 110
        : 85,
    overscan: 1,
  });

  return (
    <Box bg={bg} rounded="lg" boxShadow=" 0px 1px 2px 0px rgba(0, 0, 0, 0.05)">
      <Box borderBottom="1px solid" borderColor="gray.100" py="2" px="3">
        <Flex alignItems="center" justifyContent="space-between">
          <Heading color="gray.700" fontSize="14px">
            {etapa.nome}
          </Heading>
          {action && React.createElement(action, { etapa }, null)}
        </Flex>
      </Box>

      {etapaTickets.length > 0 && (
        <Box
          ref={parentRef}
          className="custom-scrollbar"
          style={{
            overflowY: "auto",
            maxHeight: "600px",
            scrollBehavior: "smooth",
          }}
        >
          <Box
            position="relative"
            width="full"
            height={virtualizer.getTotalSize() + 20}
          >
            {virtualizer.getVirtualItems().map((virtualItem) => {
              return (
                <Box
                  position="absolute"
                  key={virtualItem.key}
                  ref={virtualizer.measureElement}
                  data-index={virtualItem.index}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                    border: "none",
                    textDecoration: "none",
                  }}
                >
                  {card &&
                    React.createElement(
                      card,
                      {
                        index: virtualItem.index,
                        ticket: etapaTickets[virtualItem.index],
                        etapa,
                      },
                      null
                    )}
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export const Etapa = memo(_Etapa);
