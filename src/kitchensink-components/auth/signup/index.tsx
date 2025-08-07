import { Image } from "@/components/ui";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { ArrowLeftIcon, Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard, Linking, Platform, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import FormContainer from "../../../components/form-container/FormContainer";
import { onApply } from "../../../components/form-container/OnApply";
import SighupSchema from "../../../Schemas/LoginSchema/SighupSchema.json";
import VerifySchemaAction from "../../../Schemas/LoginSchema/VerifySchemaAction.json";
import PersonalInfo from "../../../Schemas/PersonalInfo.json";
import { CollapsibleSection } from "../../../utils/component/Collapsible";
import LoadingButton from "../../../utils/component/LoadingButton";
import { useDeviceInfo } from "../../../utils/component/useDeviceInfo";
import { AuthLayout } from "../layout";
import { getField } from "../../../utils/operation/getField";
import { useErrorToast } from "../../../components/form-container/ShowErrorToast";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "../../../../components/ui";
const SignUpWithLeftBackground = () => {
  const { showErrorToast } = useErrorToast();
  const localization = useSelector((state) => state.localization.localization);
  const { os } = useDeviceInfo();
  const [isAccepted, setIsAccepted] = useState(false);
  const [disable, setDisable] = useState(false);
  const [result, setResult] = useState(null);
  const DValues = {};
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { defaultValues = DValues, errors },
    watch,
    clearErrors,
  } = useForm({
    defaultValues: DValues,
  });
  const onSubmit = async (data: any) => {
    if (!isAccepted) {
      console.log("show toast");

      showErrorToast(
        localization.sighUp.privacyToast.title,
        localization.sighUp.privacyToast.des
      );
      return;
    }

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
        const passwordField = getField(
          PersonalInfo.dashboardFormSchemaParameters,
          "confirmPassword"
        );
        const { [passwordField]: removedPassword, ...dataWithoutPassword } =
          data;

        navigation.navigate("Verify", {
          ...dataWithoutPassword,
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
  const allParams = PersonalInfo.dashboardFormSchemaParameters || [];

  const loginInfoSchema = {
    ...PersonalInfo,
    dashboardFormSchemaParameters: allParams.slice(0, 2),
  };

  const personalInfoSchema = {
    ...PersonalInfo,
    dashboardFormSchemaParameters: allParams.slice(2),
  };
  // showErrorToast("Login Failed", "Username or password is incorrect.");

  return (
    <VStack
      className={`max-w-[440px] w-full mt-2 ${
        os == "web" && "m-auto bg-body shadow-lg !h-fit px-6 py-3 rounded-lg"
      }`}
      space="md"
    >
      <VStack className="md:items-center" space="md">
        <Pressable
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
          <CollapsibleSection
            title={
              personalInfoSchema.dashboardFormSchemaInfoDTOView.schemaHeader
            }
            icon={null}
            setheader={true}
            defaultExpandedSection={true}
          >
            <FormContainer
              tableSchema={loginInfoSchema}
              row={DValues}
              control={control}
              errorResult={result || errors}
              clearErrors={clearErrors}
            />
          </CollapsibleSection>

          <CollapsibleSection
            title={
              personalInfoSchema.dashboardFormSchemaInfoDTOView.addingHeader
            }
            icon={null}
            setheader={true}
            defaultExpandedSection={true}
          >
            <FormContainer
              tableSchema={personalInfoSchema}
              row={DValues}
              control={control}
              errorResult={result || errors}
              clearErrors={clearErrors}
            />
          </CollapsibleSection>
          <Checkbox
            size="sm"
            value="accept Privacy"
            aria-label="accept Privacy"
            isChecked={isAccepted} // Controlled checked state
            onChange={(checked) => setIsAccepted(checked === true)}
            // value={isAccepted}
            // onChange={setIsAccepted}
            // onCheckedChange={setIsAccepted}
          >
            <CheckboxIndicator>
              <CheckboxIcon
                as={() => (
                  <AntDesign name="check" size={20} className="text-body" />
                )}
              />
            </CheckboxIndicator>

            <CheckboxLabel className="flex-row flex-wrap items-center">
              {localization.sighUp.acceptPrivacy.split("{link}")[0]}
              <Pressable
                className="text-blue-600 underline"
                onPress={() => {
                  const url = localization.sighUp.privacyUrl; // Replace with your actual URL
                  Linking.openURL(url).catch((err) =>
                    console.error("Failed to open URL:", err)
                  );
                }}
              >
                {localization.sighUp.acceptPrivacyLinkText || "Privacy Policy"}
              </Pressable>
              {localization.sighUp.acceptPrivacy.split("{link}")[1]}
            </CheckboxLabel>
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
