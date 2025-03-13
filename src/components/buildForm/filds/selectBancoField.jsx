import { Select } from "chakra-react-select";
import { useQuery } from "@tanstack/react-query";
import { Box, Text } from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { api } from "../../../config/api";
import { useMemo } from "react";
import { MenuList } from "../../menuList";
import { createChakraStyles } from "./chakraStyles";

export const SelectBancoField = ({ cod, ...props }) => {
  const { data } = useQuery({
    queryKey: ["listar-bancos"],
    queryFn: async () => await api.get("/bancos"),
    staleTime: Infinity,
  });

  const options = useMemo(
    () => data?.data?.map((e) => ({ value: e.codigo, label: e.nome })),
    [data?.data]
  );

  const getValue = (value) => options?.find((item) => item.value === value);

  return (
    <Box>
      <Box>
        <Text fontSize="sm">{props.label}</Text>
        <Controller
          name={props.field.name}
          control={props.methods.control}
          render={({ field }) => (
            <Select
              components={{ MenuList }}
              value={getValue(field.value)}
              inputValue={getValue(field.value)}
              name={field.name}
              onBlur={field.onBlur}
              onChange={(e) => {
                field.onChange(e?.value?.value);
              }}
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
