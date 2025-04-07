import { Icon, Input } from "@chakra-ui/react";
import { useState, useEffect, forwardRef } from "react";
import { InputGroup } from "../ui/input-group";
import { Search } from "lucide-react";

export const DebouncedInput = forwardRef(
  (
    {
      value: initialValue,
      onChange,
      debounce = 500,
      size = "md",
      iconSize,
      iconVisible = true,
      startOffset,
      placeIcon = "left",
      iconColor,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        if (value !== initialValue) {
          onChange(value?.trim());
        }
      }, debounce);

      return () => clearTimeout(timeout);
    }, [value]);

    return (
      <InputGroup
        minW={props?.minW}
        startOffset={startOffset}
        startElement={
          iconVisible && placeIcon == "left" ? (
            <Search size={iconSize} color={iconColor} />
          ) : null
        }
        endElement={
          iconVisible && placeIcon == "right" ? (
            <Search size={iconSize} color={iconColor} />
          ) : null
        }
      >
        <Input
          ref={ref}
          focusRingColor="brand.350"
          size={size}
          {...props}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </InputGroup>
    );
  }
);

DebouncedInput.displayName = "DebouncedInput";
