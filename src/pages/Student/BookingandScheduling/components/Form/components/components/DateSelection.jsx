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
    <div className="flex flex-col md:flex-row md:space-x-8">
      <div className="w-full md:w-1/2">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={value}
            onChange={setValue}
            shouldDisableDate={disablePastDates}
            sx={{
              boxShadow: "none",
              "& .MuiPaper-root": {
                boxShadow: "none",
              },
            }}
          />
        </LocalizationProvider>
      </div>
      <div className="w-full md:w-1/2">
        {availableTimes.length > 0 ? (
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-4 text-gray-800">
              Available Times:
            </h4>

            <div className="flex flex-wrap gap-2">
              {availableTimes.map((time, index) => (
               <Button
               key={index}
               variant="outlined"
               color="primary"
               sx={{
                 fontWeight: 600,
                 color: selectedTime === time ? "white" : "#72b626",
                 borderColor: "#72b626",
                 backgroundColor: selectedTime === time ? "#72b626" : "transparent",
                 "&:hover": {
                   borderColor: "#72b626",
                   backgroundColor: selectedTime === time ? "#72b626" : "rgba(114, 182, 38, 0.04)",
                 },
               }}
               onClick={() => handleTimeSelect(time)}
             >
               {time}
             </Button>
              ))}
            </div>
          </div>
        ) : (
          <span className="text-gray-600">No available times</span>
        )}
      </div>
    </div>
  );
}
