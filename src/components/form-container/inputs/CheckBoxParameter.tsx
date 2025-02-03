import React, { useState } from "react";
import { View } from "react-native";
import {
  CheckboxGroup,
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
  VStack,
  Input,
  InputField,
} from "../../../../components/ui";
import { CheckIcon } from "lucide-react-native";
import { Controller } from "react-hook-form";

export default function CheckBoxParameter({
  values = [], // Values to display as checkboxes
  value = [], // Current selected values
  fieldName,
  enable = true, // Whether the checkboxes are enabled
  control,
  ...props
}) {
  const [selectedValues, setSelectedValues] = useState(value);

  const handleCheckboxChange = (selectedKeys, formOnChange) => {
    setSelectedValues(selectedKeys); // Update local state

    // Trigger form state change via react-hook-form
    if (formOnChange) {
      formOnChange(selectedKeys); // Pass the selected values to react-hook-form
    }
  };

  return (
    <Controller
      control={control}
      rules={{
        required: false,
      }}
      name={fieldName} // Ensure the Controller works with the fieldName
      render={({ field: { onChange: formOnChange, onBlur } }) => (
        <View>
          <CheckboxGroup
            value={selectedValues}
            onChange={(selectedKeys) =>
              handleCheckboxChange(selectedKeys, formOnChange)
            } // Pass formOnChange to update form state
            isDisabled={!enable} // Disable the group if not enabled
          >
            <VStack space="xl">
              {values.map((item, index) => (
                <Checkbox key={index} value={item}>
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel>{item}</CheckboxLabel>
                </Checkbox>
              ))}
            </VStack>
          </CheckboxGroup>

          {/* Hidden input to pass the selected values */}
          <Input
            variant="outline"
            className={"w-0 h-0 opacity-0"}
            size="md"
            isDisabled={false}
            isReadOnly={true}
          >
            <InputField
              className={"w-0 h-0 opacity-0"}
              value={JSON.stringify(selectedValues)} // Pass the selected values as a string
              editable={false} // Make the field non-editable
              onChangeText={() => {}}
              defaultValue={JSON.stringify(selectedValues)} // Ensure that it reflects the selected values
            />
          </Input>
        </View>
      )}
    />
  );
}
