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

  // Reset all states when changing tabs
  useEffect(() => {
    setSelectedTrainer(null);
    setSelectedCar(null);
    setSelectedTimeInput("");
    setSelectedDays([]);
    setSelectedCars({});
    setSelectedDates({});
    setAvailableTimes([]);
  }, [selectedBookingTab]);

  useEffect(() => {
    if (selectedTrainer && selectedCar && value) {
      const dayOfWeek = value.format("dddd");
      const times = trainerCarTimes[selectedTrainer]?.[dayOfWeek]?.[selectedCar] || [];
      setAvailableTimes(times);
    } else {
      setAvailableTimes([]);
    }
  }, [selectedTrainer, selectedCar, value]);

  const handleCarSelect = (car, day) => {
    setSelectedCars((prevState) => ({
      ...prevState,
      [day]: car
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

  const filterTrainersByTime = (time) => {
    if (!time) {
      return Object.keys(trainerCarTimes).map(trainer => ({
        trainer,
        availableDays: Object.keys(trainerCarTimes[trainer])
      }));
    }

    return Object.entries(trainerCarTimes).reduce((acc, [trainer, schedule]) => {
      const availableDays = Object.entries(schedule).reduce((days, [day, carSchedule]) => {
        const hasTimeSlot = Object.values(carSchedule).some(times => times.includes(time));
        if (hasTimeSlot) {
          days.push(day);
        }
        return days;
      }, []);

      if (availableDays.length > 0) {
        acc.push({
          trainer,
          availableDays: [...new Set(availableDays)]
        });
      }
      return acc;
    }, []);
  };

  const handleTimeInputChange = (event) => {
    const newTime = event.target.value;
    setSelectedTimeInput(newTime);
    setSelectedTrainer(null);
    setSelectedDays([]);
    setSelectedCars({});
    
    const filtered = filterTrainersByTime(newTime);
    setFilteredTrainers(filtered);
    
    if (selectedTrainer && !filtered.some(t => t.trainer === selectedTrainer)) {
      setSelectedTrainer(null);
    }
  };

  const handleTrainerSelect = (trainer) => {
    setSelectedTrainer(trainer);
    setSelectedCar(null);
    setSelectedDays([]);
    setSelectedCars({});
    
    if (selectedTimeInput && trainer) {
      const filtered = filterTrainersByTime(selectedTimeInput);
      const trainerAvailable = filtered.some(t => t.trainer === trainer);
      
      if (!trainerAvailable) {
        setSelectedTimeInput("");
        setSelectedDays([]);
        setSelectedCars({});
      }
    }
  };

  const handleDateChange = (date) => {
    const dateStr = date.format('YYYY-MM-DD');
    const dayOfWeek = date.format('dddd');
    
    if (selectedTrainer && !trainerCarTimes[selectedTrainer]?.[dayOfWeek]) {
      return;
    }
    
    setSelectedDates(prev => {
      const newDates = { ...prev };
      if (dateStr in newDates) {
        delete newDates[dateStr];
      } else {
        newDates[dateStr] = null;
      }
      return newDates;
    });

    if (selectedTrainer && selectedCar) {
      const times = trainerCarTimes[selectedTrainer]?.[dayOfWeek]?.[selectedCar] || [];
      setAvailableTimes(times);
    }
  };

  const handleTimeSelect = (dateStr, time) => {
    setSelectedDates(prev => ({
      ...prev,
      [dateStr]: {
        ...prev[dateStr],
        time: time
      }
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

  useEffect(() => {
    setSelectedCar(null);
    setSelectedDates({});
    setSelectedDays([]);
    setSelectedCars({});
  }, [selectedTrainer]);

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
    handleDateChange,
  };
}
