import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet
} from "react-native";
import { isRTL } from "../operation/isRTL";

export default function InputWithAction({
  placeholder = "",
  submitButtonText = "Submit",
  onSubmitFun,
}) {
  const [value, setValue] = useState("");

  return (
    <View style={styles.outerContainer}>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={placeholder}
            onChangeText={setValue}
            value={value}
            style={[
              styles.input,
              isRTL() ? styles.rtlText : styles.ltrText
            ]}
            placeholderTextColor="#999"
          />
        </View>
      </ScrollView>
      
      <TouchableOpacity
        onPress={() => onSubmitFun(value)}
        style={[
          styles.button,
          isRTL() ? styles.buttonLeft : styles.buttonRight
        ]}
      >
        <Text style={styles.buttonText}>{submitButtonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  inputContainer: {
    flex: 1,
    minWidth: 200,
  },
  input: {
    height: 48,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
  },
  rtlText: {
    textAlign: 'right',
    marginLeft: 8,
  },
  ltrText: {
    textAlign: 'left',
    marginRight: 8,
  },
  button: {
    height: 48,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF5722',
    borderRadius: 8,
  },
  buttonRight: {
    marginLeft: 8,
  },
  buttonLeft: {
    marginRight: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});