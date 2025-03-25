import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const DefaultCell = (props) => {
  const initialValue = props.getValue();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Flex minH="8">
      <Text alignSelf="center" fontSize="sm" truncate>
        {value}
      </Text>
    </Flex>
  );
};
