import { Image } from "@/components/ui";
import { Button, ButtonText } from "@/components/ui/button";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { ArrowLeftIcon, CheckIcon, Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard, TouchableOpacity } from "react-native";
import * as Yup from "yup";
import { LocalizationContext } from "../../../../context/LocalizationContext";
import FormContainer from "../../../components/form-container/FormContainer";
import { onApply } from "../../../components/form-container/OnApply";
import SighupSchema from "../../../Schemas/LoginSchema/SighupSchema.json";
import PersonalInfo from "../../../Schemas/PersonalInfo.json";
import { AuthLayout } from "../layout";
import LoadingButton from "../../../utils/component/LoadingButton";
import { useDeviceInfo } from "../../../utils/component/useDeviceInfo";
import { AntDesign } from "@expo/vector-icons";
import VerifySchemaAction from "../../../Schemas/LoginSchema/VerifySchemaAction.json";
import { useSelector } from "react-redux";

// const signUpSchema = Yup.object().shape({
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string()
//     .min(6, "Must be at least 8 characters in length")
//     .matches(new RegExp(".*[A-Z].*"), "One uppercase character")
//     .matches(new RegExp(".*[a-z].*"), "One lowercase character")
//     .matches(new RegExp(".*\\d.*"), "One number")
//     .matches(
//       new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
//       "One special character"
//     ),
//   confirmpassword: Yup.string()
//     .oneOf([Yup.ref("password"), null], "Passwords must match")
//     .required("Confirm Password is required"),
//   rememberme: Yup.boolean().optional(),
// });

const SignUpWithLeftBackground = () => {
  const localization = useSelector((state) => state.localization.localization);
  const { os } = useDeviceInfo();

  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [disable, setDisable] = useState(false);
  const [result, setResult] = useState(null);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const DValues = {
    birthdate: `2025-04-09T06:18:00.000Z`,
    email: "testUser123@gmail.com",
    firstName: "test",
    gender: "1",
    lastName: "2",
    messageType: "0",
    password: "123456",
    confirmPassword: "123456",
    phoneNumber: "01029607040",
    username: "testUser100",
  };
  const navigation = useNavigation();

  const handleState = () => {
    setShowPassword((showState) => !showState);
  };

  const handleConfirmPwState = () => {
    setShowConfirmPassword((showState) => !showState);
  };

  const handleKeyPress = (handleSubmit: any) => {
    Keyboard.dismiss();
    handleSubmit();
  };
  const {
    control,
    handleSubmit,
    formState: { defaultValues = DValues, errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: DValues,
  });

  const onSubmit = async (data: any) => {
    // Destructure to remove confirmPassword from the sent data
    const { confirmPassword, ...sanitizedData } = data;
    setDisable(true);
    try {
      const request = await onApply(
        sanitizedData,
        null,
        true,
        SighupSchema,
        PersonalInfo.projectProxyRoute
      );
      setResult(request);

      if (request && request.success === true) {
        navigation.navigate("Verify", {
          ...data,
          ...request.data,
          VerifySchemaAction: VerifySchemaAction,
        });
      }
    } catch (error) {
      console.error("API call failed:", error);
      // Optionally, handle the error here (e.g., show a notification)
    } finally {
      // Enable the button after the API call
      setDisable(false);
    }
  };

  return (
    <VStack
      className={`max-w-[440px] w-full mt-2 ${
        os == "web" && "m-auto bg-card shadow-lg !h-fit px-6 py-3 rounded-lg"
      }`}
      space="md"
    >
      <VStack className="md:items-center" space="md">
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon
            as={ArrowLeftIcon}
            className="md:hidden stroke-background-800"
            size="xl"
          />
        </Pressable>
        <VStack className="items-center" space="md">
          <Image
            alt="login-logo"
            style={{
              objectFit: "contain",
            }}
            source={require("../../../../assets/display/logo.jpeg")}
          />
          <VStack space="lg">
            <Heading className="text-center" size="3xl">
              {localization.sighUp.headTitle}
            </Heading>
            <HStack className="items-center justify-center">
              <Text>{localization.sighUp.headDescription}</Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                <Heading className="text-center text-accent" size="md">
                  {localization.sighUp.login}
                </Heading>
              </TouchableOpacity>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
      <VStack className="w-full">
        <VStack space="xl" className="w-full">
          <FormContainer
            tableSchema={PersonalInfo}
            row={DValues}
            control={control}
            errorResult={result || errors}
            clearErrors={clearErrors}
          />
          <Checkbox
            size="sm"
            value="accept Privacy"
            aria-label="accept Privacy"
          >
            <CheckboxIndicator>
              <CheckboxIcon
                as={() => (
                  <AntDesign name="check" size={20} className="text-body" />
                )}
              />
              {/* <CheckboxIcon as={CheckIcon} /> */}
            </CheckboxIndicator>
            <CheckboxLabel>{localization.sighUp.acceptPrivacy}</CheckboxLabel>
          </Checkbox>
        </VStack>
        <VStack className="w-full my-7" space="lg">
          <LoadingButton
            buttonText={localization.sighUp.sighUpButton}
            loading={disable}
            onPress={async () => {
              await handleSubmit(onSubmit)();
            }}
            className="w-full rounded-lg"
          />
        </VStack>
      </VStack>
    </VStack>
  );
};

export const SignUp = () => {
  return (
    <AuthLayout>
      <SignUpWithLeftBackground />
    </AuthLayout>
  );
};
