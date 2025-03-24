import * as XLSX from "xlsx";
import { Button } from "@chakra-ui/react";

export const ExportData = ({
  columns,
  dataToExport,
  label = "Exportar (Excel)",
}) => {
  const handleExport = async () => {
    const data = await dataToExport();

    // Processar os dados conforme as colunas
    const rows = data.map((row) => {
      const newRow = {};
      columns.forEach((column) => {
        if (["acoes", "action", "status"].includes(column?.accessorKey)) return;
        // Obtém o valor usando o accessorKey (suporta nested objects com notação de ponto)
        const accessor = column.accessorKey?.split(".") || [];
        const value = accessor.reduce((acc, key) => acc?.[key], row);
        newRow[column.header] = value;
      });
      return newRow;
    });

    // Criar a planilha
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "exported");

    // Gerar arquivo
    XLSX.writeFile(workbook, "exported.xlsx", {
      type: "buffer",
    });
  };

  return (
    <Button
      size="sm"
      variant="subtle"
      fontWeight="semibold"
      color="brand.500"
      onClick={handleExport}
      _hover={{ backgroundColor: "gray.50" }}
    >
      {label}
    </Button>
  );
};
