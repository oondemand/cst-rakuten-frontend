import { TagInput } from "../../ui/tagInput";
import { Box, Text } from "@chakra-ui/react";
import { z } from "zod";

const sidTagSchema = z.coerce
  .string()
  .length(7, { message: "Sid precisa ter exatamente 7 dígitos" })
  .regex(/^\d+$/, { message: "Sid deve conter apenas números" });

export const SidTagInputField = ({ inputStyle, ...props }) => {
  const validarSidTag = (e, tag) => {
    const validation = sidTagSchema.safeParse(tag);

    if (!validation.success) {
      props.setError("sid", {
        type: "manual",
        message: validation.error.errors[0].message,
      });

      return e.preventDefault();
    }

    if (props.watch("sid")?.includes(Number(tag))) {
      props.setError("sid", {
        type: "manual",
        message: "Esse sid já foi adicionado",
      });

      return e.preventDefault();
    }

    props.clearErrors?.("sid");
  };

  return (
    <Box w="full">
      <Text fontSize="sm" color="gray.700">
        {props.label}
      </Text>
      <TagInput
        tags={props.watch("sid")}
        onAddTag={validarSidTag}
        onTagsChange={(e, newTags) => {
          props.setValue("sid", newTags);
        }}
      />
      <Text fontSize="xs" color="red.400">
        {props.error}
      </Text>
    </Box>
  );
};
