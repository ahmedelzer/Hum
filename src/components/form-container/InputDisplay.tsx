import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DisplayError from "./DisplayError";
import { Input } from "../../../components/ui/input"; // Import the Gluestack input component
import { theme } from "../../Theme";

function InputDisplay({ props, BaseInput, errorResult }) {
  const [inputErrorResult, setInputErrorResult] = useState(null);
  const [inputStyle, setInputStyle] = useState(styles.input);
  const [changed, setChanged] = useState(false);
  const isRTL = true;
  // const {localization} = useContext(lang)
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
  const invalidInput = () => {
    if (inputErrorResult !== null || errorResult[props.fieldName]) {
      return true;
    }
    return false;
  };
  return (
    <View
    // style={{
    //   direction: isRTL ? "rtl" : "ltr",
    //   writingDirection: isRTL ? "rtl" : "ltr",
    // }}
    >
      {props.type !== "detailsCell" && props.type !== "displayLookup" && (
        <View style={styles.formGroup}>
          <Text
            style={[
              styles.label,
              // { justifyContent: isRTL ? "flex-end" : "flex-end" },
            ]}
          >
            {props.title}
          </Text>

          <BaseInput
            {...props}
            onChange={handleChange}
            title={inputErrorResult ? inputErrorResult : props.title}
            placeholder={props.title}
            style={[
              inputStyle,
              {
                textAlign: isRTL ? "right" : "left",
                writingDirection: isRTL ? "rtl" : "ltr",
              },
              props.style,
            ]}
            invalidInput={invalidInput()}
          />

          <DisplayError
            dataError={errorResult}
            parameterField={props.fieldName}
            setTitle={setInputErrorResult}
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
    color: theme.text,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.border,
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
