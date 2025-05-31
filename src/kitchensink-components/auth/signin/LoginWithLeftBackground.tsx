import { Image } from "@/components/ui";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { LinkText } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import FormContainer from "@/src/components/form-container/FormContainer";
import { onApply } from "@/src/components/form-container/OnApply";
import { useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, TouchableOpacity } from "react-native";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  CheckIcon,
} from "../../../../components/ui";
import { useAuth } from "../../../../context/auth";
import { LocalizationContext } from "../../../../context/LocalizationContext";
import { SetReoute } from "../../../../request";
import loginFormSchema from "../../../Schemas/LoginSchema/LoginFormSchema.json";
import schemaActions from "../../../Schemas/LoginSchema/LoginFormSchemaActions.json";
import { saveSecureValue } from "../../../store/zustandStore";
import LoadingButton from "../../../utils/component/LoadingButton";
import RNRestart from "react-native-restart";
import { useDeviceInfo } from "../../../utils/component/useDeviceInfo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSelector } from "react-redux";
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

export const LoginWithLeftBackground = () => {
  const localization = useSelector((state) => state.localization.localization);
  const { os } = useDeviceInfo();

  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const DValues = {
    password: "123456",
    username: "testAhmed12",
    rememberme: false,
  };
  const postAction =
    ACTION_SCHEMA &&
    ACTION_SCHEMA.find(
      (action) => action.dashboardFormActionMethodType === "Post"
    );
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const toast = useToast();
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
  } = useForm({ defaultValues: DValues });

  const onSubmit = async (data: any) => {
    // Destructure to remove confirmPassword from the sent data
    const { rememberme, ...sanitizedData } = data;
    SetReoute(loginFormSchema.projectProxyRoute);
    const postAction =
      schemaActions &&
      schemaActions.find(
        (action) => action.dashboardFormActionMethodType === "Post"
      );
    setLoading(true);
    const apply = await onApply(
      sanitizedData,
      "",
      true,
      postAction,
      loginFormSchema.projectProxyRoute
    );

    if (apply && apply.success === true) {
      try {
        const decodedToken = jwtDecode(apply.data.token);
        const user = {
          avatarUrl:
            "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
          ...decodedToken,
        };
        // if (rememberme) {//!must set rememberme in saveSecureValue and when open app agin if not rememberme will be dle token
        await saveSecureValue("token", apply.data.token);
        await saveSecureValue("rememberMe", rememberme ? "true" : "false");
        // }
        setUser(user);

        // RNRestart.Restart();
        // DevSettings.reload();
      } catch (error) {
        console.error("Failed to decode token:", error.message);
      }
    } else if (!apply.success) {
      setResult(apply);
    }
    setLoading(false);
  };
  return (
    <VStack
      className={`max-w-[440px] w-full h-full ${
        os == "web" && "m-auto bg-card shadow-lg !h-fit px-6 py-3 rounded-lg"
      }`}
      space="md"
    >
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
          <Heading className="text-center text-accent" size="3xl">
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
            errorResult={result || errors}
            row={DValues}
          />

          <HStack className="w-full justify-between ">
            <Controller
              control={control}
              name="rememberme"
              render={({ field: { onChange, onBlur, value = false } }) => (
                <Checkbox
                  size="sm"
                  value="Remember me"
                  isChecked={value}
                  // onBlur={onBlur}
                  // onChange={(isChecked: boolean) => onChange(isChecked)} // <-- Explicitly set
                  onChange={(isCheckedOrEvent: any) => {
                    const isChecked =
                      typeof isCheckedOrEvent === "boolean"
                        ? isCheckedOrEvent
                        : isCheckedOrEvent?.nativeEvent?.checked;

                    onChange(isChecked);
                  }}
                  aria-label="Remember me"
                >
                  <CheckboxIndicator>
                    <CheckboxIcon
                      as={() => (
                        <AntDesign
                          name="check"
                          size={20}
                          className="text-body"
                        />
                      )}
                    />
                    {/* <CheckboxIcon as={CheckIcon} /> */}
                  </CheckboxIndicator>
                  <CheckboxLabel>{localization.Login.rememberme}</CheckboxLabel>
                </Checkbox>
              )}
            />

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ForgetPassword" as never, {
                  ...control._formValues,
                })
              }
            >
              <LinkText className="font-medium text-sm text-primary">
                {localization.Login.forgotPassword}
              </LinkText>
            </TouchableOpacity>
          </HStack>
        </VStack>
        <VStack className="w-full my-7 " space="lg">
          <LoadingButton
            buttonText={localization.Login.loginButton}
            loading={loading}
            onPress={handleSubmit(onSubmit)}
            className="w-full rounded-lg bg-accent"
          />
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
