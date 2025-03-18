import { useEffect, useState } from "react";
import { DebouncedInput } from "../DebouncedInput";
import { NativeSelectField, NativeSelectRoot } from "../ui/native-select";

export function Filter({ fieldMeta, onChange, value, ...props }) {
  if (fieldMeta.filterVariant && fieldMeta.filterVariant) {
    return (
      <NativeSelectRoot>
        <NativeSelectField
          {...props}
          size="xs"
          h="28px"
          rounded="sm"
          color="gray.700"
          value={value}
          onChange={(e) => {
            onChange({ [fieldMeta.filterKey]: e.target.value });
          }}
        >
          {fieldMeta.filterOptions?.map((item, i) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
          <option value="">Todos</option>
        </NativeSelectField>
      </NativeSelectRoot>
    );
  }

  return (
    <DebouncedInput
      {...props}
      debounce={700}
      size="2xs"
      iconSize={14}
      startOffset="0px"
      color="gray.700"
      value={value}
      onChange={(value) => onChange({ [fieldMeta.filterKey]: value })}
    />
  );
}
