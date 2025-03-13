import { Select } from "chakra-react-select";
import { useQuery } from "@tanstack/react-query";
import { Box, Text } from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { api } from "../../../config/api";
import { createChakraStyles } from "./chakraStyles";

export const SelectEstadoField = ({ cod, ...props }) => {
  const { data } = useQuery({
    queryKey: ["listar-estados"],
    queryFn: async () => await api.get("/estados"),
    staleTime: Infinity,
  });

  const options = data?.data.map((e) => ({ value: e?.sigla, label: e?.nome }));

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
          render={({ field }) => (
            <Select
              value={getValue(field.value)}
              inputValue={getValue(field.value)}
              name={field.name}
              onBlur={field.onBlur}
              onChange={(e) => field.onChange(e?.value)}
              cacheOptions
              isClearable
              options={options}
              chakraStyles={createChakraStyles()}
            />
          )}
        />
      </Box>
      <Text pt="3" fontSize="xs" color="red.400">
        {props.error}
      </Text>
    </Box>
  );
};
