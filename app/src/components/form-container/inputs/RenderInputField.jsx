import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const RenderInputField = ({ input, info, setInfo }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [birthday, setBirthday] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    setYear(birthday.getFullYear().toString());
    setMonth((birthday.getMonth() + 1).toString().padStart(2, "0"));
    setDay(birthday.getDate().toString().padStart(2, "0"));
  }, [birthday]);

  const handleDateChange = (date, fieldName) => {
    setBirthday(date);
    setShowDatePicker(false);
    setInfo({
      ...info,
      [fieldName]: date,
    });
  };

  const handleChange = (value, fieldName) => {
    setInfo({
      ...info,
      [fieldName]: value,
    });
  };

  return (
    <div key={input.title} className="mb-4">
      <label className="text-base font-medium text-gray-700">
        {input.title}
      </label>
      {input.type === "text" || input.type === "email" ? (
        <input
          type={input.type}
          placeholder={input.placeholder}
          onChange={(e) => handleChange(e.target.value, input.fieldName)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      ) : input.type === "date" ? (
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Year"
            value={year}
            readOnly
            className="w-1/3 mt-1 mr-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <input
            type="text"
            placeholder="Month"
            value={month}
            readOnly
            className="w-1/3 mt-1 mr-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <input
            type="text"
            placeholder="Day"
            value={day}
            readOnly
            className="w-1/3 mt-1 mr-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <div>
            <AiOutlineEye
              onClick={() => setShowDatePicker(true)}
              className="cursor-pointer w-6 h-6 mt-1 text-gray-500"
            />
          </div>
        </div>
      ) : input.type === "password" ? (
        <div className="relative">
          <input
            type={isPasswordShown ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => handleChange(e.target.value, input.fieldName)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <div
            onClick={() => setIsPasswordShown(!isPasswordShown)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          >
            {isPasswordShown ? (
              <AiOutlineEyeInvisible className="w-6 h-6 text-gray-500" />
            ) : (
              <AiOutlineEye className="w-6 h-6 text-gray-500" />
            )}
          </div>
        </div>
      ) : null}
      {showDatePicker && (
        <DatePicker
          selected={birthday}
          onChange={(date) => handleDateChange(date, input.fieldName)}
          className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      )}
    </div>
  );
};

export default RenderInputField;
