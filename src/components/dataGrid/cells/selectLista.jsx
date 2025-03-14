import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ListaService } from "../../../service/listas";
import { SelectAutocomplete } from "../../selectAutocomplete";

export const SelectListaCell = ({
  getValue,
  row,
  column,
  table,
  cod,
  ...rest
}) => {
  const { data: lista } = useQuery({
    queryKey: [`list-${cod}`],
    queryFn: () => ListaService.getListByCode({ cod }),
    staleTime: 1000 * 60 * 10, // 10 minutos em milissegundos
  });

  const initialValue = getValue();
  const [value, setValue] = useState("");

  const options =
    lista?.valores?.map((item) => ({
      label: item.chave ?? item.valor,
      value: item.valor ?? item.chave,
    })) || [];

  const findItemByInitialValue = (options) => {
    return options.find((option) => {
      return option.label === initialValue || option.value === initialValue;
    });
  };

  const handleUpdateError = () => {
    const fallbackValue = options.find(
      (item) => item.chave === initialValue || item.valor === initialValue
    );
    setValue(fallbackValue);
  };

  const handleBlur = async () => {
    const originalItem = findItemByInitialValue(options);

    if (!value || value?.value === (originalItem?.value || originalItem?.label))
      return;

    try {
      await table.options.meta?.updateData({
        prestadorId: row.original._id,
        data: { [column.columnDef.accessorKey]: value.value },
      });
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      handleUpdateError();
    }
  };

  const initializeValue = () => {
    const initialOption = findItemByInitialValue(options);
    setValue(initialOption);
  };

  useEffect(() => {
    initializeValue();
  }, [initialValue, lista]);
  return (
    <SelectAutocomplete
      placeholder={value}
      onBlur={handleBlur}
      value={value}
      setValue={setValue}
      options={options}
    />
  );
};
