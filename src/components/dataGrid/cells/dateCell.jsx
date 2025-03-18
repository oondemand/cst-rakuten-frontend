import { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";
import { withMask } from "use-mask-input";
import { parse } from "date-fns";

export const DateCell = ({ getValue, row, column, table, ...rest }) => {
  const initialValue = new Date(getValue()).toLocaleDateString();
  const [value, setValue] = useState("");

  const onBlur = async () => {
    if (value !== initialValue) {
      const newDate = parse(value, "dd/MM/yyyy", new Date());

      try {
        await table.options.meta?.updateData({
          prestadorId: row.original._id,
          data: {
            [column.columnDef.accessorKey]: newDate,
          },
        });
      } catch (error) {
        console.log(error);
        setValue(initialValue);
      }
    }
  };

  useEffect(() => {
    setValue(initialValue ? initialValue : "");
  }, [initialValue]);

  return (
    <Input
      truncate
      variant="subtle"
      display="flex"
      fontSize="sm"
      size="xs"
      bg="transparent"
      focusRingColor="brand.500"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      ref={withMask("99/99/9999")}
    />
  );
};
