import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DisplayError from "./DisplayError";
import { Input } from "../../../components/ui/input"; // Import the Gluestack input component
import { theme } from "../../Theme";
import { isRTL } from "../../utils/operation/isRTL";
import { useSelector } from "react-redux";

function InputDisplay({ props, BaseInput, errorResult }) {
  const [inputErrorResult, setInputErrorResult] = useState(null);
  const localization = useSelector((state) => state.localization.localization);

  const [inputStyle, setInputStyle] = useState(styles.input);
  const [changed, setChanged] = useState(false);
  // const {localization} = useContext(lang)
  const handleChange = (e) => {
    if (!inputErrorResult) {
      setChanged(true);
    }
    if (props.onChange) {
      props.onChange(e); // Call the onChange prop if it exists
    }
    setInputStyle(styles.input);
    // props.clearErrors(props.fieldName)
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
    <View>
      {props.type !== "detailsCell" && props.type !== "displayLookup" && (
        <View style={styles.formGroup}>
          {props.showTitle && (
            <Text
              style={[styles.label, { direction: isRTL() ? "rtl" : "ltr" }]}
            >
              {props.title}
            </Text>
          )}

          <BaseInput
            {...props}
            onChange={handleChange}
            title={inputErrorResult ? inputErrorResult : props.title}
            placeholder={localization.inputs.base.placeholder + props.title}
            style={[{ direction: isRTL() ? "rtl" : "ltr" }]}
            invalidInput={invalidInput()}
          />

          <DisplayError
            dataError={errorResult}
            parameterField={props.fieldName}
            setTitle={setInputErrorResult}
            title={props.title}
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
