import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import Button from "@mui/material/Button";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { useBookingState } from "../../../hooks/useBookingState";
import { StudentInfo } from "./components/StudentInfo";
import { TrainerCarSelection } from "./components/TrainerCarSelection";
import { DateSelection } from "./components/DateSelection";
import { TimeSelection } from "./components/TimeSelection";
import { trainers, cars } from "../../../constants/trainerCarTimes";

const Data = ({ studentName, studentId, schoolName, typeOfLicence }) => {
  const {
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
  } = useBookingState();

  const handleBooking = () => {
    alert("Booking successfully made!");
  };

  return (
    <div className="max-w-full mx-auto mt-2 relative">
      <div className="p-2 bg-white w-full">
        <StudentInfo
          studentName={studentName}
          studentId={studentId}
          schoolName={schoolName}
          typeOfLicence={typeOfLicence}
        />
        <TrainerCarSelection
          selectedTrainer={selectedTrainer}
          selectedCar={selectedCar}
          handleTrainerSelect={handleTrainerSelect}
          setSelectedCar={setSelectedCar}
          trainers={trainers}
          cars={cars}
        />
      </div>

      <Tabs
        value={selectedBookingTab}
        onChange={(event, newValue) => setSelectedBookingTab(newValue)}
        aria-label="Booking Tabs"
      >
        <Tab label="Date" />
        <Tab label="Time" />
      </Tabs>

      <Box sx={{ padding: 2 }}>
        {selectedBookingTab === 0 && (
          <DateSelection
            value={value}
            setValue={setValue}
            availableTimes={availableTimes}
            handleTimeSelect={handleTimeSelect}
            selectedTime={selectedTime}
          />
        )}

        {selectedBookingTab === 1 && (
          <TimeSelection
            selectedTimeInput={selectedTimeInput}
            handleTimeInputChange={handleTimeInputChange}
            filteredTrainers={filteredTrainers}
            selectedTrainer={selectedTrainer}
            handleTrainerSelect={handleTrainerSelect}
            selectedDays={selectedDays}
            handleDayChange={handleDayChange}
            selectedCars={selectedCars}
            handleCarSelect={handleCarSelect}
          />
        )}
      </Box>

      <div className="flex justify-center">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AssignmentTurnedInIcon />}
          onClick={handleBooking}
          sx={{
            fontWeight: "bold",
            textTransform: "none",
            backgroundColor: "#72b626",
            "&:hover": { backgroundColor: "#6aa51f" },
          }}
        >
          Booking
        </Button>
      </div>
    </div>
  );
};

export default Data;
