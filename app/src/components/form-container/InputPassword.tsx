// import React, { useContext, useState } from "react";
// import { View, TextInput, TouchableOpacity, Text } from "react-native";
// import { Eye, EyeOff } from "lucide-react-native";
// import {
//   Input,
//   InputField,
//   InputIcon,
//   InputSlot,
// } from "../../../components/ui";

// function InputPassword({ ...props }) {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const Right = false;
//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };
//   const [showPassword, setShowPassword] = React.useState(false);
//   const handleState = () => {
//     setShowPassword((showState) => {
//       return !showState;
//     });
//   };

//   let { value, enable, title, fieldName }: any = props;
//   return (
//     // <View
//     // style={{
//     //   flexDirection: Right ? "row-reverse" : "row",
//     //   alignItems: "center",
//     //   width: "100%",
//     // }}
//     // >
//     //   <TextInput
//     //     style={{ flex: 1, borderColor: "gray", borderWidth: 1, padding: 10 }}
//     //     secureTextEntry={!passwordVisible}
//     //     defaultValue={value}
//     //     editable={enable}
//     //     placeholder={title}
//     //     id={fieldName}
//     //     {...props}
//     //   />
//     // <TouchableOpacity
//     //   onPress={togglePasswordVisibility}
//     //   style={{ padding: 10 }}
//     // >
//     //   {passwordVisible ? <EyeOff /> : <Eye />}
//     // </TouchableOpacity>
//     // </View>
//     // <Input>
//     //   <InputField type={passwordVisible ? "text" : "password"} />
//     //   <InputSlot onPress={togglePasswordVisibility}>
//     //     <InputIcon
//     //       as={passwordVisible ? EyeOff : Eye}
//     //       className="text-darkBlue-500"
//     //     >
//     //       {/* <TouchableOpacity
//     //       onPress={togglePasswordVisibility}
//     //       style={{ padding: 10 }}
//     //     >
//     //       {passwordVisible ? <EyeOff /> : <Eye />}
//     //     </TouchableOpacity> */}
//     //     </InputIcon>
//     //   </InputSlot>
//     // </Input>
//     <Input
//       className="text-center"
//       style={{
//         flexDirection: Right ? "row-reverse" : "row",
//         alignItems: "center",
//         width: "100%",
//       }}
//     >
//       <InputField
//         type={showPassword ? "text" : "password"}
//         style={{ flex: 1, borderColor: "gray", borderWidth: 1, padding: 10 }}
//       />
//       <InputSlot className="pr-3" onPress={handleState}>
//         {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
//         <InputIcon
//           as={showPassword ? Eye : EyeOff}
//           className="text-darkBlue-500"
//         />
//       </InputSlot>
//       <TouchableOpacity
//         onPress={togglePasswordVisibility}
//         style={{ padding: 10 }}
//       >
//         {passwordVisible ? <EyeOff /> : <Eye />}
//       </TouchableOpacity>
//     </Input>
//   );
// }

// export default InputPassword;
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import {
  Input,
  InputField,
  InputIcon,
  InputSlot,
} from "../../../components/ui";

function InputPassword({ ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  // Toggle the visibility state of the password
  const handleState = () => {
    setShowPassword((prevState) => !prevState);
  };
  let { value, enable, title, fieldName, placeholder }: any = props;

  return (
    <Input>
      {/* Password Field */}
      <InputField
        type={showPassword ? "text" : "password"}
        // secureTextEntry={!showPassword} // Native `secureTextEntry` for compatibility
        defaultValue={value}
        editable={enable}
        placeholder={placeholder}
        id={fieldName}
        // {...props} // Spread additional props
      />

      {/* Toggle Password Visibility Slot */}
      <InputSlot>
        {/* <TouchableOpacity onPress={handleState}> */}
        <InputIcon as={showPassword ? EyeOff : Eye} />
        {/* </TouchableOpacity> */}
      </InputSlot>
    </Input>
  );
}

export default InputPassword;
