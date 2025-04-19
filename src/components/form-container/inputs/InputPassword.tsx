import Entypo from "@expo/vector-icons/Entypo";
import React, { useState } from "react";
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
        <Input isInvalid={props.invalidInput}>
          <InputField
            type={passwordVisible ? "text" : "password"}
            // {...props}
            className="!h-12"
            size="md"
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={!passwordVisible}
            value={value}
            defaultValue={defaultValue}
            editable={enable}
            placeholder={title}
            id={fieldName}
          />
          <InputSlot
            onPress={togglePasswordVisibility}
            className="w-8 items-center"
          >
            {passwordVisible ? (
              <Entypo name="eye" size={24} color="black" />
            ) : (
              <Entypo name="eye-with-line" size={24} color="black" />
            )}
          </InputSlot>
        </Input>
      )}
      name={fieldName}
    />
  );
}

export default InputPassword;
