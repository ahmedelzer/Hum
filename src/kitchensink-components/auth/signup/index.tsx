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
import PersonalInfo from "../../../Schemas/PersonalInfo.json";
import { AuthLayout } from "../layout";

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
  const { localization } = useContext(LocalizationContext);

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
  console.log(localization.sighUp);
  return (
    <VStack className="max-w-[440px] w-full mt-2" space="md">
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
                <Heading className="text-center text-primary-custom" size="md">
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
            row={{}}
            control={control}
            errorResult={{}}
          />

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
            // isChecked={values.rememberme}
            // onChange={(value) => setFieldValue("rememberme", value)}
            aria-label="Remember me"
          >
            <CheckboxIndicator>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel>{localization.sighUp.acceptPrivacy}</CheckboxLabel>
          </Checkbox>
        </VStack>
        <VStack className="w-full my-7" space="lg">
          <Button
            className="w-full rounded-lg bg-accent"
            onPress={handleSubmit(onSubmit)}
          >
            <ButtonText className="font-medium">
              {localization.sighUp.sighUpButton}
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
  );
};

export const SignUp = () => {
  return (
    <AuthLayout>
      <SignUpWithLeftBackground />
    </AuthLayout>
  );
};
