import React, { useState, useEffect } from "react";
import "./datePicker.css";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const YEARS = new Array(201).fill(1900).map((value, index) => value + index);

function DatePicker({ date, onDateChange }) {
  const [initialDate, setInitialDate] = useState(date);

  useEffect(() => {
    setInitialDate(date);
    console.log("Initial date:", date);
  }, []);
  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const days = new Array(daysInMonth).fill().map((_, index) => index + 1);

  const handleDayChange = (event) => {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      event.target.value
    );
    // console.log("Day changed:", newDate);
    onDateChange(event.target.value);
    console.log(event.target.value);
  };

  const handleMonthChange = (event) => {
    const newDate = new Date(
      date.getFullYear(),
      event.target.value,
      date.getDate()
    );
    // console.log("Month changed:", newDate);
    onDateChange(newDate);
    console.log(MONTHS[event.target.value]);
  };

  const handleYearChange = (event) => {
    const newDate = new Date(
      event.target.value,
      date.getMonth(),
      date.getDate()
    );
    // console.log("Year changed:", newDate);
    onDateChange(newDate);
    console.log(event.target.value);
  };

  const handleReset = () => {
    console.log("Reset to:", initialDate);
    onDateChange(initialDate);
  };
  return (
    <>
      <div className="date-picker">
        <select
          className="date-picker__day"
          value={date.getDate()}
          onChange={handleDayChange}
        >
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <select
          className="date-picker__month"
          value={date.getMonth()}
          onChange={handleMonthChange}
        >
          {MONTHS.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
        <select
          className="date-picker__year"
          value={date.getFullYear()}
          onChange={handleYearChange}
        >
          {YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <button className="btn-Acc" onClick={handleReset}>
        Reset
      </button>
    </>
  );
}

export default DatePicker;
