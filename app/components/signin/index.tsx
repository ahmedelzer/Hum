import React, { useState } from "react";
import { Toast, ToastTitle, useToast } from "../ui/toast";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";
import { LinkText } from "../ui/link";

import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "../ui/checkbox";
import { Button, ButtonText, ButtonIcon } from "../ui/button";
import { Keyboard, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { AlertTriangle, CheckIcon } from "lucide-react-native";
import { GoogleIcon } from "./assets/icons/google";
import { Pressable } from "../ui/pressable";
import { useNavigation } from "@react-navigation/native";
import { AuthLayout } from "../layout";
import { Image } from "../ui";
import useToken from "../store/zustandStore";
import { loginFormSchema } from "./loginSchema";
import FormContainer from "../form-container/FormContainer";
import { onApply } from "../form-container/OnApplay";

const ACTION_SCHEMA = [
  {
    dashboardFormSchemaActionID: "46ac8869-4745-41c8-8839-d02dfe9999f0",
    dashboardFormActionMethodType: "Post",
    routeAdderss: "User/Login",
    body: "",
    returnPropertyName: "",
    dashboardFormSchemaActionQueryParams: [],
  },
];

const USERS = [
  {
    email: "Yusuf@gmail.com",
    password: "012012012",
  },
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

const loginYupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  rememberme: Yup.boolean().optional(),
});

const LoginWithLeftBackground = () => {
  const usernameField = loginFormSchema.dashboardFormSchemaParameters.find(
    (param) => param.parameterType === "username"
  );
  const passwordField = loginFormSchema.dashboardFormSchemaParameters.find(
    (param) => param.parameterType === "password"
  );

  const postAction =
    ACTION_SCHEMA &&
    ACTION_SCHEMA.find(
      (action) => action.dashboardFormActionMethodType === "Post"
    );

  const { setToken } = useToken();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleState = () => {
    setShowPassword((showState) => !showState);
  };

  const handleKeyPress = (handleSubmit: any) => {
    Keyboard.dismiss();
    handleSubmit();
  };

  const onSubmited = async (e: any) => {
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const apply = await onApply(
      formJson,
      "",
      true,
      postAction,
      loginFormSchema.projectProxyRoute
    );
  };
  return (
    <Formik
      initialValues={{ email: "", password: "", rememberme: false }}
      validationSchema={loginYupSchema}
      onSubmit={(values, { resetForm }) => {
        setToken("awdawdadw123asd");
        const user = USERS.find((element) => element.email === values.email);
        if (user) {
          if (user.password !== values.password) {
            toast.show({
              placement: "bottom",
              render: ({ id }) => (
                <Toast nativeID={id} variant="solid" action="error">
                  <ToastTitle>Password was incorrect</ToastTitle>
                </Toast>
              ),
            });
          } else {
            toast.show({
              placement: "bottom",
              render: ({ id }) => (
                <Toast nativeID={id} variant="solid" action="success">
                  <ToastTitle>Logged in successfully!</ToastTitle>
                </Toast>
              ),
            });
            resetForm();
          }
        } else {
          toast.show({
            placement: "bottom",
            render: ({ id }) => (
              <Toast nativeID={id} variant="solid" action="error">
                <ToastTitle>Email ID not found</ToastTitle>
              </Toast>
            ),
          });
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
        <VStack className="max-w-[440px] w-full h-full" space="md">
          <VStack className="items-center" space="md">
            <Image
              alt="login-logo"
              style={{
                objectFit: "contain",
              }}
              source={require("../../assets/display/logo.jpeg")}
            />
            <VStack>
              <Heading className="text-center" size="3xl">
                Log in
              </Heading>
              <Text>Login to start using gluestack</Text>
            </VStack>
          </VStack>
          <VStack className="w-full">
            <VStack space="xl" className="w-full">
              <FormContainer tableSchema={loginFormSchema} />

              <HStack className="w-full justify-between ">
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
                  <CheckboxLabel>Remember me</CheckboxLabel>
                </Checkbox>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ForgetPassword" as never)}
                >
                  <LinkText className="font-medium text-sm text-primary-700 group-hover/link:text-primary-600">
                    Forgot Password?
                  </LinkText>
                </TouchableOpacity>
              </HStack>
            </VStack>
            <VStack className="w-full my-7 " space="lg">
              <Button className="w-full rounded-full" onPress={onSubmited}>
                <ButtonText className="font-medium">Log in</ButtonText>
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
            <HStack className="self-center" space="sm">
              <Text size="md">Don't have an account?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignUp" as never)}
              >
                <LinkText
                  className="font-medium text-primary-700 group-hover/link:text-primary-600  group-hover/pressed:text-primary-700"
                  size="md"
                >
                  Sign up
                </LinkText>
              </TouchableOpacity>
            </HStack>
          </VStack>
        </VStack>
      )}
    </Formik>
  );
};

export const SignIn = () => {
  return (
    <AuthLayout>
      <LoginWithLeftBackground />
    </AuthLayout>
  );
};
