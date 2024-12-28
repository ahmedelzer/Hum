import React, { useContext, useState } from "react";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { LinkText } from "@/components/ui/link";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import {
  DevSettings,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { AlertTriangle, CheckIcon } from "lucide-react-native";
import { GoogleIcon } from "./assets/icons/google";
import { Pressable } from "@/components/ui/pressable";
import { useNavigation } from "@react-navigation/native";
import { AuthLayout } from "../layout";
import { Image } from "@/components/ui";
import { loginFormSchema } from "./loginSchema";
import schemaActions from "./LoginSchemaActions.json";
import FormContainer from "@/src/components/form-container/FormContainer";
import { onApply } from "@/src/components/form-container/OnApplay";
import { Controller, useForm } from "react-hook-form";
import { saveSecureValue } from "../../../store/zustandStore";
import {
  CloseIcon,
  HelpCircleIcon,
  Icon,
  ToastDescription,
} from "../../../../components/ui";
import { LocalizationContext } from "../../../../context/LocalizationContext";
import { SetReoute } from "../../../../request";
import { useAuth } from "../../../../context/auth";
import { jwtDecode } from "jwt-decode";

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

const LoginWithLeftBackground = () => {
  const { localization } = useContext(LocalizationContext);
  const { user, setUser } = useAuth();

  const postAction =
    ACTION_SCHEMA &&
    ACTION_SCHEMA.find(
      (action) => action.dashboardFormActionMethodType === "Post"
    );
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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    SetReoute(loginFormSchema.projectProxyRoute);
    const postAction =
      schemaActions &&
      schemaActions.find(
        (action) => action.dashboardFormActionMethodType === "Post"
      );
    // setLoading(true);
    const apply = await onApply(
      data,
      "",
      true,
      postAction,
      loginFormSchema.projectProxyRoute
    );
    console.log("====================================");
    console.log(apply);
    console.log("====================================");
    if (apply && apply.success === true) {
      try {
        const decodedToken = jwtDecode(apply.data.token);
        console.log("Decoded Token:", decodedToken);
      } catch (error) {
        console.error("Failed to decode token:", error.message);
      }
      // const expiresInSeconds = decodedToken.exp;
      // const expirationDate = new Date(expiresInSeconds * 1000);

      // if (formJson.rememberMe) {
      //   Cookies.set("user", apply.data.token, { expires: expirationDate });
      // } else {
      //   Cookies.set("user", apply.data.token);
      // }
      // const user = {
      //   avatarUrl:
      //     "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
      //   ...decodedToken,
      // };
      // setUser(user);
      // await saveSecureValue("token", apply.data.token);
      // DevSettings.reload();
    } else if (!apply.success) {
      // setResult(apply);
      // notify(apply.message, "error", 2000);
    }
    // setLoading(false);
  };

  return (
    <VStack className="max-w-[440px] w-full h-full" space="md">
      <VStack className="items-center" space="md">
        <Image
          alt="login-logo"
          style={{
            objectFit: "contain",
            // width: "100%",
          }}
          source={require("../../../../assets/display/logo.jpeg")}
        />
        <VStack>
          <Heading className="text-center text-primary-custom" size="3xl">
            {localization.Login.headTitle}
          </Heading>
          <Text className="">{localization.Login.headDescription}</Text>
        </VStack>
      </VStack>
      <VStack className="w-full">
        <VStack space="xl" className="w-full">
          <FormContainer
            tableSchema={loginFormSchema}
            control={control}
            errorResult={errors}
            row={{
              username: "admin",
              password: "123321123",
            }}
          />

          <HStack className="w-full justify-between ">
            {/* <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Checkbox
                  size="sm"
                  value="Remember me"
                  isChecked={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  aria-label="Remember me"
                >
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel>Remember me</CheckboxLabel>
                </Checkbox>
              )}
              name="rememberme"
            /> */}
            {/* <Checkbox
              size="sm"
              value="Remember me"
              // isChecked={value}
              // onBlur={onBlur}
              // onChange={onChange}
              aria-label="Remember me"
            >
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Remember me</CheckboxLabel>
            </Checkbox> */}

            <TouchableOpacity
              onPress={() => navigation.navigate("ForgetPassword" as never)}
            >
              <LinkText className="font-medium text-sm text-primary">
                {localization.Login.forgotPassword}
              </LinkText>
            </TouchableOpacity>
          </HStack>
        </VStack>
        <VStack className="w-full my-7 " space="lg">
          <Button
            className="w-full rounded-lg bg-accent"
            // style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <ButtonText className="font-medium">
              {localization.Login.loginButton}
            </ButtonText>
          </Button>
          <Button className="w-full rounded-lg">
            <ButtonText className="font-medium">
              {localization.Login.loginGustButton}
            </ButtonText>
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
          <Text size="md">{localization.Login.doNotHaveAccount}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp" as never)}
          >
            <LinkText
              className="font-medium text-primary-700 group-hover/link:text-primary-600  group-hover/pressed:text-primary-700"
              size="md"
            >
              {localization.Login.signUp}
            </LinkText>
          </TouchableOpacity>
        </HStack>
      </VStack>
    </VStack>
  );
};

function Example() {
  const toast = useToast();
  const [toastId, setToastId] = React.useState(0);
  const handleToast = () => {
    if (!toast.isActive(toastId)) {
      showNewToast();
    }
  };
  const showNewToast = () => {
    const newId = Math.random();
    setToastId(newId);
    toast.show({
      id: newId,
      placement: "top",
      duration: 3000,
      render: ({ id }) => {
        const uniqueToastId = "toast-" + id;
        return (
          <Toast
            action="error"
            variant="outline"
            nativeID={uniqueToastId}
            className="p-4 gap-6 border-error-500 w-full shadow-hard-5 max-w-[443px] flex-row justify-between"
          >
            <HStack space="md">
              <Icon as={HelpCircleIcon} className="stroke-error-500 mt-0.5" />
              <VStack space="xs">
                <ToastTitle className="font-semibold text-error-500">
                  Error!
                </ToastTitle>
                <ToastDescription size="sm">
                  Something went wrong.
                </ToastDescription>
              </VStack>
            </HStack>
            <HStack className="min-[450px]:gap-3 gap-1">
              <Button variant="link" size="sm" className="px-3.5 self-center">
                <ButtonText>Retry</ButtonText>
              </Button>
              <Pressable onPress={() => toast.close(id)}>
                <Icon as={CloseIcon} />
              </Pressable>
            </HStack>
          </Toast>
        );
      },
    });
  };
  return (
    <Button onPress={handleToast}>
      <ButtonText>Press Me</ButtonText>
    </Button>
  );
}

export const SignIn = () => {
  return (
    <AuthLayout>
      {/* <Example /> */}
      <LoginWithLeftBackground />
    </AuthLayout>
  );
};
