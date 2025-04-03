import { useState } from "react";
import { api } from "../../config/api";
import { AsyncSelectAutocomplete } from "../asyncSelectAutoComplete";

const fetchOptions = async (inputValue) => {
  return await api.get(`/prestadores?searchTerm=${inputValue}`);
};

const obterPrestadores = async (inputValue) => {
  const {
    data: { prestadores },
  } = await fetchOptions(inputValue);

  return prestadores.map((item) => {
    return { ...item, value: item._id, label: item.nome };
  });
};

export const SelectPrestadorFilter = ({ onChange }) => {
  const [selectedPrestador, setSelectPrestador] = useState();

  return (
    <AsyncSelectAutocomplete
      queryFn={obterPrestadores}
      value={selectedPrestador}
      rounded="lg"
      size="xs"
      placeholder="Todos"
      setValue={(e) => {
        setSelectPrestador(e);
        onChange(e);
      }}
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
          maxHeight: "28px",
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
