import React, { useState } from "react";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { LinkText } from "@/components/ui/link";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import {
  ArrowLeftIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  Icon,
} from "@/components/ui/icon";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Keyboard } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { AlertTriangle } from "lucide-react-native";
import { GoogleIcon } from "./assets/icons/google";
import { Pressable } from "@/components/ui/pressable";
import { useNavigation } from "@react-navigation/native";
import { AuthLayout } from "../layout";
import { Image } from "@/components/ui";
import FormContainer from "../../../components/form-container/FormContainer";
import PersonalInfo from "../../../Schemas/PersonalInfo.json";

const USERS = [
  {
    email: "gabrial@gmail.com",
    password: "Gabrial@123",
  },
  {
    email: "tom@gmail.com",
    password: "Tom@123",
  },
  {
    email: "thomas@gmail.com",
    password: "Thomas@1234",
  },
];

const signUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Must be at least 8 characters in length")
    .matches(new RegExp(".*[A-Z].*"), "One uppercase character")
    .matches(new RegExp(".*[a-z].*"), "One lowercase character")
    .matches(new RegExp(".*\\d.*"), "One number")
    .matches(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "One special character"
    ),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  rememberme: Yup.boolean().optional(),
});

const SignUpWithLeftBackground = () => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmpassword: "",
        rememberme: false,
      }}
      validationSchema={signUpSchema}
      onSubmit={(values, { resetForm }) => {
        const user = USERS.find((element) => element.email === values.email);
        if (user) {
          toast.show({
            placement: "bottom",
            render: ({ id }) => (
              <Toast nativeID={id} variant="solid" action="error">
                <ToastTitle>Email already exists</ToastTitle>
              </Toast>
            ),
          });
        } else {
          toast.show({
            placement: "bottom",
            render: ({ id }) => (
              <Toast nativeID={id} variant="solid" action="success">
                <ToastTitle>Success</ToastTitle>
              </Toast>
            ),
          });
          resetForm();
        }
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <VStack className="max-w-[440px] w-full" space="md">
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
                  Create New Account
                </Heading>
                <HStack className="items-center justify-center">
                  <Text>Already registered? </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("SignIn")}
                  >
                    <Heading
                      className="text-center"
                      style={styles.text}
                      size="md"
                    >
                      Login
                    </Heading>
                  </TouchableOpacity>
                </HStack>
              </VStack>
            </VStack>
          </VStack>
          <VStack className="w-full">
            <VStack space="xl" className="w-full">
              <FormContainer tableSchema={PersonalInfo} />

              {/* <FormControl isInvalid={!!errors.email && touched.email}>
                <FormControlLabel>
                  <FormControlLabelText>Email</FormControlLabelText>
                </FormControlLabel>
                <Input className="rounded-full">
                  <InputField
                    className="text-sm"
                    placeholder="Email"
                    type="text"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    onSubmitEditing={() => handleKeyPress(handleSubmit)}
                    returnKeyType="done"
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorIcon size="md" as={AlertTriangle} />
                  <FormControlErrorText>{errors.email}</FormControlErrorText>
                </FormControlError>
              </FormControl>
              <FormControl isInvalid={!!errors.password && touched.password}>
                <FormControlLabel>
                  <FormControlLabelText>Password</FormControlLabelText>
                </FormControlLabel>
                <Input className="rounded-full">
                  <InputField
                    className="text-sm"
                    placeholder="Password"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    onSubmitEditing={() => handleKeyPress(handleSubmit)}
                    returnKeyType="done"
                    type={showPassword ? "text" : "password"}
                  />
                  <InputSlot onPress={handleState} className="pr-3">
                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                  </InputSlot>
                </Input>
                <FormControlError>
                  <FormControlErrorIcon size="sm" as={AlertTriangle} />
                  <FormControlErrorText>{errors.password}</FormControlErrorText>
                </FormControlError>
              </FormControl>
              <FormControl
                isInvalid={!!errors.confirmpassword && touched.confirmpassword}>
                <FormControlLabel>
                  <FormControlLabelText>Confirm Password</FormControlLabelText>
                </FormControlLabel>
                <Input className="rounded-full">
                  <InputField
                    placeholder="Confirm Password"
                    className="text-sm"
                    value={values.confirmpassword}
                    onChangeText={handleChange("confirmpassword")}
                    onBlur={handleBlur("confirmpassword")}
                    onSubmitEditing={() => handleKeyPress(handleSubmit)}
                    returnKeyType="done"
                    type={showConfirmPassword ? "text" : "password"}
                  />
                  <InputSlot onPress={handleConfirmPwState} className="pr-3">
                    <InputIcon
                      as={showConfirmPassword ? EyeIcon : EyeOffIcon}
                    />
                  </InputSlot>
                </Input>
                <FormControlError>
                  <FormControlErrorIcon size="sm" as={AlertTriangle} />
                  <FormControlErrorText>
                    {errors.confirmpassword}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl> */}
              <Checkbox
                size="sm"
                value="Remember me"
                isChecked={values.rememberme}
                onChange={(value) => setFieldValue("rememberme", value)}
                aria-label="Remember me"
              >
                <CheckboxIndicator>
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel>
                  I accept the Terms of Use & Privacy Policy
                </CheckboxLabel>
              </Checkbox>
            </VStack>
            <VStack className="w-full my-7" space="lg">
              <Button
                className="w-full rounded-lg"
                onPress={handleSubmit}
                style={styles.button}
              >
                <ButtonText className="font-medium">Sign up</ButtonText>
              </Button>
              {/* <Button
                variant="outline"
                action="secondary"
                className="w-full gap-1"
                onPress={() => {}}>
                <ButtonText className="font-medium">
                  Continue with Google
                </ButtonText>
                <ButtonIcon as={GoogleIcon} />
              </Button> */}
            </VStack>
            {/* <HStack className="self-center" space="sm">
              <Text size="md">Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                <LinkText
                  className="font-medium text-primary-700 group-hover/link:text-primary-600 group-hover/pressed:text-primary-700"
                  size="md">
                  Login
                </LinkText>
              </TouchableOpacity>
            </HStack> */}
          </VStack>
        </VStack>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF6700",
  },
  text: {
    color: "#FF8C42",
  },
});
export const SignUp = () => {
  return (
    <AuthLayout>
      <SignUpWithLeftBackground />
    </AuthLayout>
  );
};
