import React, { useState, useEffect } from "react";
import { View } from "react-native";
import {
  RadioGroup,
  Radio,
  RadioLabel,
  RadioIcon,
  RadioIndicator,
  Input,
  InputField,
  CircleIcon,
} from "../../../../components/ui";
import { MaterialIcons } from "@expo/vector-icons";
import { Controller } from "react-hook-form";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useDeviceInfo } from "../../../utils/useDeviceInfo";
const RadioParameter = ({
  values,
  value: defaultValue = "0", // Expect index (0, 1, etc.)
  fieldName,
  enable,
  control,
  ...props
}) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultValue);
  const { os } = useDeviceInfo();

  useEffect(() => {
    if (defaultValue !== selectedIndex) {
      setSelectedIndex(defaultValue);
    }
  }, [defaultValue]);

  return (
    <View>
      <Controller
        control={control}
        rules={{ required: false }}
        name={fieldName}
        defaultValue={defaultValue}
        render={({ field: { onChange: formOnChange, onBlur } }) => (
          <View>
            <RadioGroup
              value={selectedIndex}
              onChange={(newIndex) => {
                setSelectedIndex(newIndex);
                formOnChange(newIndex); // store index instead of string
              }}
              isDisabled={!enable}
              style={{ paddingHorizontal: 16, paddingVertical: 8 }}
            >
              {values.map((label, index) => (
                <Radio value={`${index}`} key={index}>
                  <RadioIndicator>
                    <RadioIcon
                      as={
                        os == "web"
                          ? () => (
                              <MaterialIcons
                                name="radio-button-checked"
                                size={20}
                                color="black"
                              />
                            )
                          : CircleIcon
                      }
                    />
                    {/* <RadioIcon
                      as={() => (
                        <MaterialIcons
                          name="radio-button-checked"
                          size={20}
                          color="black"
                        />
                      )}
                    /> */}
                  </RadioIndicator>
                  <RadioLabel>{label}</RadioLabel>
                </Radio>
              ))}
            </RadioGroup>

            {/* Hidden input, stores index or string if needed */}
            <Input
              variant="outline"
              className={"w-0 h-0 opacity-0"}
              size="md"
              isDisabled={false}
              isReadOnly={false}
            >
              <InputField
                className={"w-0 h-0 opacity-0"}
                value={`${selectedIndex}`}
                onChangeText={(text) => {
                  const index = parseInt(text, 10);
                  if (!isNaN(index) && index >= 0 && index < values.length) {
                    setSelectedIndex(index);
                    formOnChange(index);
                  }
                }}
              />
            </Input>
          </View>
        )}
      />
    </View>
  );
};

export default RadioParameter;
