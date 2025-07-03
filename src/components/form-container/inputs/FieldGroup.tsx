import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { InputField, Input } from "../../../../components/ui";

export default function FieldGroup({
  defaultValue,
  name,
  title,
  className,
  control,
  ...props
}) {
  // Applying conditional style for validation
  const inputStyle = title ? styles.invalid : styles.input;
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={props.invalidInput}
          isReadOnly={false}
        >
          <InputField
            className="w-full !h-12"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            defaultValue={defaultValue}
            keyboardType={props.type === "number" ? "numeric" : "default"}
            step={props.step}
            // onFocus={onFocus}
            // {...props}
            placeholder={props.placeholder}
            style={props.style}
          />
        </Input>
      )}
      name={name}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  invalid: {
    borderWidth: 1,
    borderColor: "red", // Changes border color to red if there's a validation issue
    padding: 10,
    borderRadius: 5,
  },
});
