import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../config/api";
import { SelectAutocomplete } from "../../selectAutocomplete";
import { MenuList } from "../../menuList";

export const SelectBancoCell = ({ getValue, row, column, table, ...rest }) => {
  const { data } = useQuery({
    queryKey: ["listar-bancos"],
    queryFn: async () => await api.get("/bancos"),
    staleTime: 1000 * 60 * 10,
  });

  const options = useMemo(
    () => data?.data.map((e) => ({ value: e?.codigo, label: e?.nome })),
    [data]
  );

  const initialValue = getValue();
  const [value, setValue] = useState("");

  const onBlur = async () => {
    if (value && value !== options.find((e) => e?.value === initialValue)) {
      try {
        await table.options.meta?.updateData({
          prestadorId: row.original._id,
          data: { [column.columnDef.accessorKey]: value.value },
        });
      } catch (error) {
        console.log(error);
        const value = options?.find(
          (e) => e?.value?.toString() === initialValue?.toString()
        );

        setValue(value);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      const value = options?.find(
        (e) => e?.value?.toString() === initialValue?.toString()
      );

      setValue(value);
    }
  };

  useEffect(() => {
    const value = options?.find(
      (e) => e?.value?.toString() === initialValue?.toString()
    );

    setValue(value);
  }, [initialValue, data]);
  return (
    <SelectAutocomplete
      onKeyDown={handleKeyDown}
      components={{ MenuList }}
      placeholder={value}
      onBlur={onBlur}
      value={value}
      setValue={setValue}
      options={options}
    />
  );
};
