import React, { useCallback } from "react";
import { AsyncSelect } from "chakra-react-select";
import { useMutation } from "@tanstack/react-query";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

export const AsyncSelectAutocomplete = ({
  options,
  value,
  setValue,
  onBlur,
  queryFn,
  ...rest
}) => {
  const mutation = useMutation({
    mutationFn: queryFn,
  });

  const loadOptions = useCallback(
    debounce((inputValue, callback) => {
      if (!inputValue) {
        callback([]);
        return;
      }

      mutation.mutate(inputValue, {
        onSuccess: (data) => {
          callback(data);
        },
        onError: () => {
          callback([]);
        },
      });
    }, 700),
    [mutation]
  );

  return (
    <AsyncSelect
      {...rest}
      defaultInputValue={value}
      isClearable={true}
      variant="subtle"
      onBlur={onBlur}
      size="sm"
      value={value ?? ""}
      onChange={setValue}
      loadOptions={loadOptions}
      chakraStyles={{
        control: (base) => ({
          ...base,
          backgroundColor: "white",
          scrollbarWidth: "thin",
          fontWeight: "normal",
          borderBottomColor: "gray.200",
          outline: "none",
          focusRingColor: "transparent",
          fontSize: "xs",
          rounded: "none",
        }),
        menu: (base) => ({
          ...base,
          scrollbarWidth: "thin",
          fontWeight: "normal",
          fontSize: "xs",
        }),

        loadingIndicator: (base) => ({
          ...base,
          width: "10px",
          height: "10px",
        }),
        menuList: (base) => ({
          ...base,
          scrollbarWidth: "thin",
          fontWeight: "normal",
          fontSize: "xs",
        }),
      }}
    />
  );
};
