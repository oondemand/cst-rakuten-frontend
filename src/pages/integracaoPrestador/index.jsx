import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "../../styles/swiper.css";

import { Flex, Spinner, Heading, Button } from "@chakra-ui/react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { EtapaService } from "../../service/etapa";
import { Etapa } from "../../components/etapaCard";
import { TicketService } from "../../service/ticket";
import { CloudUpload, Filter } from "lucide-react";
import { DebouncedInput } from "../../components/DebouncedInput";
import { useStateWithStorage } from "../../hooks/useStateStorage";
import { IntegracaoService } from "../../service/integracao";
import { Card } from "./card";
import { Tooltip } from "../../components/ui/tooltip";
import { AsyncButton } from "./asyncButton";

export const IntegracaoPrestador = () => {
  const [searchTerm, setSearchTerm] = useStateWithStorage("searchTerm");

  // const {
  //   data: etapas,
  //   error: etapasError,
  //   isLoading: isEtapasLoading,
  // } = useQuery({
  //   queryKey: ["listar-etapas"],
  //   queryFn: IntegracaoService.integracaoPrestador,
  //   staleTime: 1000 * 60 * 10, // 10 minutos
  // });

  const etapas = [
    { codigo: "requisicao", nome: "Requisição" },
    { codigo: "reprocessar", nome: "Reprocessar" },
    { codigo: "processando", nome: "Processando" },
    { codigo: "falhas", nome: "Falhas" },
    { codigo: "sucesso", nome: "Sucesso" },
  ];

  const {
    data,
    error: ticketsError,
    isLoading: isTicketLoading,
    isFetching: isTicketFetching,
  } = useQuery({
    queryKey: ["listar-tickets-integracao-prestador"],
    queryFn: async () => await IntegracaoService.integracaoPrestador(),
    placeholderData: keepPreviousData,
    onSuccess: (data) => setTickets(data),
    refetchInterval: 1000 * 10, // 10s
  });

  const dataWithTitulo = data?.map((item) => ({
    ...item,
    prestador: {
      ...item?.prestador,
      titulo: `Central -> Omie : ${item?.prestador?.nome}`,
    },
  }));

  const refactoredTickets =
    searchTerm?.toLowerCase()?.trim()?.length > 2
      ? dataWithTitulo?.filter((item) => {
          const term = searchTerm?.toLowerCase()?.trim();
          return (
            item?.prestador?.titulo?.toLowerCase()?.includes(term) ||
            item?.prestador?.documento
              ?.toLowerCase()
              ?.includes(term.replace(/[^a-zA-Z0-9]/g, "")) ||
            item?.prestador?.sid
              ?.toString()
              ?.toLowerCase()
              ?.includes(term.replace(/[^a-zA-Z0-9]/g, ""))
          );
        })
      : dataWithTitulo;

  return (
    <Flex flex="1" flexDir="column" py="8" px="6" bg="#F8F9FA">
      <Flex pb="4" justifyContent="space-between">
        <Flex alignItems="center" gap="4">
          <Heading color="gray.700" fontSize="2xl">
            Integração prestador central {"->"} Omie
          </Heading>
          <Tooltip
            content="Sincronizar com omie"
            positioning={{ placement: "top" }}
            openDelay={500}
            closeDelay={50}
            contentProps={{
              css: {
                "--tooltip-bg": "white",
                color: "gray.600",
              },
            }}
          >
            <AsyncButton
              onClick={async () =>
                await IntegracaoService.processarIntegracaoPrestador()
              }
            />
          </Tooltip>
          {(isTicketLoading || isTicketFetching) && <Spinner size="md" />}
        </Flex>
        <Flex alignItems="center" color="gray.400" gap="3">
          <Filter size={24} />
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
        {!isTicketLoading && refactoredTickets && etapas && (
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
                key={etapa.codigo}
                style={{ minWidth: "250px", maxWidth: "250px" }}
              >
                <Etapa etapa={etapa} tickets={refactoredTickets} card={Card} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Flex>
    </Flex>
  );
};
