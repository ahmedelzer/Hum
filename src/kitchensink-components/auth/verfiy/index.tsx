import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import { useNavigation } from "@react-navigation/native";
import { onApply } from "../../../components/form-container/OnApplay";
import { buildApiUrl } from "../../../../components/hooks/APIsFunctions/BuildApiUrl";
import VerifySchema from "../../../Schemas/LoginSchema/VerifySchema.json";
import GoBackHeader from "../../../components/header/GoBackHeader";

const VerifyScreen = ({ route }) => {
  const [otpCode, setOtpCode] = useState("");
  const [disable, setDisable] = useState(false);
  const [result, setResult] = useState(null);
  const navigation = useNavigation();
  const { email } = route.params || {}; // if passed from previous screen
  const handleOTPSubmit = async () => {
    if (otpCode.length === 6) {
      // Replace with actual API call or validation logic
      console.log("Submitted OTP: ", otpCode);
      Alert.alert("OTP Verified!", `Code: ${otpCode}`);
      const verificationID = {
        verificationID: route.params.verificationID,
      };
      setDisable(true);
      const dataSourceAPI = (query) => {
        return buildApiUrl(query, {
          ...{ CodeNumber: otpCode },
          ...verificationID,
        });
      };
      setDisable(true);
      try {
        const request = await onApply(
          {},
          null,
          true,
          VerifySchema,
          "",
          false,
          dataSourceAPI(VerifySchema)
        );
        setResult(request);
        if (request && request.success === true) {
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
      Alert.alert("Invalid OTP", "Please enter the full 4-digit code.");
    }
  };

  return (
    <View style={styles.container}>
      <GoBackHeader
        subTitle={""}
        title={""}
        specialAction={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.title}>Verify Your Account</Text>
      <Text style={styles.subtitle}>
        Please enter the 4-digit code sent to {email || "your email"}
      </Text>
      <OTPTextInput
        inputCount={6}
        handleTextChange={(val) => setOtpCode(val)}
        tintColor="#6200ee"
        offTintColor="#ccc"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleOTPSubmit}
        disabled={disable}
      >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerifyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
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
