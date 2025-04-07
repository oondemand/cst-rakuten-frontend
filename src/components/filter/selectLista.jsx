import { DebouncedInput } from "../DebouncedInput";
import { NativeSelectField, NativeSelectRoot } from "../ui/native-select";
import { SelectPrestadorFilter } from "./selectPrestador";
import { useQuery } from "@tanstack/react-query";
import { ListaService } from "../../service/listas";

export function SelectListaFilter({ onChange, value, cod, ...props }) {
  const { data: lista } = useQuery({
    queryFn: async () => ListaService.getListByCode({ cod }),
    queryKey: [`list-${cod}`],
    staleTime: 1000 * 60 * 10, //10 minutos
  });

  const options = lista?.valores?.map((e) => ({
    label: e?.valor,
    value: e?.valor,
  }));

  return (
    <NativeSelectRoot>
      <NativeSelectField
        {...props}
        size="xs"
        h="28px"
        rounded="sm"
        color="gray.700"
        value={value}
        onChange={onChange}
      >
        {options?.map((item, i) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
        <option value="">Todos</option>
      </NativeSelectField>
    </NativeSelectRoot>
  );
}
