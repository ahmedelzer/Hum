import Entypo from "@expo/vector-icons/Entypo";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  Input,
  InputField,
  InputIcon,
  InputSlot,
} from "../../../../components/ui";
import { View } from "react-native";
function InputPassword({ ...props }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  let {
    value: defaultValue,
    enable,
    title,
    fieldName,
    control,
    type,
    mustConfirmed = type === "confirmPassword",
    clearErrors,
  }: any = props;
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <View>
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
          {mustConfirmed && (
            <Input isInvalid={props.invalidInput}>
              <InputField
                type={passwordVisible ? "text" : "password"}
                // {...props}
                className="!h-12 mt-2"
                size="md"
                onChangeText={(newValue) => {
                  if (value !== newValue) {
                    //make here vladtion
         

                    control.setError(fieldName, {
                      type: "manual",
                      message: "Passwords do not match",
                    });
                  } else {
                    clearErrors(fieldName);
                  }
                }}
                secureTextEntry={!passwordVisible}
                editable={enable}
                placeholder={`confirm ${title}`} //!localiztion
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
        </View>
      )}
      name={fieldName}
    />
  );
}

export default InputPassword;
