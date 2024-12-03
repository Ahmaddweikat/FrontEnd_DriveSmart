import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { trainerCarTimes } from "../../../../../constants/trainerCarTimes";

export function TimeSelection({
  selectedTimeInput,
  handleTimeInputChange,
  filteredTrainers,
  selectedTrainer,
  handleTrainerSelect,
  selectedDays,
  handleDayChange,
  selectedCars,
  handleCarSelect,
}) {
   const getUpcomingDates = (selectedDays) => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const referenceDate = new Date(); 
    const dates = {};
  
    selectedDays.forEach(day => {
      const targetDayIndex = weekdays.indexOf(day);
      const currentDayIndex = referenceDate.getDay(); 
      let daysToAdd;
      
      if (targetDayIndex < currentDayIndex) {
        daysToAdd = 7 - (currentDayIndex - targetDayIndex);
      } else {
        daysToAdd = targetDayIndex - currentDayIndex;
      }

      const date = new Date(referenceDate);
      date.setDate(date.getDate() + daysToAdd);
  
      dates[day] = date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    });
  
    return dates;
  };
  
  return (
    <div>
      <TextField
        label="Select Time"
        type="time"
        value={selectedTimeInput}
        onChange={handleTimeInputChange}
        sx={{ width: "33.33%" }}
        variant="outlined"
      />

      {filteredTrainers.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold text-gray-800">Available Trainers:</h4>
            <div className="space-y-2">
              {filteredTrainers.map(({ trainer, availableDays }) => (
                <div key={trainer} className="mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">{trainer}</span>
                    <Button
                      variant="outlined"
                      sx={{
                        px: 2, // Smaller padding for a smaller button
                        py: 1, // Adjust vertical padding for smaller button size
                        mt: 1,
                        borderColor:
                          selectedTrainer === trainer ? "#72b626" : "gray",
                        backgroundColor:
                          selectedTrainer === trainer ? "#72b626" : "white",
                        color: selectedTrainer === trainer ? "white" : "black",
                        "&:hover": {
                          backgroundColor:
                            selectedTrainer === trainer
                              ? "#72b626"
                              : "lightgray",
                        },
                        fontSize: "0.875rem",
                      }}
                      onClick={() => handleTrainerSelect(trainer)}
                    >
                      {selectedTrainer === trainer ? "Selected" : "Select"}{" "}
                      {/* Change text when selected */}
                    </Button>
                  </div>
                  {selectedTrainer === trainer && (
                    <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Select the days for booking:
                    </p>
                    <FormGroup row>
                      {availableDays.map((day) => {
                        // Only calculate date if the day is selected
                        const date = selectedDays.includes(day) ? 
                          getUpcomingDates([day])[day] : null;
                        return (
                          <FormControlLabel
                            key={day}
                            control={
                              <Checkbox
                                value={day}
                                checked={selectedDays.includes(day)}
                                onChange={handleDayChange}
                              />
                            }
                            label={
                              <span>
                                {day}
                              </span>
                            }
                          />
                        );
                      })}
                    </FormGroup>
                  </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {selectedTrainer && selectedDays.length > 0 && selectedTimeInput && (
            <div
              className="max-h-96 overflow-y-auto"
              style={{ maxHeight: "350px" }}
            >
              <h4 className="font-bold text-gray-800">Available Cars:</h4>
              {selectedDays.map((day) => {
                const filteredCarsForDay = Object.entries(
                  trainerCarTimes[selectedTrainer]?.[day] || {}
                ).filter(([car, times]) => times.includes(selectedTimeInput));

                return (
                  <div key={day} className="mt-2">
                    <h5 className="text-md font-semibold text-gray-700">
                      {day} ({getUpcomingDates([day])[day]})
                    </h5>
                    {filteredCarsForDay.length === 0 ? (
                      <p className="text-gray-500">
                        No cars available for the selected time.
                      </p>
                    ) : (
                      <ul className="list-disc list-inside">
                        {filteredCarsForDay.map(([car]) => (
                          <li
                            key={car}
                            className="flex justify-between items-center"
                          >
                            <div>
                              <span className="font-semibold">{car}:</span>{" "}
                              Available at {selectedTimeInput}
                            </div>
                            <button
                              className={`px-4 py-1 rounded mt-1 ${
                                selectedCars[day] === car
                                  ? "bg-customGreen text-white"
                                  : "bg-gray-300 text-black"
                              }`}
                              onClick={() => handleCarSelect(car, day)}
                            >
                              {selectedCars[day] === car
                                ? "Selected"
                                : "Select"}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="border-t border-gray-300 mb-2 mt-1"></div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
