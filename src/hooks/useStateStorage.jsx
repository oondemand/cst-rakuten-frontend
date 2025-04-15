import { useCallback, useState } from "react";

export const useStateWithStorage = (key, initialValue) => {
  const user = JSON.parse(localStorage.getItem("usuario"))?._id || "default";
  const STORAGE_KEY = `${user}@${key}`;

  const defaultValue = localStorage.getItem(STORAGE_KEY);
  const [value, setValue] = useState(
    JSON.parse(defaultValue) ?? (initialValue ? initialValue : "")
  );

  const updateValue = useCallback(
    (value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      setValue(value);
    },
    [key]
  );

  return [value, updateValue];
};
