import { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";
import { withMask } from "use-mask-input";
import { parse } from "date-fns";

export const CompetenciaInputCell = ({
  getValue,
  row,
  column,
  table,
  ...rest
}) => {
  const initialValue = getValue();

  const formatValue =
    initialValue?.mes?.toString().padStart(2, "0") +
    initialValue?.ano?.toString();

  const [value, setValue] = useState("");

  const onBlur = async () => {
    if (value.replace("/", "") !== formatValue) {
      try {
        const competencia = value.split("/");
        await table.options.meta?.updateData({
          prestadorId: row.original._id,
          data: {
            [column.columnDef.accessorKey + ".mes"]: competencia[0],
            [column.columnDef.accessorKey + ".ano"]: competencia[1],
          },
        });
      } catch (error) {
        console.log(error);
        setValue(formatValue);
      }
    }
  };

  useEffect(() => {
    setValue(formatValue ? formatValue : "");
  }, [formatValue]);

  return (
    <Input
      truncate
      variant="subtle"
      display="flex"
      fontSize="md"
      size="2xs"
      bg="transparent"
      focusRingColor="brand.500"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      ref={withMask("99/9999")}
    />
  );
};
