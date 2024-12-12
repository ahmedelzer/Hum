import React, { useState } from "react";
import { Text, View } from "react-native";
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

export default function CheckBoxParameter({
  values,
  value,
  fieldName,
  enable,
  onChange,
  ...props
}) {
  const [isChecked, setIsChecked] = useState(false);
  // const [values, setValues] = useState([]); // Track selected checkbox values
  const handleChange = () => {
    setIsChecked(!isChecked); // Toggle the checkbox state
  };

  return (
    <View>
      <CheckboxGroup
        value={values}
        onChange={(keys) => {
          setValues(keys); // Update selected values
        }}
      >
        <VStack space="xl">
          {/* Checkbox for "Framer" */}
          <Checkbox value="framer">
            <CheckboxIndicator>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel>Framer</CheckboxLabel>
          </Checkbox>

          {/* Checkbox for "Invision Studio" */}
          <Checkbox value="invision">
            <CheckboxIndicator>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel>Invision Studio</CheckboxLabel>
          </Checkbox>

          {/* Checkbox for "Adobe XD" */}
          <Checkbox value="adobe">
            <CheckboxIndicator>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel>Adobe XD</CheckboxLabel>
          </Checkbox>
        </VStack>
      </CheckboxGroup>
      <Input
        variant="outline"
        className={"w-0 h-0 opacity-0"}
        size="md"
        isDisabled={false}
        // isInvalid={props.invalidInput}
        isReadOnly={false}
      >
        <InputField
          className={"w-0 h-0 opacity-0"}
          value={value}
          onChangeText={onChange}
          // onBlur={onBlur}
          defaultValue={value}
          // onFocus={onFocus}
          // {...props}
          // placeholder={props.placeholder}
          // style={[inputStyle, props.style]}
        />
      </Input>
    </View>
  );
}
