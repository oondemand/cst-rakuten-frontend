import { Select } from "chakra-react-select";
import { Box, Text } from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { createChakraStyles } from "./chakraStyles";

export const SelectField = ({ options, ...props }) => {
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
          defaultValue={props.defaultValue}
          render={({ field }) => {
            return (
              <Select
                onKeyDown={handleKeyDown}
                fontSize="sm"
                size="sm"
                disabled={props?.disabled}
                value={
                  options?.find((item) => item?.value == field?.value) ?? ""
                }
                // inputValue={field.value}
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
