import React from "react";
import { trainers, cars } from "../../../constants/trainerCarTimes";
import { useBooking } from "../../../hooks/useBooking";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Add this line

const Data = ({ studentName, studentId, schoolName, typeOfLicence }) => {
  const {
    value,
    setValue,
    times,
    availableTimes,
    selectedTime,
    handleTimeSelect,
    selectedTrainer,
    setSelectedTrainer,
    selectedCar,
    setSelectedCar,
    bookingType,
    setBookingType,
    minDate,
    maxDate,
  } = useBooking();

  const disablePastDates = (date) => {
    return dayjs(date).isBefore(dayjs(), "day");
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
          <FormLabel sx={{ color: "#4b5563", fontWeight: 600 }}>
            Daily / Once
          </FormLabel>
          <RadioGroup
            row
            value={bookingType}
            onChange={(e) => setBookingType(e.target.value)}
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
              onChange={setValue}
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
                        onClick={() => handleTimeSelect(time)}
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
