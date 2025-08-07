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
import DatepickerComponent from "./DatepickerComponent";
import { useSelector } from "react-redux";

export default function DateParameter({
  fieldName: name,
  control,
  value: defaultValue,
  enable,
  placeholder,
  ...props
}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const localization = useSelector((state) => state.localization.localization);
  const languageRow = useSelector((state) => state.localization.languageRow);
  const dateTime = localization.dateTime;

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

    const date = new Date(val);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const isPM = hours >= 12;
    const displayHours = isPM ? hours - 12 || 12 : hours || 12;

    const day = date.getDate();
    const monthName = dateTime.dateTime.dxDateBox.months[date.getMonth()];
    const year = date.getFullYear();
    const time = `${displayHours}:${minutes} ${isPM ? dateTime.dateTime.dxDateBox.pm : dateTime.dateTime.dxDateBox.am}`;

    if (isPushTime) return time;
    if (isDateTime) return `${monthName} ${day}, ${year} - ${time}`;
    return `${monthName} ${day}, ${year}`;
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
      rules={{
        required: true,
      }}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) =>
        Platform.OS === "web" ? (
          <DatepickerComponent
            {...props}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={props.type}
            minDate={minDate}
            maxDate={maxDate}
          />
        ) : (
          <View>
            <TouchableOpacity
              onPress={showDatePicker}
              style={styles.touchable}
              {...props}
            >
              <Text style={styles.text}>
                {formatValue(value) || placeholder}
              </Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode={mode}
              locale={languageRow.shortname}
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
        )
      }
    />
  );
}
