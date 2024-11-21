import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const trainerCarTimes = {
  "Trainer A": {
    "Car 1": ["08:00", "08:40", "09:20", "10:00", "10:40"],
    "Car 2": ["08:40", "09:20", "10:00", "10:40", "11:20"],
    "Car 3": ["09:00", "09:40", "10:20", "11:00", "11:40"],
  },
  "Trainer B": {
    "Car 1": ["08:00", "08:40", "09:20", "10:00", "10:40"],
    "Car 3": ["09:00", "09:40", "10:20", "11:00", "11:40"],
  },
  "Trainer C": {
    "Car 2": ["08:00", "08:40", "09:20", "10:00", "10:40"],
    "Car 3": ["09:00", "09:40", "10:20", "11:00", "11:40"],
  },
};

const trainers = ["Trainer A", "Trainer B", "Trainer C"];
const cars = ["Car 1", "Car 2", "Car 3"];

const Data = () => {
  const [value, setValue] = useState(dayjs());
  const [times, setTimes] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [typeOfLicence, setTypeOfLicence] = useState("");
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [selectedCar, setSelectedCar] = useState("");
  const [bookingType, setBookingType] = useState("once");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(""); // State to track selected time
  const minDate = dayjs().isAfter(value) ? dayjs() : value; // Ensure today or selected date
  const maxDate = minDate.add(15, "day"); // 15 days from minDate
  const [dateRange, setDateRange] = useState("");

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
        times: times, // Available times for the entire range
      });

      setAvailableTimes(timesForRange);
    } else {
      setAvailableTimes([{ date: value.format("YYYY-MM-DD"), times }]);
    }
  }, [value, bookingType, times, minDate]);

  const handleDateChange = (newValue) => {
    setValue(newValue);
  };

  const handleBookingTypeChange = (event) => {
    setBookingType(event.target.value);
  };

  const disablePastDates = (date) => {
    return dayjs(date).isBefore(dayjs(), "day");
  };
  const handleTimeSelect = (time) => {
    // Set selected time and toggle active class
    setSelectedTime(time === selectedTime ? "" : time); // Deselect if already selected
  };

  return (
    <div className="max-w-full mx-auto mt-4 relative">
      <div className="p-2 bg-white w-full">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 font-semibold mb-2">
              Student Name:
            </label>
            <h3 className="text-lg">{studentName || "Ahmad Dweikat"}</h3>
          </div>
          <div>
            <label className="block text-gray-600 font-semibold mb-2">
              Student ID:
            </label>
            <h3 className="text-lg">{studentId || "12345"}</h3>
          </div>
          <div>
            <label className="block text-gray-600 font-semibold mb-2">
              School Name:
            </label>
            <h3 className="text-lg">{schoolName || "Al-Quds"}</h3>
          </div>
          <div>
            <label className="block text-gray-600 font-semibold mb-2">
              Type of Licence:
            </label>
            <h3 className="text-lg">{typeOfLicence || "Private"}</h3>
          </div>
          <div>
            <label className="block text-gray-600 font-semibold mb-2">
              Select Trainer
            </label>
            <select
              value={selectedTrainer}
              onChange={(e) => setSelectedTrainer(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen bg-white"
            >
              <option value="">Select a trainer</option>
              {trainers.map((trainer, index) => (
                <option key={index} value={trainer}>
                  {trainer}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-600 font-semibold mb-2">
              Select Car
            </label>
            <select
              value={selectedCar}
              onChange={(e) => setSelectedCar(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen bg-white"
            >
              <option value="">Select a car</option>
              <option value="Any Car">Any Car</option>
              {cars.map((car, index) => (
                <option key={index} value={car}>
                  {car}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <FormControl>
          <FormLabel
            sx={{
              color: "#4b5563",
              fontWeight: 600,
            }}
          >
            Daily / Once
          </FormLabel>
          <RadioGroup
            row
            value={bookingType}
            onChange={handleBookingTypeChange}
          >
            <FormControlLabel
              value="daily"
              control={
                <Radio
                  sx={{ color: "gray", "&.Mui-checked": { color: "#72b626" } }}
                />
              }
              label="Daily"
            />
            <FormControlLabel
              value="once"
              control={
                <Radio
                  sx={{ color: "gray", "&.Mui-checked": { color: "#72b626" } }}
                />
              }
              label="Once"
            />
          </RadioGroup>
        </FormControl>
      </div>

      <div className="mt-4 flex space-x-8 shadow-lg">
        <div className="w-1/2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={value}
              onChange={handleDateChange}
              shouldDisableDate={disablePastDates}
            />
          </LocalizationProvider>
        </div>

        <div className="w-1/2">
          <h4 className="text-lg font-bold mb-4 text-gray-800">
            Available Times:
          </h4>
          {availableTimes.length > 0 ? (
            availableTimes.map(({ dateRange, times }) => (
              <div
                key={dateRange}
                className="mb-6 border-b border-gray-200 pb-4"
              >
                <h5 className="font-semibold text-gray-700 mb-3">
                  {dateRange}
                </h5>
                <div className="flex flex-wrap gap-2">
                  {times.length > 0 ? (
                    times.map((time, index) => (
                      <Button
                        key={index}
                        variant="outlined"
                        color="primary"
                        sx={{
                          margin: "5px",
                          color: selectedTime === time ? "#fff" : "#72b626",
                          borderColor:
                            selectedTime === time ? "#72b626" : "#72b626",
                          minWidth: "70px",
                          backgroundColor:
                            selectedTime === time ? "#72b626" : "transparent",
                          "&:hover": {
                            backgroundColor:
                              selectedTime === time ? "#72b626" : "#f3f3f3",
                          },
                        }}
                        onClick={() => handleTimeSelect(time)} // Handle time selection
                      >
                        {time}
                      </Button>
                    ))
                  ) : (
                    <p className="text-gray-500">No available times</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No available times for the selected date.
            </p>
          )}
        </div>
        <div className="mt-4 text-center">
          <Button
            variant="outlined"
            startIcon={<AssignmentTurnedInIcon />}
            sx={{
              color: "#72b626",
              borderColor: "#72b626",
              position: "absolute",
              top: "10px",
              right: "10px",
              width: "15%",
            }}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Data;
