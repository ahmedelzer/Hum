import React, { useContext, useState } from "react";
import { View, Text, TextInput } from "react-native";
import {
  RadioGroup,
  Radio,
  RadioLabel,
  RadioIcon,
  RadioIndicator,
  Input,
  InputField,
} from "../../../../components/ui"; // Hypothetical Glustak components
import { CircleIcon, RadioTowerIcon } from "lucide-react-native";

const BooleanParameter = ({
  values,
  value: defaultValue,
  fieldName,
  enable,
  onChange,
  ...props
}) => {
  const [value, setValues] = useState(defaultValue || values[0]);
  const handleChange = (newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };
  return (
    <View>
      <RadioGroup
        value={value}
        onChange={setValues}
        isDisabled={!enable}
        style={{ paddingHorizontal: 16, paddingVertical: 8 }}
      >
        {/* Yes Option */}
        {values.map((value, index) => (
          <Radio value={value} key={index}>
            <RadioIndicator>
              <RadioIcon as={CircleIcon} />
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
        // isInvalid={props.invalidInput}
        isReadOnly={false}
      >
        <InputField
          className={"w-0 h-0 opacity-0"}
          value={value}
          onChangeText={onChange}
          // onBlur={onBlur}
          defaultValue={defaultValue}
          // onFocus={onFocus}
          // {...props}
          // placeholder={props.placeholder}
          // style={[inputStyle, props.style]}
        />
      </Input>
    </View>
  );
};

export default BooleanParameter;
