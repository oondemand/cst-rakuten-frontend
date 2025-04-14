import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid, GridItem } from "@chakra-ui/react";
import { z } from "zod";

const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};

function buildNestedSchema(fields) {
  const schemaStructure = fields.reduce((acc, field) => {
    // Se não existir accessorKey ou validation, ignora o campo
    if (!field.accessorKey || !field.validation) return acc;

    const parts = field.accessorKey.split(".");
    let currentLevel = acc;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;

      if (isLast) {
        // Apenas adiciona se validation existi
        currentLevel[part] = field.validation;
      } else {
        if (!currentLevel[part] || currentLevel[part] instanceof z.ZodType) {
          currentLevel[part] = {};
        }
        currentLevel = currentLevel[part];
      }
    }

    return acc;
  }, {});

  // Função recursiva para converter a estrutura em um schema Zod
  const createRecursiveSchema = (structure) => {
    const entries = Object.entries(structure)
      .filter(([_, value]) => value !== undefined) // Remove valores indefinidos
      .map(([key, value]) => {
        if (value instanceof z.ZodType) {
          return [key, value];
        }
        return [key, createRecursiveSchema(value)];
      });

    return z.object(Object.fromEntries(entries));
  };

  return createRecursiveSchema(schemaStructure);
}

export const BuildForm = ({
  visibleState,
  fields,
  onSubmit,
  data,
  gap,
  gridColumns = 4,
  disabled,
  shouldUseFormValues = false,
  ...props
}) => {
  const schema = buildNestedSchema(fields);

  const formConfig = {
    mode: "onBlur",
    resolver: zodResolver(schema),
    shouldFocusError: false,
  };

  if (shouldUseFormValues) {
    formConfig.values = { ...data };
  } else {
    formConfig.defaultValues = { ...data };
  }

  const methods = useForm(formConfig);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = methods;

  return (
    <FormProvider {...methods}>
      <form onBlur={handleSubmit(onSubmit)}>
        <Grid
          alignItems="baseline"
          templateColumns={`repeat(${gridColumns}, 1fr)`}
          gap={gap}
        >
          {fields.map((field) => {
            const { render, ...rest } = field;

            const isVisible =
              visibleState?.[field.accessorKey] === undefined
                ? true
                : visibleState?.[field.accessorKey];

            return (
              <GridItem
                display={isVisible ? "block" : "none"}
                key={field.accessorKey}
                colSpan={field?.colSpan ? field.colSpan : 1}
              >
                {field.render({
                  getInitialValue: () =>
                    getNestedValue(data, field.accessorKey),
                  initialValue: getNestedValue(data, field.accessorKey),
                  field: register(field.accessorKey),
                  error: getNestedValue(errors, field.accessorKey)?.message,
                  methods,
                  disabled,
                  ...rest,
                  ...props,
                  ...methods,
                })}
              </GridItem>
            );
          })}
        </Grid>
      </form>
    </FormProvider>
  );
};
