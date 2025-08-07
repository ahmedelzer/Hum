import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";
import { theme } from "../../Theme";

const LoadingButton = ({ buttonText, loading, onPress, className = "" }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading} // Disable button when loading
      style={{
        backgroundColor: loading ? theme.card : theme.accent,
        padding: 12,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
      className={className}
    >
      {loading ? (
        <ActivityIndicator size="large" className="text-text" /> // Show loading spinner
      ) : (
        <Text className="text-body text-lg">{buttonText}</Text>
      )}
    </TouchableOpacity>
  );
};

export default LoadingButton;
