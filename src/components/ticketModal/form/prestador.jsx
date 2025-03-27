import { Box, Text, Flex, Grid, GridItem } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { BuildForm } from "../../buildForm/index";
import { useVisibleInputForm } from "../../../hooks/useVisibleInputForms";
import { useMemo } from "react";
import { createDynamicFormFields } from "../../../pages/prestadores/formFields";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../config/api";
import { PrestadorService } from "../../../service/prestador";
import { AsyncSelectAutocomplete } from "../../asyncSelectAutoComplete";

import { VisibilityControlDialog } from "../../vibilityControlDialog";
import { formatDate } from "../../../utils/formatting";
import { toaster } from "../../ui/toaster";

export const fetchOptions = async (inputValue) => {
  return await api.get(`/prestadores?searchTerm=${inputValue}`);
};

const obterPrestadores = async (inputValue) => {
  const {
    data: { prestadores },
  } = await fetchOptions(inputValue);

  return prestadores.map((item) => {
    return { ...item, value: item._id, label: item.nome };
  });
};

export const PrestadorForm = ({
  ticket,
  updateTicketMutation,
  onlyReading,
}) => {
  const defaultSelectedPrestador = ticket?.prestador
    ? ticket.prestador.nome
    : "";

  const { inputsVisibility, setInputsVisibility } = useVisibleInputForm({
    key: "PRESTADORES_TICKET_MODAL_FORM",
  });

  const [prestador, setPrestador] = useState(ticket?.prestador);
  const [selectedPrestador, setSelectPrestador] = useState(
    defaultSelectedPrestador
  );

  const { mutateAsync: createPrestadorMutation } = useMutation({
    mutationFn: PrestadorService.criarPrestador,
    onSuccess: (data) => {
      setPrestador((prev) => data.prestador);
    },
  });

  const { mutateAsync: updatePrestadorMutation } = useMutation({
    mutationFn: async ({ id, body }) =>
      await PrestadorService.atualizarPrestador({ id, body }),
    onSuccess: (data) => {
      setPrestador((prev) => data.prestador);
      toaster.create({
        title: "Prestador atualizado com sucesso",
        type: "success",
      });
    },
  });

  const onSubmitPrestador = async (values) => {
    const {
      endereco: { pais, ...rest },
    } = values;

    const body = {
      ...values,
      email: values?.email === "" ? null : values?.email,
      endereco: { ...rest, ...(pais.cod ? { pais } : {}) },
    };

    if (!ticket?.prestador) {
      const { prestador } = await createPrestadorMutation({ body });

      await updateTicketMutation({
        id: ticket._id,
        body: {
          prestador: prestador?._id,
        },
      });
    }

    return await updatePrestadorMutation({ id: ticket?.prestador._id, body });
  };

  const handlePrestadorChange = async (e) => {
    setSelectPrestador(e);
    if (e && e.value !== ticket?.prestador?._id) {
      return await updateTicketMutation({
        id: ticket?._id,
        body: {
          prestador: e.value,
        },
      });
    }
  };

  const fields = useMemo(() => createDynamicFormFields(), []);

  useEffect(() => {
    setPrestador(ticket?.prestador);
  }, [ticket]);

  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)" gap="4">
        <GridItem colSpan={1} mt="6">
          <Box w="100px">
            <Text color="gray.600" fontSize="sm">
              Dados do Prestador
            </Text>
          </Box>
        </GridItem>
        <GridItem colSpan={3} mt="6">
          {!onlyReading && (
            <Box
              mt="4"
              w="full"
              h="1"
              borderBottom="2px solid"
              borderColor="gray.100"
            />
          )}

          {!onlyReading && (
            <Box w="full" mt="6">
              <Text color="gray.600" fontSize="sm">
                Selecionar prestador
              </Text>
              <Flex gap="4">
                <AsyncSelectAutocomplete
                  disabled={!ticket}
                  queryFn={obterPrestadores}
                  value={selectedPrestador}
                  setValue={handlePrestadorChange}
                  placeholder="Digite para buscar..."
                />
              </Flex>
            </Box>
          )}

          {!onlyReading && (
            <Text fontSize="sm" color="gray.500" mt="6">
              {prestador ? "Detalhes do prestador" : "Adicionar novo"}
            </Text>
          )}

          <Flex alignItems="center" gap="4" mb="6">
            <Box
              w="full"
              h="1"
              borderBottom="2px solid"
              borderColor="gray.100"
            />
            <VisibilityControlDialog
              fields={fields}
              setVisibilityState={setInputsVisibility}
              visibilityState={inputsVisibility}
              title="Ocultar inputs"
            />
          </Flex>
          <BuildForm
            disabled={!ticket || onlyReading}
            fields={fields}
            data={{
              ...prestador,
              pessoaFisica: {
                ...prestador?.pessoaFisica,
                dataNascimento: formatDate(
                  prestador?.pessoaFisica?.dataNascimento
                ),
              },
            }}
            shouldUseFormValues={true}
            visibleState={inputsVisibility}
            onSubmit={onSubmitPrestador}
            gridColumns={2}
            gap={4}
          />
        </GridItem>
      </Grid>
    </>
  );
};
