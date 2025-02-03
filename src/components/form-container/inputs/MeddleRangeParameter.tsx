import { View } from "react-native";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Input, InputField } from "../../../../components/ui";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RangeSlider from "./CustomInputs/RangeSlider";
import { scale } from "react-native-size-matters";

export default function MeddleRangeParameter({
  fieldName,
  step = 10,
  control,
  placeholder,
  invalidInput,
  value = { min: 10, max: 500 }, // Default value for the `value` prop
}) {
  const MIN_DEFAULT = 10;
  const MAX_DEFAULT = 500;

  console.log("====================================");
  console.log(value); // Debugging to log the current value
  console.log("====================================");

  const [minValue, setMinValue] = useState(value.min || MIN_DEFAULT);
  const [maxValue, setMaxValue] = useState(value.max || MAX_DEFAULT);

  return (
    <View style={{ height: scale(100) }}>
      <GestureHandlerRootView>
        <View className="px-2 py-4">
          <Controller
            control={control}
            name={fieldName}
            defaultValue={{ min: minValue, max: maxValue }} // Default range values
            render={({ field: { onChange, value } }) => (
              <RangeSlider
                max={MAX_DEFAULT}
                min={MIN_DEFAULT}
                sliderWidth={300}
                step={step}
                onValueChange={(range) => {
                  setMinValue(range.min);
                  setMaxValue(range.max);
                  onChange(range); // Save the range to the form state
                }}
                value={value}
              />
            )}
          />
        </View>
        <View className="my-4 flex flex-row justify-between">
          <Input
            variant="outline"
            size="xl"
            className="w-1/3 text-center"
            isDisabled={false}
            isReadOnly={true}
            isInvalid={invalidInput}
          >
            <InputField
              value={`${minValue}`}
              onChangeText={(value) => {
                const newValue = Number(value);
                setMinValue(newValue);
              }}
              placeholder={placeholder}
            />
          </Input>
          <Input
            variant="outline"
            size="xl"
            className="w-1/3"
            isDisabled={false}
            isInvalid={invalidInput}
            isReadOnly={true}
          >
            <InputField
              value={`${maxValue}`}
              onChangeText={(value) => {
                const newValue = Number(value);
                setMaxValue(newValue);
              }}
              placeholder={placeholder}
            />
          </Input>
        </View>
      </GestureHandlerRootView>
    </View>
  );
}
