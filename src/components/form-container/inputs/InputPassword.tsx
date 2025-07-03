import Entypo from "@expo/vector-icons/Entypo";
import React, { useEffect, useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import {
  Input,
  InputField,
  InputIcon,
  InputSlot,
} from "../../../../components/ui";
import { View } from "react-native";
import { useSelector } from "react-redux";
function InputPassword({ ...props }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const localization = useSelector((state) => state.localization.localization);
  const errorText = localization.inputs.password.error;

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
    placeholder,
    mustConfirmed = type === "confirmPassword",
    clearErrors,
  }: any = props;
  const passwordValue = useWatch({
    control,
    name: fieldName,
  });
  return (
    <Controller
      control={control}
      rules={{
        required: true,
        validate: (val) => {
          if (mustConfirmed && val !== confirmPassword) {
            return errorText; // This will be shown as the error message
          }
          return true;
        },
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <View>
          <Input isInvalid={props.invalidInput}>
            <InputField
              type={passwordVisible ? "text" : "password"}
              // {...props}
              className="!h-12"
              size="md"
              onChangeText={(val) => {
                onChange(val);
                // if (mustConfirmed && val !== confirmPassword) {
                //   console.log(errorText, confirmPassword);

                //   //make here vladtion
                //   control.setError(fieldName, {
                //     type: "manual",
                //     message: errorText,
                //   });
                // } else {
                //   clearErrors(fieldName);
                // }
              }}
              onBlur={onBlur}
              secureTextEntry={!passwordVisible}
              value={value}
              defaultValue={defaultValue}
              editable={enable}
              placeholder={placeholder}
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
                className="!h-12 !mt-2"
                size="md"
                onChangeText={(newValue) => {
                  console.log("value", value, "newValue", newValue);
                  setConfirmPassword(newValue);
                  if (value !== newValue) {
                    //make here vladtion
                    control.setError(fieldName, {
                      type: "manual",
                      message: errorText,
                    });
                  } else {
                    clearErrors(fieldName);
                  }
                }}
                secureTextEntry={!passwordVisible}
                editable={enable}
                placeholder={placeholder} //!localiztion
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
