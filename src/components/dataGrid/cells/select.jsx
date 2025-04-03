import { useEffect, useState } from "react";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "../../ui/native-select";

export const SelectCell = ({ getValue, row, column, table, ...rest }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const onBlur = async () => {
    if (value !== initialValue) {
      try {
        await table.options.meta?.updateData({
          prestadorId: row.original._id,
          data: { [column.columnDef.accessorKey]: value },
        });
      } catch (error) {
        console.log(error);
        setValue(initialValue);
      }
    }
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  return (
    <NativeSelectRoot
      onBlur={onBlur}
      size="sm"
      border="none"
      focusRingColor="brand.500"
    >
      <NativeSelectField
        focusRingColor="brand.500"
        border="none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {column.columnDef.meta.filterOptions?.map((item, i) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </NativeSelectField>
    </NativeSelectRoot>
  );
};
