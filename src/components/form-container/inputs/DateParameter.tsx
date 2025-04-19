import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { Controller } from "react-hook-form";

export default function DateParameter({
  fieldName: name,
  control,
  value: defaultValue,
  enable,
  placeholder = "Select your birthday",
  ...props
}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const styles = StyleSheet.create({
    touchable: {
      borderWidth: 1,
      padding: 12,
      borderRadius: 8,
    },
    text: {
      fontSize: 16,
    },
  });

  return (
    <Controller
      control={control}
      disabled={!enable}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <View>
          <TouchableOpacity
            onPress={showDatePicker}
            style={styles.touchable}
            {...props}
          >
            <Text style={styles.text}>
              {value ? moment(value).format("MMMM D, YYYY") : placeholder}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={(selectedDate) => {
              onChange(selectedDate);
              hideDatePicker();
            }}
            onCancel={hideDatePicker}
            maximumDate={new Date()}
            display={Platform.OS === "ios" ? "spinner" : "default"}
          />
        </View>
      )}
    />
  );
}
