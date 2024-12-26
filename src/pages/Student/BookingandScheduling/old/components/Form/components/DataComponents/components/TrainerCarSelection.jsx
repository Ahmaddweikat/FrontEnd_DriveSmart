import React from "react";
import { trainerCarTimes } from "../../../../../constants/trainerCarTimes";
import { Avatar, Card, CardContent, Typography, Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

export function TrainerCarSelection({
  selectedTrainer,
  selectedCar,
  handleTrainerSelect,
  setSelectedCar,
  trainers,
  cars,
  disabled,
}) {
  // Get available cars for selected trainer
  const getAvailableCars = (trainer) => {
    if (!trainer) return [];

    const trainerSchedule = trainerCarTimes[trainer];
    if (!trainerSchedule) return [];

    const availableCars = new Set();
    Object.values(trainerSchedule).forEach((daySchedule) => {
      Object.keys(daySchedule).forEach((car) => {
        availableCars.add(car);
      });
    });

    return Array.from(availableCars);
  };

  const availableCars = getAvailableCars(selectedTrainer);

  return (
    <div className="space-y-6">
      {/* Trainer Selection Cards */}
      <div>
        <Typography variant="h6" className="text-gray-700 mb-3">
          Choose Your Instructor
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trainers.map((trainer, index) => (
            <Card
              key={index}
              onClick={() => !disabled && handleTrainerSelect(trainer)}
              sx={{
                cursor: disabled ? "not-allowed" : "pointer",
                border:
                  trainer === selectedTrainer
                    ? "2px solid #72b626"
                    : "1px solid #e0e0e0",
                transition: "all 0.2s ease",
                opacity: disabled ? 0.7 : 1,
                "&:hover": {
                  boxShadow: disabled ? "none" : "0 4px 12px rgba(0,0,0,0.1)",
                  transform: disabled ? "none" : "translateY(-2px)",
                },
              }}
            >
              <CardContent className="flex items-center space-x-4">
                <Avatar
                  sx={{
                    bgcolor:
                      trainer === selectedTrainer ? "#72b626" : "#f5f5f5",
                    color: trainer === selectedTrainer ? "white" : "#666",
                  }}
                >
                  <PersonIcon />
                </Avatar>
                <div>
                  <Typography variant="subtitle1" className="font-medium">
                    {trainer}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {getAvailableCars(trainer).length} cars available
                  </Typography>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedTrainer && availableCars.length === 0 && (
        <Typography color="error" className="mt-4">
          No vehicles available for this instructor at the moment
        </Typography>
      )}
    </div>
  );
}
