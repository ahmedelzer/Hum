import React from "react";
import InputDisplay from "./InputDisplay";
import { GetInputComponent } from "./GetInputComponent";
import { CreateInputProps } from "./CreateInputProps";

export default function DataCellRender({
  data,
  errorResult,
  onChange,
  value,
  control,
  ...props
}) {
  // Determine the key to use for input mapping
  const inputKey = data.parameterType;

  const InputComponentClass = GetInputComponent(inputKey);
  // Optionally instantiate the class (if needed)
  return (
    <InputDisplay
      props={{
        ...CreateInputProps(data, value),
        onChange: onChange,
        control: control,
        ...props,
      }}
      errorResult={errorResult}
      BaseInput={InputComponentClass}
    />
  );
}
