import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { trainerCarTimes } from "../constants/trainerCarTimes";

export function useBookingState() {
  const [filteredTrainers, setFilteredTrainers] = useState([]);
  const [selectedBookingTab, setSelectedBookingTab] = useState(0);
  const [selectedTimeInput, setSelectedTimeInput] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedCars, setSelectedCars] = useState({});
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [value, setValue] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDates, setSelectedDates] = useState({});

  useEffect(() => {
    if (selectedTrainer && selectedCar && value) {
      const dayOfWeek = value.format("dddd");
      const availableTimes =
        trainerCarTimes[selectedTrainer]?.[dayOfWeek]?.[selectedCar] || [];
      setAvailableTimes(availableTimes);
      
      // Filter trainers based on the selected date's day of the week
      const availableTrainers = Object.keys(trainerCarTimes).filter(trainer => {
        return trainerCarTimes[trainer][dayOfWeek] !== undefined;
      });
      setFilteredTrainers(availableTrainers);
    }
  }, [selectedTrainer, selectedCar, value]);

  const handleCarSelect = (car, day) => {
    setSelectedCars((prevState) => ({
      ...prevState,
      [day]: prevState[day] === car ? null : car,
    }));

    if (selectedTrainer && car && day) {
      const timesForCarAndTrainer =
        trainerCarTimes[selectedTrainer]?.[day]?.[car] || [];
      setAvailableTimes(
        timesForCarAndTrainer.length > 0 ? timesForCarAndTrainer : []
      );
    }
  };
  useEffect(() => {
    if (value) {
      const dayOfWeek = value.format("dddd");
      const availableTrainers = Object.keys(trainerCarTimes).filter(trainer => {
        return trainerCarTimes[trainer][dayOfWeek] !== undefined;
      });
      setFilteredTrainers(availableTrainers);
    }
  }, [value]);
  
  const handleTimeInputChange = (event) => {
    setSelectedTimeInput(event.target.value);
    filterTrainersByTime(event.target.value);
    setSelectedDays([]);
    setAvailableTimes([]);
  };

  const filterTrainersByTime = (time) => {
    const availableTrainers = Object.keys(trainerCarTimes).reduce(
      (acc, trainer) => {
        const availableDays = Object.keys(trainerCarTimes[trainer]).filter(
          (day) =>
            Object.values(trainerCarTimes[trainer][day]).some((times) =>
              times.includes(time)
            )
        );

        if (availableDays.length > 0) {
          acc.push({ trainer, availableDays: [...new Set(availableDays)] });
        }
        return acc;
      },
      []
    );

    setFilteredTrainers(availableTrainers);
  };

  const handleTimeSelect = (dateStr, time) => {
    setSelectedDates(prev => ({
        ...prev,
        [dateStr]: time
    }));
};

  const handleDayChange = (event) => {
    const day = event.target.value;
    setSelectedDays((prevDays) =>
      event.target.checked
        ? [...new Set([...prevDays, day])]
        : prevDays.filter((d) => d !== day)
    );
  };

  const handleTrainerSelect = (trainer) => {
    if (trainer !== selectedTrainer) {
      setSelectedTrainer(trainer);
      setSelectedDays([]);
      setSelectedCars({});
    }
  };

  return {
    filteredTrainers,
    selectedBookingTab,
    selectedTimeInput,
    selectedDays,
    selectedCars,
    availableTimes,
    selectedTrainer,
    selectedCar,
    value,
    selectedTime,
    setSelectedBookingTab,
    setSelectedCar,
    setValue,
    handleCarSelect,
    handleTimeInputChange,
    handleTimeSelect,
    handleDayChange,
    handleTrainerSelect,
    selectedDates,
    setSelectedDates,
    handleTimeSelect,
  };
}
