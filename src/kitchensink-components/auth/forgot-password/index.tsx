import React, { useContext, useState } from "react";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { ArrowLeftIcon, Icon } from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";
import { Keyboard, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { AlertTriangle } from "lucide-react-native";
import { Pressable } from "@/components/ui/pressable";
import { useNavigation } from "@react-navigation/native";
import { AuthLayout } from "../layout";
import FormContainer from "../../../components/form-container/FormContainer";
import ForgetSchema from "../../../Schemas/ForgetSchema/ForgetSchema.json";
import { useForm } from "react-hook-form";
import { LocalizationContext } from "../../../../context/LocalizationContext";

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPasswordScreen = () => {
  const { localization } = useContext(LocalizationContext);

  const toast = useToast();
  const navigation = useNavigation();

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
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    // await saveSecureValue("token", "static");
    // DevSettings.reload();
  };
  return (
    <VStack className="max-w-[440px] w-full  h-full mt-2" space="md">
      <VStack className="md:items-center" space="md">
        <Pressable
          className="flex-1"
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
        <VStack>
          <Heading className="md:text-center text-primary-custom" size="3xl">
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
        control={control}
        errorResult={{}}
      />
      <VStack space="xl" className="w-full my-7">
        <Button
          className="w-full rounded-lg bg-accent"
          onPress={handleSubmit(onSubmit)}
        >
          <ButtonText className="font-medium">
            {localization.forgotPassword.sighUpButton}
          </ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
};

export const ForgotPassword = () => {
  return (
    <AuthLayout>
      <ForgotPasswordScreen />
    </AuthLayout>
  );
};
