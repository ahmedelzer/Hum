import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import {
  RadioGroup,
  Radio,
  RadioLabel,
  RadioIcon,
  RadioIndicator,
  Input,
  InputField,
} from "../../../../components/ui"; // Hypothetical Glustak components
import { CircleIcon } from "lucide-react-native";
import { Controller } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";

const BooleanParameter = ({
  values,
  value: defaultValue,
  fieldName,
  enable,
  control,
  ...props
}) => {
  // Local state for controlling the selected radio button
  const [localValue, setLocalValue] = useState(defaultValue || values[0]);

  useEffect(() => {
    // If the parent passes a new `value`, update the local state
    if (defaultValue !== localValue) {
      setLocalValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: false, // Add any validation rules here
        }}
        name={fieldName}
        defaultValue={localValue} // Set the default value for the Controller
        render={({ field: { onChange: formOnChange, onBlur } }) => (
          <View>
            <RadioGroup
              value={localValue}
              onChange={(newValue) => {
                // Update both local state and form state when radio value changes
                setLocalValue(newValue);
                formOnChange(newValue); // Update form state via react-hook-form
              }}
              isDisabled={!enable}
              style={{ paddingHorizontal: 16, paddingVertical: 8 }}
            >
              {/* Yes Option */}
              {values.map((value, index) => (
                <Radio value={value} key={index}>
                  <RadioIndicator>
                    <RadioIcon
                      as={() => (
                        <MaterialIcons
                          name="radio-button-checked"
                          size={20}
                          color="black"
                        />
                      )}
                    />
                  </RadioIndicator>
                  <RadioLabel>{value}</RadioLabel>
                </Radio>
              ))}
            </RadioGroup>

            <Input
              variant="outline"
              className={"w-0 h-0 opacity-0"}
              size="md"
              isDisabled={false}
              isReadOnly={false}
            >
              <InputField
                className={"w-0 h-0 opacity-0"}
                value={localValue}
                onChangeText={(text) => {
                  // Update both form and local state on value change
                  formOnChange(text); // Update the form data in react-hook-form
                  setLocalValue(text); // Update the local state
                }}
                defaultValue={defaultValue}
              />
            </Input>
          </View>
        )}
      />
    </View>
  );
};

export default BooleanParameter;
