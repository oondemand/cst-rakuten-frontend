import { format } from "date-fns";

export const formatDate = (date, pattern = "dd/MM/yyyy") => {
  if (!date) return "";
  return format(new Date(date), pattern);
};
