// import React, { useState } from "react";
// import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
// import { HStack } from "@/components/ui/hstack";
// import { VStack } from "@/components/ui/vstack";
// import { Heading } from "@/components/ui/heading";
// import { Text } from "@/components/ui/text";
// import { LinkText } from "@/components/ui/link";

// import {
//   Checkbox,
//   CheckboxIcon,
//   CheckboxIndicator,
//   CheckboxLabel,
// } from "@/components/ui/checkbox";
// import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
// import { Keyboard, StyleSheet, TouchableOpacity } from "react-native";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import { AlertTriangle, CheckIcon } from "lucide-react-native";
// import { GoogleIcon } from "./assets/icons/google";
// import { Pressable } from "@/components/ui/pressable";
// import { useNavigation } from "@react-navigation/native";
// import { AuthLayout } from "../layout";
// import { Image } from "@/components/ui";
// import useToken from "@/src/store/zustandStore";
// import { loginFormSchema } from "./loginSchema";
// import FormContainer from "@/src/components/form-container/FormContainer";
// import { onApply } from "@/src/components/form-container/OnApplay";

// const ACTION_SCHEMA = [
//   {
//     dashboardFormSchemaActionID: "46ac8869-4745-41c8-8839-d02dfe9999f0",
//     dashboardFormActionMethodType: "Post",
//     routeAdderss: "User/Login",
//     body: "",
//     returnPropertyName: "",
//     dashboardFormSchemaActionQueryParams: [],
//   },
// ];

// const USERS = [
//   {
//     email: "Yusuf@gmail.com",
//     password: "012012012",
//   },
//   {
//     email: "gabrial@gmail.com",
//     password: "Gabrial@123",
//   },
//   {
//     email: "tom@gmail.com",
//     password: "Tom@123",
//   },
//   {
//     email: "thomas@gmail.com",
//     password: "Thomas@1234",
//   },
// ];

// const loginYupSchema = Yup.object().shape({
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string().required("Password is required"),
//   rememberme: Yup.boolean().optional(),
// });

// const LoginWithLeftBackground = () => {
//   const usernameField = loginFormSchema.dashboardFormSchemaParameters.find(
//     (param) => param.parameterType === "username"
//   );
//   const passwordField = loginFormSchema.dashboardFormSchemaParameters.find(
//     (param) => param.parameterType === "password"
//   );

//   const postAction =
//     ACTION_SCHEMA &&
//     ACTION_SCHEMA.find(
//       (action) => action.dashboardFormActionMethodType === "Post"
//     );

//   const { setToken } = useToken();
//   const toast = useToast();
//   const [showPassword, setShowPassword] = useState(false);
//   const navigation = useNavigation();

//   const handleState = () => {
//     setShowPassword((showState) => !showState);
//   };

//   const handleKeyPress = (handleSubmit: any) => {
//     Keyboard.dismiss();
//     handleSubmit();
//   };

