import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import React from "react";
import { Select } from "chakra-react-select";
import { autoCompleteSelectInputStyles } from "../../../styles/autoCompleteSelectInputStyles";

export const SelectAutoCompleteField = ({
  w,
  containerStyles,
  selectStyles,
  options,
  ...props
}) => {
  const [value, setValue] = useState("");

  const onblur = async () => {
    if (value !== "" && value !== props?.data?.[props.accessorKey]) {
      await props.onBlurFn({ body: { [props.accessorKey]: value.value } });
      props.data && (props.data[props.accessorKey] = value.value);
      return;
    }
  };

  useEffect(() => {
    const value = options?.find((e) => e?.value === props?.initialValue);
    setValue(value);
  }, [props?.initialValue]);

  return (
    <Box w={w}>
      <Select
        defaultInputValue={value}
        variant="subtle"
        placeholder={`Selecione um ${props.label.toLowerCase()}`}
        options={options}
        onBlur={onblur}
        value={value}
        onChange={setValue}
        chakraStyles={autoCompleteSelectInputStyles}
        disabled={props.disabled ?? !props.data}
      />
    </Box>
  );
};
