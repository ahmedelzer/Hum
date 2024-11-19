import React, { useState } from "react";
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

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPasswordScreen = () => {
  const toast = useToast();
  const navigation = useNavigation();

  const handleKeyPress = (handleSubmit: any) => {
    Keyboard.dismiss();
    handleSubmit();
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={forgotPasswordSchema}
      onSubmit={(values, { resetForm }) => {
        toast.show({
          placement: "bottom",
          render: ({ id }) => (
            <Toast nativeID={id} variant="solid" action="success">
              <ToastTitle>Link Sent Successfully</ToastTitle>
            </Toast>
          ),
        });
        resetForm();
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <VStack className="max-w-[440px] w-full  h-full" space="md">
          <VStack className="md:items-center" space="md">
            <Pressable
              className="flex-1"
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon
                as={ArrowLeftIcon}
                className="md:hidden stroke-background-800"
                size="xl"
              />
            </Pressable>
            <VStack>
              <Heading className="md:text-center" size="3xl">
                Forgot Password?
              </Heading>
              <Text className="text-sm">
                Enter email ID associated with your account.
              </Text>
            </VStack>
          </VStack>

          <VStack space="xl" className="w-full ">
            <FormControl isInvalid={!!errors.email && touched.email}>
              <FormControlLabel>
                <FormControlLabelText>Email</FormControlLabelText>
              </FormControlLabel>
              <Input className="rounded-full">
                <InputField
                  placeholder="Enter email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  onSubmitEditing={() => handleKeyPress(handleSubmit)}
                  returnKeyType="done"
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertTriangle} />
                <FormControlErrorText>{errors.email}</FormControlErrorText>
              </FormControlError>
            </FormControl>
            <Button className="w-full rounded-full" onPress={handleSubmit}>
              <ButtonText className="font-medium">Send Link</ButtonText>
            </Button>
          </VStack>
        </VStack>
      )}
    </Formik>
  );
};

export const ForgotPassword = () => {
  return (
    <AuthLayout>
      <ForgotPasswordScreen />
    </AuthLayout>
  );
};
