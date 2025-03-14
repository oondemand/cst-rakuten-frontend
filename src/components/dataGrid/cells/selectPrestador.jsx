import { useEffect, useState, useRef } from "react";
import { AsyncSelect } from "chakra-react-select";
import { api } from "../../../config/api";

export const SelectPrestadorCell = ({
  getValue,
  row,
  column,
  table,
  options,
  ...rest
}) => {
  const initialValue = getValue();
  const [value, setValue] = useState("");

  const timeoutRef = useRef(null);
  const abortControllerRef = useRef(null);

  const fetchPrestadores = async (inputValue) => {
    try {
      const { data } = await api.get(`/prestadores?searchTerm=${inputValue}`, {
        signal: abortControllerRef.current.signal,
      });
      return data?.prestadores || [];
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Erro na requisição:", error);
      }
      return [];
    }
  };

  const createPrestadorOption = (prestador) => ({
    label: `${prestador.nome} - ${prestador.sid} - ${prestador.documento}`,
    value: prestador._id,
  });

  const debounceRequest = (callback, delay) => {
    return new Promise((resolve) => {
      timeoutRef.current = setTimeout(async () => {
        resolve(await callback());
      }, delay);
    });
  };

  const loadOptions = async (inputValue) => {
    clearTimeout(timeoutRef.current);
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    const options = await debounceRequest(async () => {
      const prestadores = await fetchPrestadores(inputValue);
      return prestadores.map(createPrestadorOption);
    }, 1000);

    return options;
  };

  const handleUpdate = async () => {
    try {
      await table.options.meta?.updateData({
        prestadorId: row.original._id,
        data: { [column.columnDef.accessorKey]: value.value },
      });
    } catch (error) {
      console.error("Erro na atualização:", error);
      revertToInitialValue();
    }
  };

  const revertToInitialValue = () => {
    setValue({
      label: `${initialValue?.nome} - ${initialValue?.sid} - ${initialValue?.documento}`,
      value: initialValue?._id,
    });
  };

  const shouldUpdateValue = () => {
    return value.value && value.value !== initialValue?._id;
  };

  const onBlur = async () => {
    if (shouldUpdateValue()) {
      await handleUpdate();
    }
  };

  const initializeValue = () => {
    setValue({
      label: `${initialValue?.nome} - ${initialValue?.sid} - ${initialValue?.documento}`,
      value: initialValue?._id,
    });
  };

  useEffect(() => {
    initializeValue();
  }, [initialValue]);
  return (
    <AsyncSelect
      {...rest}
      defaultInputValue={value}
      isClearable={true}
      variant="subtle"
      onBlur={onBlur}
      size="xs"
      value={value ?? ""}
      onChange={setValue}
      loadOptions={loadOptions}
      placeholder="Buscar prestador..."
      focusRingColor="brand.500"
      chakraStyles={{
        control: (base) => ({
          ...base,
          backgroundColor: "transparent",
          scrollbarWidth: "thin",
          fontWeight: "normal",
          fontSize: "xs",
        }),
        menu: (base) => ({
          ...base,
          scrollbarWidth: "thin",
          fontWeight: "normal",
          fontSize: "xs",
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
          fontSize: "xs",
        }),
      }}
    />
  );
};
