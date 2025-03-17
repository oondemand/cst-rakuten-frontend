import { Box, Text, Grid, GridItem } from "@chakra-ui/react";

import React from "react";

export const ServicoForm = () => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap="4">
      <GridItem colSpan={1} mt="6">
        <Box w="100px">
          <Text color="gray.600" fontSize="sm">
            Serviços
          </Text>
        </Box>
      </GridItem>
      <GridItem colSpan={3} mt="6">
        <Box
          mt="2"
          w="full"
          h="1"
          borderBottom="2px solid"
          borderColor="gray.100"
        />
        {/* {servicos.map((servico) => (
          <Flex key={servico.id} gap="2" mt="8">
            <FloatingLabelInput
              label="Competência"
              fontSize="xs"
              value={servico.competencia}
              onChange={(e) =>
                atualizarServico(servico.id, "competencia", e.target.value)
              }
              onBlur={(e) =>
                handleServicoBlur(servico.id, "competencia", e.target.value)
              }
            />
            <FloatingLabelInput
              label="Descrição"
              fontSize="xs"
              value={servico.descricao}
              onChange={(e) =>
                atualizarServico(servico.id, "descricao", e.target.value)
              }
              onBlur={(e) =>
                handleServicoBlur(servico.id, "descricao", e.target.value)
              }
            />
            <FloatingLabelInput
              label="Valor"
              fontSize="xs"
              value={servico.valor}
              onChange={(e) =>
                atualizarServico(servico.id, "valor", e.target.value)
              }
              onBlur={(e) =>
                handleServicoBlur(servico.id, "valor", e.target.value)
              }
            />
          </Flex>
        ))}
        <Button
          disabled={!ticket}
          mt="4"
          size="xs"
          variant="ghost"
          onClick={adicionarServico}
        >
          <PlusSquare />
          Adicionar serviço
        </Button> */}
      </GridItem>
    </Grid>
  );
};
