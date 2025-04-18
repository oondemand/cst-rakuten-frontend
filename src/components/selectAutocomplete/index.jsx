import React from "react";
import { Select } from "chakra-react-select";

export const SelectAutocomplete = ({
  options,
  value,
  setValue,
  onBlur,
  ...rest
}) => {
  return (
    <Select
      {...rest}
      defaultInputValue={value}
      variant="subtle"
      options={options}
      onBlur={onBlur}
      size="xs"
      fontSize="sm"
      value={value ?? ""}
      onChange={setValue}
      chakraStyles={{
        control: (base) => ({
          ...base,
          backgroundColor: "transparent",
          scrollbarWidth: "thin",
          fontSize: "sm",
          cursor: "pointer",
        }),
        menu: (base) => ({
          ...base,
          scrollbarWidth: "thin",
        }),
        loadingIndicator: (base) => ({
          ...base,
          width: "10px",
          height: "10px",
        }),
        menuList: (base) => ({
          ...base,
          scrollbarWidth: "thin",
        }),
        placeholder: (base) => ({
          ...base,
          color: "gray.900",
          truncate: true,
          display: "none",
        }),
      }}
      focusRingColor="brand.500"
    />
  );
};
