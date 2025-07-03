import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import { useNavigation } from "@react-navigation/native";
import { onApply } from "../../../components/form-container/OnApply";
import ResendSchemaAction from "../../../Schemas/LoginSchema/ResendSchemaAction.json";
import VerifySchemaPrams from "../../../Schemas/LoginSchema/VerifySchema.json";
import GoBackHeader from "../../../components/header/GoBackHeader";
import { handleSubmitWithCallback } from "../../../utils/operation/handleSubmitWithCallback";
import { theme } from "../../../Theme";
import { useDeviceInfo } from "../../../utils/component/useDeviceInfo";
import { VStack } from "../../../../components/ui";
import { AuthLayout } from "../layout";
import { getField } from "../../../utils/operation/getField";
import PersonalInfo from "../../../Schemas/PersonalInfo.json";
import { useSelector } from "react-redux";
import { useErrorToast } from "../../../components/form-container/ShowErrorToast";

const VerifyScreen = ({ route }) => {
  const [otpCode, setOtpCode] = useState("");
  const [disable, setDisable] = useState(false);
  const [result, setResult] = useState(null);
  const localization = useSelector((state) => state.localization.localization);
  const navigation = useNavigation();
  const { showErrorToast } = useErrorToast();
  const phoneNumberField = getField(
    PersonalInfo.dashboardFormSchemaParameters,
    "phoneNumber"
  );
  const { [phoneNumberField]: phoneNumber, VerifySchemaAction } =
    route.params || {}; // if passed from previous screen
  const { os } = useDeviceInfo();

  const handleOTPSubmit = async () => {
    console.log("begin");
    console.log(otpCode);

    if (otpCode.length === 6) {
      //setDisable(true);
      const getAction =
        VerifySchemaAction &&
        VerifySchemaAction.find(
          (action) => action.dashboardFormActionMethodType === "Get"
        );

      const constants = {
        ...{ [VerifySchemaPrams.idField]: otpCode },
        ...route.params,
      };
      setDisable(true);

      try {
        const request = await onApply(
          {},
          null,
          true,
          getAction,
          "",
          false,
          constants
        );
        setResult(request);

        if (request.data === true && request.success === true) {
          navigation.navigate("SignIn"); // or any other screen
        }
      } catch (error) {
        console.error("API call failed:", error);
        // Optionally, handle the error here (e.g., show a notification)
      } finally {
        // Enable the button after the API call
        setDisable(false);
      }
    } else {
      showErrorToast(
        localization.verify.otpToast.title,
        localization.verify.otpToast.des
      );
    }
  };
  const handleResend = async () => {
    const postAction =
      ResendSchemaAction &&
      ResendSchemaAction.find(
        (action) => action.dashboardFormActionMethodType === "Post"
      );
    await handleSubmitWithCallback({
      data: { ...route.params },
      setDisable,
      action: postAction,
      proxyRoute: VerifySchemaPrams.projectProxyRoute,
      setReq: setResult,
      isNew: true,
      onSuccess: (resultData) => {
        // navigation.navigate("Verify", {
        //   ...data,
        //   ...resultData,
        //   VerifySchema: VerifySchema,
        // });
      },
    });
  };

  return (
    <AuthLayout>
      <VStack
        className={`max-w-[440px] w-full mt-2 ${
          os == "web" && "m-auto bg-body shadow-lg !h-fit px-6 py-3 rounded-lg"
        }`}
        space="md"
      >
        <View style={styles.container}>
          <GoBackHeader
            subTitle={""}
            title={""}
            specialAction={() => {
              navigation.goBack();
            }}
          />
          <Text style={styles.title}>{localization.verify.headTitle}</Text>
          <Text style={styles.subtitle}>
            {localization.verify.headDescription} {phoneNumber}
          </Text>

          <OTPTextInput
            inputCount={6}
            handleTextChange={(val) => setOtpCode(val)}
            tintColor="#6200ee"
            offTintColor="#ccc"
          />
          <Text
            style={styles.title}
            onPress={async () => {
              await handleResend();
            }}
            className="text-[#6200ee] mt-2"
          >
            {localization.verify.resend}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              await handleOTPSubmit();
            }}
            disabled={disable}
          >
            <Text style={styles.buttonText}>
              {localization.verify.VerifyButton}
            </Text>
          </TouchableOpacity>
        </View>
      </VStack>
    </AuthLayout>
  );
};

export default VerifyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: theme.body,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 12,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginBottom: 32,
  },
  otpContainer: {
    width: "80%",
    height: 80,
    alignSelf: "center",
  },
  underlineStyleBase: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 20,
    color: "#000",
  },
  underlineStyleHighLighted: {
    borderColor: "#6200ee",
  },
  button: {
    marginTop: 40,
    backgroundColor: "#6200ee",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
