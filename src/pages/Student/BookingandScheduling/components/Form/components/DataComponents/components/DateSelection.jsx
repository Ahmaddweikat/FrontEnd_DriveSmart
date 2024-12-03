import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import dayjs from "dayjs";

export function DateSelection({
  selectedDates,
  setSelectedDates,
  availableTimes,
  handleTimeSelect,
  selectedTimes,
}) {
  const disablePastDates = (date) => {
    return dayjs(date).isBefore(dayjs(), "day");
  };

  const handleDateChange = (date) => {
    const dateStr = date.format('YYYY-MM-DD');
    const dayOfWeek = date.format('dddd');
    console.log('Selected date:', dateStr, 'Day of week:', dayOfWeek);
    
    setSelectedDates(prev => {
      const newDates = { ...prev };
      if (dateStr in newDates) {
        console.log('Removing date:', dateStr);
        delete newDates[dateStr];
      } else {
        console.log('Adding date:', dateStr);
        newDates[dateStr] = null;
      }
      console.log('Updated selected dates:', newDates);
      return newDates;
    });
  };
  return (
    <div className="flex flex-col md:flex-row md:space-x-8">
      <div className="w-full md:w-1/2">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={null}
            onChange={(newDate) => {
              console.log('Calendar onChange:', newDate.format('YYYY-MM-DD'), newDate.format('dddd'));
              handleDateChange(newDate);
            }}
            shouldDisableDate={disablePastDates}
            renderDay={(day, selected, dayProps) => {
              const dateStr = day.format('YYYY-MM-DD');
              const isSelected = dateStr in selectedDates;
              return (
                <div
                  {...dayProps}
                  style={{
                    backgroundColor: isSelected ? '#72b626' : 'transparent',
                    color: isSelected ? 'white' : 'inherit',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    margin: '2px',
                    '&:hover': {
                      backgroundColor: isSelected ? '#72b626' : 'rgba(114, 182, 38, 0.1)',
                    },
                  }}
                >
                  {day.date()}
                  {isSelected && selectedDates[dateStr] && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '2px',
                        width: '4px',
                        height: '4px',
                        backgroundColor: 'white',
                        borderRadius: '50%'
                      }}
                    />
                  )}
                </div>
              );
            }}
            sx={{
              boxShadow: "none",
              "& .MuiPaper-root": {
                boxShadow: "none",
              },
              "& .MuiPickersDay-root": {
                fontSize: '0.875rem',
                margin: '2px',
              },
              "& .MuiPickersDay-root.Mui-selected": {
                backgroundColor: '#72b626',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#72b626',
                },
              },
              "& .MuiPickersDay-root:hover": {
                backgroundColor: 'rgba(114, 182, 38, 0.1)',
              },
            }}
          />
        </LocalizationProvider>
      </div>
      <div className="w-full md:w-1/2">
        {Object.keys(selectedDates).length > 0 ? (
          <div className="mt-6">
            {Object.entries(selectedDates).map(([dateStr, selectedTime]) => (
              <div key={dateStr} className="mb-4">
                <h4 className="text-lg font-semibold mb-2 text-gray-800">
                  {dayjs(dateStr).format('MMMM D, YYYY')}:
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
                      onClick={() => handleTimeSelect(dateStr, time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <span className="text-gray-600">Select dates to view available times</span>
        )}
      </div>
    </div>
  );
}