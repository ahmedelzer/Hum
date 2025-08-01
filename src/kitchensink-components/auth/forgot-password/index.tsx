import { Heading } from "@/components/ui/heading";
import { ArrowLeftIcon, Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard, Platform } from "react-native";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import FormContainer from "../../../components/form-container/FormContainer";
import ForgetSchema from "../../../Schemas/ForgetSchema/ForgetSchema.json";
import ForgetSchemaActions from "../../../Schemas/ForgetSchema/ForgetSchemaActions.json";
import VerifySchema from "../../../Schemas/ForgetSchema/VerifySchema.json";
import LoadingButton from "../../../utils/component/LoadingButton";
import { useDeviceInfo } from "../../../utils/component/useDeviceInfo";
import { handleSubmitWithCallback } from "../../../utils/operation/handleSubmitWithCallback";
import { AuthLayout } from "../layout";

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPasswordScreen = ({ route }) => {
  const localization = useSelector((state) => state.localization.localization);
  const { os } = useDeviceInfo();
  const [reqError, setReqError] = useState(null);
  const [disable, setDisable] = useState(null);
  const navigation = useNavigation();
  const DValues = { messageType: "0", username: "testAhmed12" };
  const handleKeyPress = (handleSubmit: any) => {
    Keyboard.dismiss();
    handleSubmit();
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({ defaultValues: route.params });

  const onSubmit = async (data: any) => {
    const body = { ...control._formValues, ...data };
    const postAction =
      ForgetSchemaActions &&
      ForgetSchemaActions.find(
        (action) => action.dashboardFormActionMethodType === "Post"
      );
    await handleSubmitWithCallback({
      data: body,
      setDisable,
      action: postAction,
      proxyRoute: ForgetSchema.projectProxyRoute,
      setReq: setReqError,
      onSuccess: (resultData) => {
        navigation.navigate("Verify", {
          ...data,
          ...resultData,
          VerifySchema: VerifySchema,
        });
      },
    });
  };
  return (
    <VStack
      className={`max-w-[440px] w-full  h-full mt-2 ${
        os == "web" && "m-auto bg-body shadow-lg !h-fit px-6 py-3 rounded-lg"
      }`}
      space="md"
    >
      <VStack className="md:items-center" space="md">
        <Pressable
          className="flex-1"
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              if (Platform.OS === "web") {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "SignIn" }],
                });
              } else {
                navigation.navigate("SignIn");
              }
            }
          }}
        >
          <Icon as={ArrowLeftIcon} className="text-text" size="xl" />
        </Pressable>
        <VStack>
          <Heading className="md:text-center text-accent" size="3xl">
            {localization.forgotPassword.headTitle}
          </Heading>
          <Text className="text-sm">
            {localization.forgotPassword.headDescription}
          </Text>
        </VStack>
      </VStack>
      <FormContainer
        tableSchema={ForgetSchema}
        row={{}}
        setValue={setValue}
        control={control}
        errorResult={errors || reqError}
        clearErrors={clearErrors}
      />
      <VStack space="xl" className="w-full my-7">
        <LoadingButton
          buttonText={localization.forgotPassword.sighUpButton}
          loading={disable}
          onPress={async () => {
            await handleSubmit(onSubmit);
          }}
          className="w-full rounded-lg"
        />
      </VStack>
    </VStack>
  );
};

export const ForgotPassword = ({ route }) => {
  return (
    <AuthLayout>
      <ForgotPasswordScreen route={route} />
    </AuthLayout>
  );
};
