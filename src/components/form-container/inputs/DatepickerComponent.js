import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ar } from "date-fns/locale"; // Import Arabic locale

// Register the Arabic locale
registerLocale("ar", ar);

function DatepickerComponent({ name, ...props }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateIso, setSelectedDateIso] = useState(null);
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
        selected={selectedDate}
        placeholderText={props.placeholder}
        showTimeSelect={props.type === "datetime"}
        onChange={handleDateChange}
        showYearDropdown
        locale="ar"
        className={`${props.className} form-control`}
      />
      <input type="hidden" name={name} value={selectedDateIso} />
    </>
  );
}

export default DatepickerComponent;
