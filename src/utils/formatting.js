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

export function formatarCNPJ(documento) {
  // Remove tudo que não é dígito
  const num = documento.replace(/\D/g, "");

  // Aplica a máscara do CNPJ
  return num.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/,
    "$1.$2.$3/$4-$5"
  );
}

export function formatarCPF(documento) {
  // Remove tudo que não é dígito
  const num = documento.replace(/\D/g, "");

  // Aplica a máscara do CPF
  return num.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, "$1.$2.$3-$4");
}

export const formatPrestadorLabel = (prestador) => {
  if (!prestador) return "";

  let documento = prestador.documento;

  if (prestador?.tipo === "pf") {
    documento = formatarCPF(prestador.documento);
  }

  if (prestador?.tipo === "pj") {
    documento = formatarCNPJ(prestador.documento);
  }

  return `${prestador.nome} ${
    prestador.sid ? `- SID: ${prestador.sid?.join(";")}` : ""
  }  ${documento ? `- DOC: ${documento}` : ""}`;
};
