import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
//!localization
function SelectParameter({
  values = [], // Array of objects with { label, value }
  value = null, // Current selected value
  fieldName,
  enable = true,
  control,
  ...props
}) {
  const [selectedValue, setSelectedValue] = useState(value); // Selected value
  const [isFocus, setIsFocus] = useState(false);
  // Prepare dropdown options
  const dropdownData = values.map((val) => ({
    label: val, // Display value
    value: val, // Actual value
  }));
  const renderLabel = () => {
    if (selectedValue || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          {fieldName || "Select an option"}
        </Text>
      );
    }
    return null;
  };
  console.log(value);
  return (
    <View>
      {/* {renderLabel()} */}
      <Controller
        control={control}
        rules={{
          required: false,
        }}
        name={fieldName}
        render={({ field: { onChange, onBlur, value } }) => (
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dropdownData} // Map values dynamically
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Select an item" : "..."}
            searchPlaceholder="Search..."
            value={selectedValue}
            disabled={!enable} // Disable dropdown if not enabled
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setSelectedValue(item.value);
              onChange(item.value); // Call onChange handler
              setIsFocus(false);
            }}
            // renderLeftIcon={() => (
            //   <AntDesign
            //     style={styles.icon}
            //     color="black"
            //     name="Safety"
            //     size={20}
            //   />
            // )}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default SelectParameter;
