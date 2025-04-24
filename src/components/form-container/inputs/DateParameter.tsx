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

  const today = new Date();
  const isBirthday = props.type === "birthday";
  const isPushTime = props.type === "pushTime";
  const isDateTime = props.type === "datetime";

  const mode = isPushTime ? "time" : isDateTime ? "datetime" : "date";

  const minDate = isBirthday
    ? new Date(today.getFullYear() - 60, today.getMonth(), today.getDate())
    : isPushTime
      ? new Date()
      : undefined;

  const maxDate = isBirthday
    ? new Date(today.getFullYear() - 14, today.getMonth(), today.getDate())
    : undefined;

  const formatValue = (val) => {
    if (!val) return placeholder;

    if (isPushTime) return moment(val).format("hh:mm A");
    if (isDateTime) return moment(val).format("MMMM D, YYYY - hh:mm A");
    return moment(val).format("MMMM D, YYYY");
  };

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
            <Text style={styles.text}>{formatValue(value)}</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode={mode}
            onConfirm={(selectedDate) => {
              onChange(selectedDate);
              hideDatePicker();
            }}
            onCancel={hideDatePicker}
            minimumDate={minDate}
            maximumDate={maxDate}
            display={Platform.OS === "ios" ? "spinner" : "default"}
          />
        </View>
      )}
    />
  );
}
