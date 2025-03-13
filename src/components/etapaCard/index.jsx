import React, { memo, useState } from "react";
import { Box, Flex, Heading, Separator, Text } from "@chakra-ui/react";
import { TicketCard } from "../ticketCard";

import { useRef, useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import "./custom-scrollbar.css";

import { SquarePlus } from "lucide-react";
import { CreateTicketModal } from "../ticketModal/modalCreate";

const _Etapa = ({ etapa, tickets }) => {
  const [open, setOpen] = useState(false);

  const etapaTickets = useMemo(
    () => tickets.filter((ticket) => ticket.etapa === etapa.codigo),
    [tickets, etapa.codigo]
  );

  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: etapaTickets.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 90,
    overscan: 1,
  });

  return (
    <Box
      bg="#E8ECEF"
      rounded="lg"
      boxShadow=" 0px 1px 2px 0px rgba(0, 0, 0, 0.05)"
    >
      <Flex
        borderBottom="1px solid"
        borderColor="gray.100"
        py="2"
        px="3"
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading color="gray.700" fontSize="14px">
          {etapa.nome}
        </Heading>
        {etapa.codigo === "requisicao" && (
          <Text
            p="1"
            rounded="full"
            _hover={{ bg: "gray.200" }}
            onClick={() => setOpen(true)}
            color="brand.500"
          >
            <SquarePlus size={20} />
          </Text>
        )}
      </Flex>

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
                  <TicketCard
                    index={virtualItem.index}
                    ticket={etapaTickets[virtualItem.index]}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
      {open && <CreateTicketModal open={open} setOpen={setOpen} />}
    </Box>
  );
};

export const Etapa = memo(_Etapa);
