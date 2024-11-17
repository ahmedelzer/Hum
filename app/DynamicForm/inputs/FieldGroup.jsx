// import "bootstrap/dist/css/bootstrap.min.css";
// import React from "react";
// import { Input } from "reactstrap";
// export default function FieldGroup({ value, onChange, ...props }) {
//   // const style = () => {
//   //   if (props.title) {
//   //     return "is-invalid";
//   //   } else {
//   //     return "";
//   //   }
//   // };

//   return (
//     <Input
//       {...props}
//       onChange={onChange}
//       onFocus={props.onFocus}
//       className={`${props.className} form-control`}
//     />
//   );
// }
import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function FieldGroup({
  value,
  onChange,
  onFocus,
  title,
  className,
  ...props
}) {
  // Applying conditional style for validation
  const inputStyle = title ? styles.invalid : styles.input;

  return (
    <TextInput
      {...props}
      value={value}
      onChangeText={onChange}
      onFocus={onFocus}
      style={[inputStyle, props.style]} // Merges conditional style with any external styles passed via props
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  invalid: {
    borderWidth: 1,
    borderColor: "red", // Changes border color to red if there's a validation issue
    padding: 10,
    borderRadius: 5,
  },
});
