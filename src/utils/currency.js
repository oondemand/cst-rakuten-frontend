export const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function parseBRLCurrencyToNumber(valorStr) {
  const isNegative = valorStr.includes("-");

  const valorLimpo = valorStr
    .replace("R$", "")
    .replace("-", "")
    .replaceAll(/\./g, "")
    .replace(",", ".")
    .trim();

  const numero = parseFloat(valorLimpo);
  return isNegative ? -numero : numero;
}
