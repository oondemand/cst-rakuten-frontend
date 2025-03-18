import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { parseBRLCurrencyToNumber } from "../../../utils/currency";
import { Input } from "@chakra-ui/react";

export const CurrencyCell = ({ getValue, row, column, table, ...props }) => {
  const initialValue = getValue();
  const [value, setValue] = useState("");

  const onBlur = async () => {
    if (parseBRLCurrencyToNumber(value) !== initialValue) {
      try {
        await table.options.meta?.updateData({
          prestadorId: row.original._id,
          data: {
            [column.columnDef.accessorKey]: parseBRLCurrencyToNumber(value),
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
    <NumericFormat
      width="100%"
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale
      allowNegative
      prefix="R$ "
      placeholder="R$ 0,00"
      // customInput={(props) => (
      //   <Input
      //     {...props}
      //     variant="subtle"
      //     display="flex"
      //     fontSize="md"
      //     size="xs"
      //     bg="transparent"
      //     focusRingColor="brand.500"
      //   />
      // )}
      style={{
        backgroundColor: "transparent",
        height: "32px",
        paddingInline: "8px",
        outlineColor: "#8528CE",
        fontSize: "14px",
        width: "100%",
      }}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
};
