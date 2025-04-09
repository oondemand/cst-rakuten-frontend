// SelectPrestadorFilter.jsx
import { useRef } from "react";
import { AsyncSelect } from "chakra-react-select";
import { api } from "../../config/api";

const useDebouncedLoadOptions = (delay = 700) => {
  const timeoutRef = useRef(null);
  const abortControllerRef = useRef(null);

  const debounceLoadOptions = (inputValue, callback) => {
    clearTimeout(timeoutRef.current);
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    timeoutRef.current = setTimeout(async () => {
      try {
        const {
          data: { prestadores },
        } = await api.get(`/prestadores?searchTerm=${inputValue}`, {
          signal: abortControllerRef.current.signal,
        });

        const options = prestadores.map((item) => ({
          ...item,
          value: item._id,
          label: `${item.nome} ${item.sid ? `SID. ${item.sid}` : ""} ${`${
            item.documento ? `DOC. ${item.documento}` : ""
          }`}`,
        }));

        callback(options);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Erro na busca de prestadores:", error);
          callback([]);
        }
      }
    }, delay);
  };

  return debounceLoadOptions;
};

export const SelectPrestadorFilter = ({ onChange, value }) => {
  const loadOptions = useDebouncedLoadOptions();

  return (
    <AsyncSelect
      loadOptions={(inputValue, callback) => {
        loadOptions(inputValue, callback);
      }}
      isClearable
      variant="subtle"
      placeholder="Todos"
      value={
        value?.nome && value?._id
          ? { value: value._id, label: value.nome }
          : null
      }
      rounded="lg"
      size="xs"
      onChange={onChange}
      chakraStyles={{
        control: (base) => ({
          ...base,
          backgroundColor: "white",
          scrollbarWidth: "thin",
          fontWeight: "normal",
          border: "none",
          outline: "none",
          focusRingColor: "transparent",
          fontSize: "sm",
          rounded: "sm",
          minHeight: "28px",
          maxHeight: "28px",
        }),
        menu: (base) => ({
          ...base,
          scrollbarWidth: "thin",
          fontWeight: "normal",
          fontSize: "sm",
        }),
        loadingIndicator: (base) => ({
          ...base,
          width: "10px",
          height: "10px",
        }),
        menuList: (base) => ({
          ...base,
          scrollbarWidth: "thin",
          fontWeight: "normal",
          fontSize: "sm",
        }),
        placeholder: (base) => ({
          ...base,
          color: "gray.900",
          fontWeight: "normal",
        }),
      }}
    />
  );
};
