import { DebouncedInput } from "../DebouncedInput";
import { NativeSelectField, NativeSelectRoot } from "../ui/native-select";
import { SelectListaFilter } from "./selectLista";
import { SelectPrestadorFilter } from "./selectPrestador";

export function Filter({ fieldMeta, onChange, value, ...props }) {
  if (fieldMeta.filterVariant && fieldMeta.filterVariant === "select") {
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

  if (
    fieldMeta.filterVariant &&
    fieldMeta.filterVariant === "selectPrestador"
  ) {
    return (
      <SelectPrestadorFilter
        onChange={(e) => {
          onChange({ [fieldMeta.filterKey]: { _id: e?._id, nome: e?.nome } });
        }}
        value={value}
      />
    );
  }

  if (
    fieldMeta.filterVariant &&
    fieldMeta.cod &&
    fieldMeta.filterVariant === "selectLista"
  ) {
    return (
      <SelectListaFilter
        {...props}
        value={value}
        cod={fieldMeta.cod}
        onChange={(e) => {
          onChange({ [fieldMeta.filterKey]: e.target.value });
        }}
      />
    );
  }

  return (
    <DebouncedInput
      {...props}
      debounce={1000}
      size="2xs"
      iconSize={14}
      startOffset="0px"
      color="gray.700"
      value={value}
      onChange={(value) => onChange({ [fieldMeta.filterKey]: value })}
    />
  );
}
