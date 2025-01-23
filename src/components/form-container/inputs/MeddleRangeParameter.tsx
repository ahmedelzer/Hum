import { View } from "react-native";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Input, InputField } from "../../../../components/ui";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RangeSlider from "./CustomInputs/RangeSlider";
import { scale } from "react-native-size-matters";

export default function MeddleRangeParameter({ ...props }) {
  let { fieldName, step = 10, control } = props;
  const [minValue, setMinValue] = useState(10);
  const [maxValue, setMaxValue] = useState(500);

  return (
    <View style={{ height: scale(100) }}>
      <GestureHandlerRootView>
        <View className="px-2 py-4">
          <RangeSlider
            max={maxValue}
            min={minValue}
            onValueChange={(range) => {
              setMinValue(range.min);
              setMaxValue(range.max);
            }}
            sliderWidth={300}
            step={step}
          />
        </View>
        <View className="my-4 flex flex-row justify-between">
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur } }) => (
              <Input
                variant="outline"
                size="lg"
                className="w-1/3 text-center"
                isDisabled={false}
                isInvalid={props.invalidInput}
                isReadOnly={false}
              >
                <InputField
                  value={`${minValue}`}
                  onChangeText={(value) => {
                    setMinValue(Number(value)); // Update minValue dynamically
                    onChange(value); // Sync with the form control
                  }}
                  onBlur={onBlur}
                  placeholder={props.placeholder}
                />
              </Input>
            )}
            name={`${fieldName}_min`}
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur } }) => (
              <Input
                variant="outline"
                size="lg"
                className="w-1/3"
                isDisabled={false}
                isInvalid={props.invalidInput}
                isReadOnly={false}
              >
                <InputField
                  value={`${maxValue}`}
                  onChangeText={(value) => {
                    setMaxValue(Number(value)); // Update maxValue dynamically
                    onChange(value); // Sync with the form control
                  }}
                  onBlur={onBlur}
                  placeholder={props.placeholder}
                />
              </Input>
            )}
            name={`${fieldName}_max`}
          />
        </View>
      </GestureHandlerRootView>
    </View>
  );
}
