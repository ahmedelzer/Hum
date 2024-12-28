import React, { useContext, useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { Controller } from "react-hook-form";
import {
  Input,
  InputField,
  InputIcon,
  InputSlot,
} from "../../../../components/ui";

function InputPassword({ ...props }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  let { value: defaultValue, enable, title, fieldName, control }: any = props;
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        // <View
        // // style={{
        // //   flexDirection: "row",
        // //   alignItems: "center",
        // // }}
        // >
        //   <TextInput
        //     style={{
        //       flex: 1,
        //       borderColor: "gray",
        //       borderWidth: 1,
        //       padding: 10,
        //     }}
        // {...props}
        // onChangeText={onChange}
        // onBlur={onBlur}
        // secureTextEntry={!passwordVisible}
        // value={value}
        // editable={enable}
        // placeholder={title}
        // id={fieldName}
        //   />
        //   <TouchableOpacity
        //     onPress={togglePasswordVisibility}
        //     style={{ padding: 10 }}
        //   >
        //     {passwordVisible ? <EyeOff /> : <Eye />}
        //   </TouchableOpacity>
        // </View>
        <Input className="text-center" isInvalid={props.invalidInput}>
          <InputSlot
            className="pr-3 text-black"
            onPress={togglePasswordVisibility}
          >
            {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
            <InputIcon
              as={passwordVisible ? Eye : EyeOff}
              className="!text-black"
            />
          </InputSlot>
          <InputField
            type={passwordVisible ? "text" : "password"}
            // {...props}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={!passwordVisible}
            value={value}
            defaultValue={defaultValue}
            editable={enable}
            placeholder={title}
            id={fieldName}
          />
        </Input>
      )}
      name={fieldName}
    />
  );
}

export default InputPassword;
