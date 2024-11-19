import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DisplayError from "./DisplayError";
import { Input } from "../../../components/ui/input"; // Import the Gluestack input component

function InputDisplay({ props, BaseInput, errorResult }) {
  const [inputErrorResult, setInputErrorResult] = useState(null);
  const [inputStyle, setInputStyle] = useState(styles.input);
  const [changed, setChanged] = useState(false);

  const handleChange = (e) => {
    if (!inputErrorResult) {
      setChanged(true);
    }
    if (props.onChange) {
      props.onChange(e); // Call the onChange prop if it exists
    }
    setInputStyle(styles.input);
  };

  useEffect(() => {
    if (!changed && inputErrorResult) {
      setInputStyle(styles.invalidInput);
    } else {
      setInputStyle(styles.input);
    }
  }, [inputErrorResult, errorResult, changed]);

  return (
    <View>
      {props.type !== "detailsCell" && (
        <View style={styles.formGroup}>
          <DisplayError
            dataError={errorResult}
            parameterField={props.fieldName}
            setTitle={setInputErrorResult}
            setStyle={setInputStyle}
          />
          <Text style={styles.label}>{props.title}</Text>
          {/* <Input
            {...props}
            onChangeText={handleChange}
            title={inputErrorResult || props.title}
            placeholder={`${props.title}`}
            style={[inputStyle, props.style]}
          /> */}
          <BaseInput
            {...props}
            onChange={handleChange}
            title={inputErrorResult ? inputErrorResult : props.title}
            placeholder={localization.inputs.base.placeholder + props.title}
            style={inputStyle}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 15,
  },
  label: {
    color: "#000",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 30,
  },
  invalidInput: {
    borderWidth: 1,
    borderColor: "red",
    padding: 10,
    borderRadius: 30,
  },
});

export default InputDisplay;
