import React, { useEffect, useState } from "react";
import { FloatingLabelInput } from "../../input/floatingLabel";

export const FloatInputField = ({ inputStyles, w, ...props }) => {
  const [value, setValue] = useState("");

  const onblur = async () => {
    if (value !== "" && value !== props?.data?.[props.accessorKey]) {
      await props.onBlurFn({ body: { [props.accessorKey]: value } });
      props.data && (props.data[props.accessorKey] = value);
      return;
    }
  };

  useEffect(() => {
    setValue(props?.initialValue);
  }, [props?.initialValue]);

  return (
    <FloatingLabelInput
      w={w}
      fontSize="xs"
      label={props.label}
      value={value}
      onBlur={onblur}
      onChange={(e) => setValue(e.target.value)}
      disabled={props.disabled ?? !props.data}
      {...inputStyles}
    />
  );
};
