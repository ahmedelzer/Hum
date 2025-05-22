import React, { useState } from "react";
import {
  I18nManager,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
export default function InputWithAction({
  placeholder,
  submitButtonText,
  onSubmitFun,
}) {
  const [value, setValue] = useState("");
  return (
    <View className="flex-row mt-2 items-center">
      <TextInput
        placeholder={placeholder}
        onChangeText={setValue}
        className={
          "flex-1 bg-body p-3 rounded-l-lg text-sm border border-border " +
          `${I18nManager.isRTL ? "text-right" : "text-left"}`
        }
      />
      <TouchableOpacity
        onPress={() => onSubmitFun(value)}
        className="bg-accent px-4 py-3 flex flex-row justify-center items-center h-full rounded-r-lg"
      >
        <Text className="text-body text-sm">{submitButtonText}</Text>
      </TouchableOpacity>
    </View>
  );
}
