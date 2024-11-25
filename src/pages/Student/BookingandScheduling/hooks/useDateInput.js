import { useState } from "react";

export const useDateInput = () => {
  const [date, setDate] = useState("");

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return {
    date,
    handleDateChange,
  };
};
