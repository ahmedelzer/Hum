import React, { useState } from "react";
import {
  I18nManager,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { isRTL } from "../operation/isRTL";
export default function InputWithAction({
  placeholder,
  submitButtonText,
  onSubmitFun,
}) {
  const [value, setValue] = useState("");

  return (
    <View>
      {isRTL() ? (
        <View className="flex-row mt-2 items-center">
          <TouchableOpacity
            onPress={() => onSubmitFun(value)}
            className="bg-accent px-4 py-3 flex flex-row justify-center items-center h-full rounded-r-lg"
          >
            <Text className="text-body text-sm">{submitButtonText}</Text>
          </TouchableOpacity>
          <TextInput
            placeholder={placeholder}
            onChangeText={setValue}
            className={
              "flex-1 bg-body p-3 rounded-l-lg text-sm border border-border " +
              `${isRTL() ? "text-right order-10" : "text-left order-1"}`
            }
          />
        </View>
      ) : (
        <View className="flex-row-reverse mt-2 items-center">
          <TouchableOpacity
            onPress={() => onSubmitFun(value)}
            className="bg-accent px-4 py-3 flex flex-row justify-center items-center h-full rounded-r-lg"
          >
            <Text className="text-body text-sm">{submitButtonText}</Text>
          </TouchableOpacity>
          <TextInput
            placeholder={placeholder}
            onChangeText={setValue}
            className={
              "flex-1 bg-body p-3 rounded-l-lg text-sm border border-border " +
              `${isRTL() ? "text-right order-10" : "text-left order-1"}`
            }
          />
        </View>
      )}
    </View>
  );
}
