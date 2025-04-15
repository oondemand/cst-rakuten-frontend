import { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";
import { withMask } from "use-mask-input";
import { parse, format } from "date-fns";
import { formatDateToDDMMYYYY } from "../../../utils/formatting";

export const DateCell = ({ getValue, row, column, table, ...rest }) => {
  const initialValue = formatDateToDDMMYYYY(getValue());
  const [value, setValue] = useState("");

  const onBlur = async () => {
    if (value !== initialValue) {
      const newDate =
        value === ""
          ? null
          : format(parse(value, "dd/MM/yyyy", new Date()), "yyyy/MM/dd");

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
