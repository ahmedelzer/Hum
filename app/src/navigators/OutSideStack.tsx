import { createStackNavigator } from "@react-navigation/stack";
import { SignIn } from "../kitchensink-components/auth/signin";
import { SignUp } from "../kitchensink-components/auth/signup";
import { ForgotPassword } from "../kitchensink-components/auth/forgot-password";
// import SignIn from "../screens/auth/SignIn";
// import ResetPassword from "../screens/auth/ResetPassword";
// import NoDataUrl from "../components/NoDataUrl/NoDataUrl";
// import ChangeEvent from "../components/ChangeEvent/ChangeEvent";
// import Home from "./HomeStack";
// import ForgetPassword from "../screens/ForgetPassword";
// import Otp from "../screens/Otp";
// import UpdatePassword from "../screens/UpdatePassowrd";

const Stack = createStackNavigator();

export default function OutsideStack() {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        animationEnabled: true,
        gestureEnabled: true,
        headerShown: false,
      }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgetPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}