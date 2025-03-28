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
