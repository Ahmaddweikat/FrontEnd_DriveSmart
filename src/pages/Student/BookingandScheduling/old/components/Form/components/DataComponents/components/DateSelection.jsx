import React, { useEffect } from "react";
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
  selectedTrainer,
  trainerCarTimes,
  selectedCar,
  setSelectedCar,
}) {
  // Reset selections when trainer changes
  useEffect(() => {
    setSelectedDates({});
  }, [selectedTrainer, setSelectedDates]);

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
        newDates[dateStr] = {
          time: null,
          car: null
        };
      }
      return newDates;
    });
  };

  const handleCarSelect = (dateStr, car) => {
    setSelectedDates(prev => ({
      ...prev,
      [dateStr]: {
        ...prev[dateStr],
        car: car,
        time: null
      }
    }));
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-8">
      <div className="w-full md:w-1/2">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={null}
            onChange={handleDateChange}
            shouldDisableDate={(date) => {
              if (dayjs(date).isBefore(dayjs(), "day")) return true;
              if (!selectedTrainer) return false;
              const dayOfWeek = date.format('dddd');
              return !trainerCarTimes[selectedTrainer]?.[dayOfWeek];
            }}
            renderDay={(day, selected, dayProps) => {
              const dateStr = day.format('YYYY-MM-DD');
              const isSelected = dateStr in selectedDates;
              const hasTime = isSelected && selectedDates[dateStr].time;
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
                  }}
                >
                  {day.date()}
                  {hasTime && (
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
              "& .MuiPaper-root": { boxShadow: "none" },
              "& .MuiPickersDay-root": {
                fontSize: '0.875rem',
                margin: '2px',
              },
              "& .MuiPickersDay-root.Mui-selected": {
                backgroundColor: '#72b626',
                color: 'white',
                '&:hover': { backgroundColor: '#72b626' },
              },
              "& .MuiPickersDay-root:hover": {
                backgroundColor: 'rgba(114, 182, 38, 0.1)',
              },
            }}
          />
        </LocalizationProvider>

        {/* Enhanced Summary Section */}
        {Object.keys(selectedDates).length > 0 && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Booking Summary</h4>
            <div className="space-y-3">
              {Object.entries(selectedDates)
                .sort(([dateStrA], [dateStrB]) => dayjs(dateStrA).diff(dayjs(dateStrB)))
                .map(([dateStr, dateData]) => (
                  <div 
                    key={dateStr} 
                    className="p-3 rounded-lg bg-gray-50 border border-gray-100 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-medium text-gray-800">
                            {dayjs(dateStr).format('ddd, MMM D')}
                          </span>
                          {dateData.time && (
                            <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                              Booked
                            </span>
                          )}
                        </div>
                        <div className="mt-1 text-sm text-gray-600">
                          {dateData.car && (
                            <span className="inline-flex items-center">
                              <span className="mr-2">🚗</span>
                              {dateData.car}
                            </span>
                          )}
                          {dateData.time && (
                            <span className="inline-flex items-center ml-4">
                              <span className="mr-2">🕒</span>
                              {dateData.time}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        onClick={() => {
                          setSelectedDates(prev => {
                            const newDates = { ...prev };
                            delete newDates[dateStr];
                            return newDates;
                          });
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-full md:w-1/2">
        {Object.keys(selectedDates).length > 0 ? (
          <div className="mt-6 md:mt-0 space-y-6">
            {Object.entries(selectedDates)
              .sort(([dateStrA], [dateStrB]) => dayjs(dateStrA).diff(dayjs(dateStrB)))
              .map(([dateStr, dateData]) => {
                const dayOfWeek = dayjs(dateStr).format('dddd');
                const availableCars = selectedTrainer ? 
                  Object.keys(trainerCarTimes[selectedTrainer]?.[dayOfWeek] || {}) : [];
                const availableTimes = dateData.car ? 
                  trainerCarTimes[selectedTrainer]?.[dayOfWeek]?.[dateData.car] || [] : [];

                return (
                  <div key={dateStr} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      {dayjs(dateStr).format('MMMM D, YYYY')}
                    </h4>
                    
                    {/* Car Selection */}
                    <div className="mb-6">
                      <h5 className="text-sm font-medium text-gray-700 mb-3">Select Car:</h5>
                      <div className="flex flex-wrap gap-2">
                        {availableCars.map((car) => (
                          <Button
                            key={car}
                            variant={dateData.car === car ? "contained" : "outlined"}
                            size="small"
                            sx={{
                              borderColor: dateData.car === car ? "#72b626" : undefined,
                              backgroundColor: dateData.car === car ? "#72b626" : "white",
                              color: dateData.car === car ? "white" : "inherit",
                              "&:hover": {
                                backgroundColor: dateData.car === car ? "#72b626" : "rgba(114, 182, 38, 0.1)",
                              },
                            }}
                            onClick={() => handleCarSelect(dateStr, car)}
                          >
                            {car}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Time Selection */}
                    {dateData.car && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Select Time:</h5>
                        <div className="flex flex-wrap gap-2">
                          {availableTimes.map((time, index) => (
                            <Button
                              key={index}
                              variant={dateData.time === time ? "contained" : "outlined"}
                              size="small"
                              sx={{
                                borderColor: dateData.time === time ? "#72b626" : undefined,
                                backgroundColor: dateData.time === time ? "#72b626" : "white",
                                color: dateData.time === time ? "white" : "inherit",
                                "&:hover": {
                                  backgroundColor: dateData.time === time ? "#72b626" : "rgba(114, 182, 38, 0.1)",
                                },
                              }}
                              onClick={() => handleTimeSelect(dateStr, time)}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="mt-6 md:mt-0 p-4 bg-gray-50 rounded-lg text-gray-600 text-center">
            Select dates to view available cars and times
          </div>
        )}
      </div>
    </div>
  );
}