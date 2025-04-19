import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DatepickerComponent({ name, value, ...props }) {
  const [selectedDate, setSelectedDate] = useState(value);
  const [selectedDateIso, setSelectedDateIso] = useState(value);
  const handleDateChange = (date) => {
    if (date) {
      const isoDateString = date.toISOString(); // Convert to ISO string
      setSelectedDate(date); // Store the ISO date string
      setSelectedDateIso(isoDateString);
    }
  };
  return (
    <>
      <DatePicker
        id="datePicker"
        {...props}
        selected={selectedDate || ""}
        placeholderText={props.placeholder}
        showTimeSelect={props.type === "datetime"}
        onChange={handleDateChange}
        showYearDropdown
        locale="ar"
        className={`${props.className} form-control`}
        dateFormat="dd/MM/yyyy"
      />
      <input type="hidden" name={name} value={selectedDateIso} />
    </>
  );
}

export default DatepickerComponent;
