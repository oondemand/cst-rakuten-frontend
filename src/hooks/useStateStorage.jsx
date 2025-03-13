import { useCallback, useState } from "react";

export const useStateWithStorage = (STORAGE_KEY) => {
  const defaultValue = localStorage.getItem(STORAGE_KEY);
  const [value, setValue] = useState(JSON.parse(defaultValue ?? ""));

  const updateValue = useCallback(
    (value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      setValue(value);
    },
    [STORAGE_KEY]
  );

  return [value, updateValue];
};
