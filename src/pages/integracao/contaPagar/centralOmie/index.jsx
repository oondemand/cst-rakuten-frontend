import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "../../../../styles/swiper.css";

import {
  Flex,
  Spinner,
  Heading,
  createListCollection,
  Button,
  Box,
} from "@chakra-ui/react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Etapa } from "../../../../components/etapaCard";
import { File, FileArchive, Filter, Table } from "lucide-react";
import { DebouncedInput } from "../../../../components/DebouncedInput";
import { useStateWithStorage } from "../../../../hooks/useStateStorage";
import { IntegracaoContaPagarCentralOmieService } from "../../../../service/integracao/contaPagar/central-omie";
import { Card } from "./card";
import { Tooltip } from "../../../../components/ui/tooltip";
import { AsyncButton } from "./asyncButton";
import {
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
} from "../../../../components/ui/select";
import { Link } from "react-router-dom";
import { EtapaActions } from "./etapaAction";

const selectTimeOptions = createListCollection({
  items: [
    { value: 1, label: "1 dia" },
    { value: 5, label: "5 dias" },
    { value: 10, label: "10 dias" },
    { value: 15, label: "15 dias" },
    { value: 30, label: "30 dias" },
  ],
});

export const IntegracaoContaPagarCentralOmieEsteira = () => {
  const [searchTerm, setSearchTerm] = useStateWithStorage(
    "integracao_conta_pagar_central_omie_searchTerm"
  );
  const [time, setTime] = useStateWithStorage(
    "integracao_conta_pagar_central_omie_time",
    1
  );

  const etapas = [
    { codigo: "requisicao", nome: "Requisição" },
    { codigo: "reprocessar", nome: "Reprocessar" },
    { codigo: "processando", nome: "Processando" },
    { codigo: "falhas", nome: "Falhas" },
    { codigo: "upload_arquivos", nome: "Anexos -> Omie" },
    { codigo: "sucesso", nome: "Sucesso" },
  ];

  const {
    data,
    error: ticketsError,
    isLoading: isTicketLoading,
    isFetching: isTicketFetching,
  } = useQuery({
    queryKey: ["listar-tickets-integracao-omie-central-conta-pagar", { time }],
    queryFn: async () =>
      await IntegracaoContaPagarCentralOmieService.listarTodos({ time }),
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
              ?.includes(term.replace(/[^a-zA-Z0-9]/g, "")) ||
            item?._id === term ||
            item?.ticketId === term
          );
        })
      : dataWithTitulo;

  return (
    <Flex flex="1" flexDir="column" py="8" px="6" bg="#F8F9FA">
      <Flex pb="4" justifyContent="space-between">
        <Flex alignItems="flex-end" gap="2">
          <Heading color="gray.700" fontSize="2xl" mr="2">
            Integração conta pagar central {"->"} Omie
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
                await IntegracaoContaPagarCentralOmieService.processar()
              }
            />
          </Tooltip>
          <Tooltip
            content="Visualizar todos em tabela"
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
            <Link to="/integracao/conta-pagar/central-omie/todos">
              <Button
                color="purple.700"
                bg="purple.200"
                p="1.5"
                rounded="2xl"
                cursor="pointer"
                size="sm"
              >
                <Table />
              </Button>
            </Link>
          </Tooltip>
          {(isTicketLoading || isTicketFetching) && <Spinner size="md" />}
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
                <Etapa
                  etapa={etapa}
                  {...(etapa.codigo === "upload_arquivos" && {
                    bg: "#dcdcdcff",
                  })}
                  action={EtapaActions}
                  tickets={refactoredTickets}
                  card={Card}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Flex>
    </Flex>
  );
};
