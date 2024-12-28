import { View, Text } from "react-native";
import React, { useState } from "react";
import { Input, InputField } from "@/components/ui/input";
import { parametersSchemaDraw } from "@/src/utils/parametersSchemaDraw";

const InputDisplay = ({ row, formSchemaParameter }: any) => {
  // const [value, setValue] = useState("");

  // const handleOnChange = (event: any) => {
  //   const { text } = event.nativeEvent || "";
  //   setValue(text);
  // };
  return (
    <>
      {parametersSchemaDraw({
        row,
        formSchemaParameter,
        // handleOnChange,
        // value,
      })}
    </>
  );
};

export default InputDisplay;
