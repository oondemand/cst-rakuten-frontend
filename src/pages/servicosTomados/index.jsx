import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "../../styles/swiper.css";

import { Flex, Spinner, Heading, createListCollection } from "@chakra-ui/react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { EtapaService } from "../../service/etapa";
import { Etapa } from "../../components/etapaCard";
import { TicketService } from "../../service/ticket";
import { Filter } from "lucide-react";
import { DebouncedInput } from "../../components/DebouncedInput";
import { useStateWithStorage } from "../../hooks/useStateStorage";
import { TicketCard } from "../../components/ticketCard";
import { EtapaActions } from "./etapaActions";

import {
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
} from "../../components/ui/select";

const etapaIntegracaoOmie = {
  nome: "Concluido",
  codigo: "integracao-omie",
};

const selectTimeOptions = createListCollection({
  items: [
    { value: 1, label: "1 dia" },
    { value: 5, label: "5 dias" },
    { value: 10, label: "10 dias" },
    { value: 15, label: "15 dias" },
    { value: 30, label: "30 dias" },
  ],
});

export const ServicosTomados = () => {
  const [searchTerm, setSearchTerm] = useStateWithStorage(
    "esteira_servicos_tomados_search_term"
  );
  const [time, setTime] = useStateWithStorage(
    "esteira_servicos_tomados_time",
    1
  );

  const {
    data: etapas,
    error: etapasError,
    isLoading: isEtapasLoading,
  } = useQuery({
    queryKey: ["listar-etapas"],
    queryFn: EtapaService.listarEtapas,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });

  const {
    data,
    error: ticketsError,
    isLoading: isTicketLoading,
    isFetching: isTicketFetching,
  } = useQuery({
    queryKey: ["listar-tickets", { filters: { time } }],
    queryFn: async () => TicketService.listarTickets({ filters: { time } }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30, // 30 sec
    onSuccess: (data) => setTickets(data),
  });

  const filteredTickets =
    searchTerm?.toLowerCase()?.trim()?.length > 2
      ? data?.filter((ticket) => {
          const term = searchTerm?.toLowerCase()?.trim();

          return (
            ticket?.titulo?.toLowerCase()?.includes(term) ||
            ticket?.prestador?.documento
              ?.toLowerCase()
              ?.includes(term.replace(/[^a-zA-Z0-9]/g, "")) ||
            ticket?.prestador?.sid
              ?.toString()
              ?.toLowerCase()
              ?.includes(term.replace(/[^a-zA-Z0-9]/g, "")) ||
            ticket?._id === term ||
            ticket?.contaPagarOmie?._id === term
          );
        })
      : data;

  return (
    <Flex flex="1" flexDir="column" py="8" px="6" bg="#F8F9FA">
      <Flex pb="4" justifyContent="space-between">
        <Flex alignItems="center" gap="2">
          <Heading color="gray.700" fontSize="2xl">
            Central de Serviços Tomados{" "}
          </Heading>
          {(isEtapasLoading || isTicketLoading || isTicketFetching) && (
            <Spinner size="md" />
          )}
        </Flex>
        <Flex alignItems="center" color="gray.400" gap="3">
          <Filter size={24} />
          <SelectRoot
            w="90px"
            size="xs"
            bg="white"
            defaultValue={[1]}
            collection={selectTimeOptions}
            value={[time]}
            onValueChange={({ value }) => {
              setTime(Number(value[0]));
            }}
          >
            <SelectTrigger>
              <SelectValueText placeholder="Selecione um período..." />
            </SelectTrigger>
            <SelectContent>
              {selectTimeOptions.items.map((item) => (
                <SelectItem item={item} key={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
          <DebouncedInput
            size="xs"
            w="sm"
            bg="white"
            placeholder="Pesquise por nome, cpf, cnpj ou sid..."
            rounded="sm"
            _placeholder={{ color: "gray.400" }}
            placeIcon="right"
            iconSize={16}
            iconColor="purple"
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </Flex>
      </Flex>
      <Flex flex="1" pb="2" itens="center" overflow="hidden">
        {(!isEtapasLoading || !isTicketLoading) &&
          filteredTickets &&
          etapas && (
            <Swiper
              style={{
                height: "100%",
                width: "100%",
              }}
              slidesPerView="auto"
              spaceBetween={16}
              freeMode={true}
              grabCursor={true}
              modules={[FreeMode, Navigation]}
              navigation={true}
            >
              {etapas.map((etapa) => (
                <SwiperSlide
                  key={etapa._id}
                  style={{ minWidth: "250px", maxWidth: "250px" }}
                >
                  <Etapa
                    etapa={etapa}
                    {...([
                      "conta-pagar-central-omie",
                      "conta-pagar-omie-central",
                    ].includes(etapa.codigo) && {
                      bg: "#dcdcdcff",
                    })}
                    tickets={filteredTickets}
                    card={TicketCard}
                    action={EtapaActions}
                  />
                </SwiperSlide>
              ))}
              <SwiperSlide style={{ minWidth: "250px", maxWidth: "250px" }}>
                <Etapa
                  etapa={etapaIntegracaoOmie}
                  tickets={filteredTickets}
                  card={TicketCard}
                  action={EtapaActions}
                />
              </SwiperSlide>
            </Swiper>
          )}
      </Flex>
    </Flex>
  );
};
