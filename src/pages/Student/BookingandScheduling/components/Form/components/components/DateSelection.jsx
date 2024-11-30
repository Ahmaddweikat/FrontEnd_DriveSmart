import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import dayjs from "dayjs";

export function DateSelection({
  value,
  setValue,
  availableTimes,
  handleTimeSelect,
  selectedTime,
}) {
  const disablePastDates = (date) => {
    return dayjs(date).isBefore(dayjs(), "day");
  };

  return (
    <div className="flex space-x-8 shadow-lg">
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
        {availableTimes.length > 0 ? (
          <div className="mt-6">
            <h4 className="text-lg font-bold mb-4 text-gray-800">
              Available Times:
            </h4>
            {availableTimes.map((time, index) => (
              <Button
                key={index}
                variant="outlined"
                color="primary"
                sx={{
                  margin: "5px",
                  fontWeight: 600,
                  color: "#72b626",
                }}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </Button>
            ))}
          </div>
        ) : (
          <span>No available times</span>
        )}
      </div>
    </div>
  );
}
