import React, { useState } from "react";
import {
  I18nManager,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TextParameter } from "../../components/form-container";
import { Entypo } from "@expo/vector-icons";
export default function InputWithLabel({
  placeholder,
  maximValue,
  defaultValue,
  labelText,
  additionalAction = false,
}) {
  const [value, setValue] = useState(defaultValue);
  const onChange = (value) => {
    if (maximValue >= value && value >= 0) setValue(value);
  };
  return (
    <View>
      <Text className="text-sm font-semibold mb-1">{labelText}</Text>
      <View className="flex-row mt-2 items-center">
        {additionalAction && additionalAction}
        <TextInput
          placeholder={placeholder}
          onChangeText={onChange}
          value={value}
          keyboardType={"numeric"}
          className={
            "flex-1 bg-body p-3 rounded-l-lg text-sm border border-border " +
            `${I18nManager.isRTL ? "text-right" : "text-left"}`
          }
        />

        {/* <TextParameter {...props} /> */}
        <View className="bg-accent px-4 py-3 flex flex-row justify-center items-center h-full rounded-r-lg">
          <Text className="text-body text-sm">{maximValue}</Text>
        </View>
      </View>
    </View>
  );
}
