import { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";

export const DisabledDefaultCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue || "");

  useEffect(() => {
    setValue(initialValue ? initialValue : "");
  }, [initialValue]);

  return (
    <Input
      truncate
      variant="subtle"
      display="flex"
      fontSize="sm"
      size="2xs"
      focusRingColor="brand.500"
      bg="transparent"
      value={value}
      disabled={true}
    />
  );
};
