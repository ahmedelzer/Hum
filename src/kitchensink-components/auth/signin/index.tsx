import React from "react";
import { AuthLayout } from "../layout";
import { Text, View } from "react-native";
import { LoginWithLeftBackground } from "./LoginWithLeftBackground";

export const SignIn = () => {
  return (
    <AuthLayout>
      <LoginWithLeftBackground />
    </AuthLayout>
  );
};
// export default SignIn;
