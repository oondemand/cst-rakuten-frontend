import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const DefaultCell = (props) => {
  const initialValue = props.getValue();
  const [value, setValue] = useState(initialValue);

  console.log("REST", initialValue, value);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  <Flex minH="8">
    <Text alignSelf="center" fontSize="sm" truncate>
      {value}
    </Text>
  </Flex>;
};
