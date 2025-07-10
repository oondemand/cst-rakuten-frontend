import { format } from "date-fns";

export const formatDate = (date, pattern = "dd/MM/yyyy") => {
  if (!date) return "";
  return format(new Date(date), pattern);
};

export const formatDateToDDMMYYYY = (date) => {
  if (!date) return "";
  const [year, month, day] = date.split("T")[0].split("-");

  return `${day}/${month}/${year}`;
};

export const formatPrestadorLabel = (prestador) => {
  if (!prestador) return "";

  return `${prestador.nome} ${
    prestador.sid ? `- SID: ${prestador.sid?.join(";")}` : ""
  }  ${prestador.documento ? `- DOC: ${prestador.documento}` : ""}`;
};
