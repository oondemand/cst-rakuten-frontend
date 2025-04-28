import { z } from "zod";
import { parse, isValid, format } from "date-fns";

/**
 * Função que transforma "" em undefined
 */
export const preprocessEmptyToUndefined = (schema) =>
  z.preprocess((val) => {
    return val === "" ? undefined : val;
  }, schema);

/**
 * Função valida data e transforma no formato aceitado pelo mongodb
 */
export const dateValidation = z
  .string()
  .refine(
    (value) => {
      if (!value) return true;
      const parsed = parse(value, "dd/MM/yyyy", new Date());
      return isValid(parsed);
    },
    {
      message: "Data inválida",
    }
  )
  .transform((value) => {
    if (!value) return undefined;
    const parsed = parse(value, "dd/MM/yyyy", new Date());
    return format(parsed, "yyyy/MM/dd");
  })
  .optional();

export const currencyValidation = preprocessEmptyToUndefined(
  z.coerce
    .string()
    .transform((value) => {
      const isNegative = value.includes("-");
      const isCurrencyString = value.includes("R$");

      const numericString = isCurrencyString
        ? value
            .replaceAll(".", "-")
            .replaceAll("R$", "")
            .replaceAll(",", ".")
            .replaceAll("-", "")
            .trim()
        : value.replaceAll("-", "");

      const numero = Number(numericString);

      return isNegative ? -numero : numero;
    })
    .optional()
);

export const requiredCurrencyValidation = z.coerce
  .string()
  .nonempty("Campo obrigatório")
  .transform((value) => {
    const isNegative = value.includes("-");
    const isCurrencyString = value.includes("R$");

    const numericString = isCurrencyString
      ? value
          .replaceAll(".", "-")
          .replaceAll("R$", "")
          .replaceAll(",", ".")
          .replaceAll("-", "")
          .trim()
      : value.replaceAll("-", "");

    const numero = Number(numericString);

    return isNegative ? -numero : numero;
  });
