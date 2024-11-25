import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { trainerCarTimes } from "../constants/trainerCarTimes";

export const useBooking = () => {
  const [value, setValue] = useState(dayjs());
  const [times, setTimes] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [selectedCar, setSelectedCar] = useState("");
  const [bookingType, setBookingType] = useState("once");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(""); // State to track selected time
  const minDate = dayjs().isAfter(value) ? dayjs() : value; // Ensure today or selected date
  const maxDate = minDate.add(15, "day"); // 15 days from minDate

  useEffect(() => {
    const loadTimes = () => {
      if (!selectedTrainer) return setTimes([]);

      const allCarTimes =
        selectedCar === "Any Car"
          ? Object.values(trainerCarTimes[selectedTrainer]).flat()
          : trainerCarTimes[selectedTrainer][selectedCar] || [];

      setTimes([...new Set(allCarTimes)]);
    };

    loadTimes();
  }, [selectedTrainer, selectedCar]);

  useEffect(() => {
    if (bookingType === "daily") {
      const timesForRange = [];
      const startDate = minDate.format("D MMMM"); // e.g., "November 13"
      const endDate = minDate.add(14, "day").format("D MMMM"); // e.g., "November 27"

      timesForRange.push({
        dateRange: `${startDate} to ${endDate}`,
        times, // Available times for the entire range
      });

      setAvailableTimes(timesForRange);
    } else {
      setAvailableTimes([{ date: value.format("YYYY-MM-DD"), times }]);
    }
  }, [value, bookingType, times, minDate]);

  const handleTimeSelect = (time) => {
    setSelectedTime(time === selectedTime ? "" : time); // Deselect if already selected
  };

  return {
    value,
    setValue,
    times,
    availableTimes,
    selectedTime,
    setSelectedTime,
    selectedTrainer,
    setSelectedTrainer,
    selectedCar,
    setSelectedCar,
    bookingType,
    setBookingType,
    minDate,
    maxDate,
    handleTimeSelect,
  };
};
