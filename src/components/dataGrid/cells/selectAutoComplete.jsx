import { useEffect, useState } from "react";
import { SelectAutocomplete } from "../../../components/selectAutocomplete";

export const SelectAutoCompleteCell = ({
  getValue,
  row,
  column,
  table,
  options,
  ...rest
}) => {
  const initialValue = getValue();

  const [value, setValue] = useState("");

  const onBlur = async () => {
    if (value && value !== options.find((e) => e?.value === initialValue)) {
      console.log(
        { data: { [column.columnDef.key]: value.value } },
        options,
        initialValue
      );
      try {
        await table.options.meta?.updateData({
          prestadorId: row.original._id,
          data: { [column.columnDef.accessorKey]: value.value },
        });
      } catch (error) {
        console.log(error);
        setValue(initialValue);
      }
    }
  };

  useEffect(() => {
    const value = options.find((e) => e?.value === initialValue);
    setValue(value);
  }, [initialValue]);
  return (
    <SelectAutocomplete
      placeholder={value}
      onBlur={onBlur}
      value={value}
      setValue={setValue}
      options={options}
    />
  );
};
