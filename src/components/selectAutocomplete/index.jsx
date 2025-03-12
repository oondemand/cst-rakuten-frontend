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
      value={value ?? ""}
      onChange={setValue}
      chakraStyles={{
        control: (base) => ({
          ...base,
          backgroundColor: "white",
          scrollbarWidth: "thin",
          fontSize: "sm",
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
