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

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      event?.preventDefault();
      props?.setValue(props?.accessorKey, props.initialValue);
    }
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
              onKeyDown={handleKeyDown}
              fontSize="sm"
              size="sm"
              disabled={props?.disabled}
              components={{ MenuList }}
              value={options?.find((item) => item?.value == field?.value) ?? ""}
              name={field.name}
              onBlur={field.onBlur}
              onChange={(e) => {
                field.onChange(e?.value ?? "");
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
