import React, { useContext, useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";

function InputPassword({ ...props }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const Right = false;
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  let { value, enable, title, fieldName }: any = props;

  return (
    <View
      style={{
        flexDirection: Right ? "row-reverse" : "row",
        alignItems: "center",
      }}>
      <TextInput
        style={{ flex: 1, borderColor: "gray", borderWidth: 1, padding: 10 }}
        secureTextEntry={!passwordVisible}
        defaultValue={value}
        editable={enable}
        placeholder={title}
        id={fieldName}
        {...props}
      />
      <TouchableOpacity
        onPress={togglePasswordVisibility}
        style={{ padding: 10 }}>
        {passwordVisible ? <EyeOff /> : <Eye />}
      </TouchableOpacity>
    </View>
  );
}

export default InputPassword;
