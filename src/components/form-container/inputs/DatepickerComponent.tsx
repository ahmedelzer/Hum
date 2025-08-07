import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useSelector } from "react-redux";

function DatepickerComponent({
  name,
  value,
  onChange,
  placeholder,
  type,
  minDate,
  maxDate,
  ...props
}) {
  const [selectedDate, setSelectedDate] = useState(value || maxDate);
  const languageRow = useSelector((state) => state.localization.languageRow);
  const localization = useSelector((state) => state.localization.localization);
  const dateTime = localization.dateTime;
  const customArabicLocale = {
    localize: {
      month: (n) => dateTime.localize.months[n],
      day: (n) => dateTime.localize.days[n],
      dayPeriod: (period) =>
        period === "am" ? dateTime.localize.am : dateTime.localize.pm,
    },
    formatLong: {
      date: () => dateTime.formatLong.date,
      time: () => dateTime.formatLong.time,
      dateTime: () => dateTime.formatLong.dateTime,
    },
    options: dateTime.options,
  };
  useEffect(() => {
    setSelectedDate(value || null);
  }, [value]);
  // Determine language code and register
  const getLocaleObject = () => {
    registerLocale("custom", customArabicLocale);
    return "custom";
  };
  const currentLocale = getLocaleObject();
  const handleDateChange = (date) => {
    console.log("begin");

    if (date) {
      console.log(date);

      setSelectedDate(date);
      onChange(date); // Pass raw Date object back to react-hook-form
    }
  };

  const getDateFormat = () => {
    if (type === "pushTime") return "hh:mm aa";
    if (type === "datetime") return "MMMM d, yyyy h:mm aa";
    return "MMMM d, yyyy";
  };

  return (
    <>
      <DatePicker
        id={`datepicker-${name}`}
        locale={currentLocale}
        selected={selectedDate}
        onChange={handleDateChange}
        placeholderText={placeholder}
        showTimeSelect={type === "datetime" || type === "pushTime"}
        showYearDropdown
        timeIntervals={15}
        minDate={minDate}
        maxDate={maxDate}
        dateFormat={getDateFormat()}
        className={`${props.className || ""} form-control`}
        // {...props}
      />
    </>
  );
}

export default DatepickerComponent;