//   const onSubmited = async (e: any) => {
//     const form = e.target;
//     const formData = new FormData(form);
//     const formJson = Object.fromEntries(formData.entries());
//     const apply = await onApply(
//       formJson,
//       "",
//       true,
//       postAction,
//       loginFormSchema.projectProxyRoute
//     );
//     console.log("====================================");
//     console.log(formJson);
//     console.log("====================================");
//   };
//   return (
//     <Formik
//       initialValues={{ email: "", password: "", rememberme: false }}
//       validationSchema={loginYupSchema}
//       onSubmit={(values, { resetForm }) => {
//         setToken("awdawdadw123asd");
//         const user = USERS.find((element) => element.email === values.email);
//         if (user) {
//           if (user.password !== values.password) {
//             toast.show({
//               placement: "bottom",
//               render: ({ id }) => (
//                 <Toast nativeID={id} variant="solid" action="error">
//                   <ToastTitle>Password was incorrect</ToastTitle>
//                 </Toast>
//               ),
//             });
//           } else {
//             toast.show({
//               placement: "bottom",
//               render: ({ id }) => (
//                 <Toast nativeID={id} variant="solid" action="success">
//                   <ToastTitle>Logged in successfully!</ToastTitle>
//                 </Toast>
//               ),
//             });
//             resetForm();
//           }
//         } else {
//           toast.show({
//             placement: "bottom",
//             render: ({ id }) => (
//               <Toast nativeID={id} variant="solid" action="error">
//                 <ToastTitle>Email ID not found</ToastTitle>
//               </Toast>
//             ),
//           });
//         }
//       }}
//     >
//       {({
//         handleChange,
//         handleBlur,
//         handleSubmit,
//         values,
//         errors,
//         touched,
//         setFieldValue,
//       }) => (
//         <VStack className="max-w-[440px] w-full h-full" space="md">
//           <VStack className="items-center" space="md">
//             <Image
//               alt="login-logo"
//               style={{
//                 objectFit: "contain",
//                 // width: "100%",
//               }}
//               source={require("../../../../assets/display/logo.jpeg")}
//             />
//             <VStack>
//               <Heading className="text-center" style={styles.text} size="3xl">
//                 Hi Welcome Back ! 👋
//               </Heading>
//               <Text className="">Hello again you have been missed!</Text>
//             </VStack>
//           </VStack>
//           <VStack className="w-full">
//             <VStack space="xl" className="w-full">
//               <FormContainer tableSchema={loginFormSchema} />

//               <HStack className="w-full justify-between ">
//                 <Checkbox
//                   size="sm"
//                   value="Remember me"
//                   isChecked={values.rememberme}
//                   onChange={(value) => setFieldValue("rememberme", value)}
//                   aria-label="Remember me"
//                 >
//                   <CheckboxIndicator>
//                     <CheckboxIcon as={CheckIcon} />
//                   </CheckboxIndicator>
//                   <CheckboxLabel>Remember me</CheckboxLabel>
//                 </Checkbox>
//                 <TouchableOpacity
//                   onPress={() => navigation.navigate("ForgetPassword" as never)}
//                 >
//                   <LinkText className="font-medium text-sm text-primary">
//                     Forgot Password?
//                   </LinkText>
//                 </TouchableOpacity>
//               </HStack>
//             </VStack>
//             <VStack className="w-full my-7 " space="lg">
//               <Button
//                 className="w-full rounded-lg"
//                 style={styles.button}
//                 onPress={onSubmited}
//               >
//                 <ButtonText className="font-medium ">Login</ButtonText>
//               </Button>
//               <Button className="w-full rounded-lg" onPress={onSubmited}>
//                 <ButtonText className="font-medium ">Login as gust</ButtonText>
//               </Button>
//               {/* <Button
//                 variant="outline"
//                 action="secondary"
//                 className="w-full gap-1"
//                 onPress={() => {}}>
//                 <ButtonText className="font-medium">
//                   Continue with Google
//                 </ButtonText>
//                 <ButtonIcon as={GoogleIcon} />
//               </Button> */}
//             </VStack>
//             <HStack className="self-center" space="sm">
//               <Text size="md">Don't have an account?</Text>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate("SignUp" as never)}
//               >
//                 <LinkText
//                   className="font-medium text-primary-700 group-hover/link:text-primary-600  group-hover/pressed:text-primary-700"
//                   size="md"
//                 >
//                   Sign up
//                 </LinkText>
//               </TouchableOpacity>
//             </HStack>
//           </VStack>
//         </VStack>
//       )}
//     </Formik>
//   );
// };
// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: "#FF6700",
//   },
//   text: {
//     color: "#FF8C42",
//   },
// });
import React from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { AuthLayout } from "../layout";
import FormContainer from "../../../components/form-container/FormContainer";
import PersonalInfo from "../../../Schemas/PersonalInfo.json";

export default function LoginWithLeftBackground() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <View>
      {/* <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email && <Text>This field is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
        name="password"
      />
      {errors.password && <Text>This field is required.</Text>} */}
      <FormContainer tableSchema={PersonalInfo} control={control} />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
export const SignIn = () => {
  return (
    <AuthLayout>
      <LoginWithLeftBackground />
    </AuthLayout>
  );
};
