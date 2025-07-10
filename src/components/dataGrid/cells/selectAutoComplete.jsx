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
  const initialValue = options.find(
    (e) => e?.value?.toString() === getValue()?.toString()
  );

  const [value, setValue] = useState("");

  const onBlur = async () => {
    if (value && value !== initialValue) {
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

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setValue(initialValue);
    }
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  return (
    <SelectAutocomplete
      onKeyDown={handleKeyDown}
      placeholder={value}
      onBlur={onBlur}
      value={value}
      setValue={setValue}
      options={options}
    />
  );
};
