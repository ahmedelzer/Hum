import React from "react";
import { Text } from "@/components/ui";
import { StyleSheet, TextProps } from "react-native";

// Define the props for the CustomText component
interface CustomTextProps extends TextProps {
  children: React.ReactNode;
  style?: object;
}

// Create the CustomText component
const CustomText: React.FC<CustomTextProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <Text style={[styles.defaultStyle, style]} {...props}>
      {children}
    </Text>
  );
};

// Define default styles using StyleSheet
const styles = StyleSheet.create({
  defaultStyle: {
    fontSize: 16,
    color: "#333",
    // Add more default styles as needed
  },
});

export default CustomText;
