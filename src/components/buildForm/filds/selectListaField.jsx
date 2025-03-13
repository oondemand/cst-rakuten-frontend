import { Select } from "chakra-react-select";
import { useQuery } from "@tanstack/react-query";
import { ListaService } from "../../../service/listas";
import { Box, Text } from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { createChakraStyles } from "./chakraStyles";

export const SelectListaField = ({ cod, ...props }) => {
  const { data: lista } = useQuery({
    queryFn: async () => ListaService.getListByCode({ cod }),
    queryKey: [`list-${cod}`],
    staleTime: 1000 * 60 * 10, //10 minutos
  });

  const options = lista?.valores?.map((e) => ({
    label: e?.chave ? e.chave : e?.valor,
    value: e?.valor ? e.valor : e?.chave,
  }));

  const getValue = (value) => {
    options?.find((item) => {
      return item?.value === value;
    }) ?? "";
  };

  return (
    <Box>
      <Box>
        <Text fontSize="sm">{props.label}</Text>
        <Controller
          name={props.field.name}
          control={props.methods.control}
          render={({ field }) => {
            return (
              <Select
                value={getValue(field.value)}
                inputValue={getValue(field.value)}
                name={field.name}
                onBlur={field.onBlur}
                onChange={(e) => {
                  field.onChange(e.value);
                }}
                cacheOptions
                isClearable
                options={options}
                chakraStyles={createChakraStyles()}
              />
            );
          }}
        />
      </Box>
      <Text pt="3" fontSize="xs" color="red.400">
        {props.error}
      </Text>
    </Box>
  );
};
