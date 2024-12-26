import { useState } from "react";
import { Tabs, Tab, Box, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import KeyboardTabOutlinedIcon from "@mui/icons-material/KeyboardTabOutlined";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useBookingState } from "../../../hooks/useBookingState";
import { TrainerCarSelection } from "../components/DataComponents/components/TrainerCarSelection";
import { DateSelection } from "../components/DataComponents/components/DateSelection";
import { TimeSelection } from "../components/DataComponents/components/TimeSelection";
import { trainers, cars, trainerCarTimes } from "../../../constants/trainerCarTimes";
import { bookingSchema } from "../schemas/bookingSchema";
import {GoogleColoredIcon} from '../components/DataComponents/components/GoogleColoredIcon';
import dayjs from "dayjs";
const Data = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleGoogleAuth = () => {
    setIsAuthenticated(true);
      };
      const {
        filteredTrainers,
        selectedBookingTab,
        selectedTimeInput,
        selectedDays,
        selectedCars,
        availableTimes,
        selectedTrainer,
        selectedCar,
        selectedDates,
        setSelectedDates,
        setSelectedBookingTab,
        setSelectedCar,
        handleCarSelect,
        handleTimeInputChange,
        handleTimeSelect,
        handleDayChange,
        handleTrainerSelect,
      } = useBookingState();

      const handleBooking = () => {
        if (!selectedTrainer) {
          alert("Please select a trainer");
          return;
        }

        if (selectedBookingTab === 0) {
          // Date tab validation
          if (Object.keys(selectedDates).length === 0) {
            alert("Please select at least one date");
            return;
          }
          
          const hasAllCarAndTime = Object.values(selectedDates).every(
            dateData => dateData.time !== null && dateData.car
          );
          
          if (!hasAllCarAndTime) {
            alert("Please select both car and time for all selected dates");
            return;
          }
        } else {
          if (!selectedTimeInput) {
            alert("Please select a time");
            return;
          }
          if (selectedDays.length === 0) {
            alert("Please select at least one day");
            return;
          }
          const hasAllCars = selectedDays.every(day => selectedCars[day]);
          if (!hasAllCars) {
            alert("Please select a car for each selected day");
            return;
          }
        }

        const bookingData = selectedBookingTab === 0
        ? {
          trainer: selectedTrainer,
          car: selectedCar,
          selectedDates,
          selectedDays: Object.keys(selectedDates).map(date => dayjs(date).format('dddd')), // Get day names like 'Monday'
          selectedCars: Object.entries(selectedDates).reduce((acc, [date, data]) => {
            acc[dayjs(date).format('dddd')] = data.car;
            return acc;
          }, {})
        }
      : {
              trainer: selectedTrainer,
              car: selectedCar,
              selectedDates: selectedDays.reduce((acc, day) => {
                if (selectedCars[day]) {
                  acc[day] = {
                    time: selectedTimeInput,
                    car: selectedCars[day]
                  };
                }
                return acc;
              }, {}),
              selectedDays,
              selectedCars
            };

        try {
          const validatedData = bookingSchema.parse(bookingData);
          console.log("Validated booking data:", validatedData);
          alert("Booking successfully made!");
        } catch (error) {
          console.error("Validation error:", error.errors);
          const errorMessages = error.errors.map(err => 
            `${err.path.join('.')}: ${err.message}`
          ).join('\n');
          alert(`Please fix the following errors:\n${errorMessages}`);
        }
      };
  return (
    <div className="max-w-full mx-auto mt-2 relative min-h-full bg-white flex flex-col flex-grow">
      {!isAuthenticated && (
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center p-8 rounded-lg bg-white shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Authentication Required</h2>
            <p className="text-gray-600 mb-6">Please sign in with Google Calendar to access booking features</p>
            <Button
            variant="contained"
            startIcon={<GoogleColoredIcon />} 
            onClick={handleGoogleAuth}
            sx={{
              backgroundColor: '#fff',
              color: '#757575',
              textTransform: 'none',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '10px 20px',
              fontWeight: 500,
              fontSize: '16px',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              },
              minWidth: '250px'
            }}
          >
            Sign in with Google Calendar
          </Button>
          </div>
        </div>
      )}

      <div className={`p-2 bg-white w-full ${!isAuthenticated ? 'filter blur-sm' : ''}`}>
        {isAuthenticated && (
          <div className="flex justify-between items-center mb-4">
            <span className="text-green-600 flex items-center">
              <span className="mr-2">●</span>
              Connected to Google Calendar
            </span>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setIsAuthenticated(false)}
              sx={{
                borderColor: '#72b626',
                color: '#72b626',
                '&:hover': {
                  borderColor: '#6aa51f',
                  backgroundColor: 'rgba(114, 182, 38, 0.04)',
                },
              }}
            >
              Disconnect
            </Button>
          </div>
        )}
        
        <TrainerCarSelection
          selectedTrainer={selectedTrainer}
          selectedCar={selectedCar}
          handleTrainerSelect={handleTrainerSelect}
          setSelectedCar={setSelectedCar}
          trainers={trainers}
          cars={cars}
          disabled={!isAuthenticated || selectedBookingTab === 1}
        />
      </div>

      <Paper 
        elevation={2} 
        sx={{ 
          borderRadius: '12px',
          overflow: 'hidden',
          mb: 3,
          backgroundColor: '#f8f9fa'
        }}
      >
        <Tabs
          value={selectedBookingTab}
          onChange={(event, newValue) => setSelectedBookingTab(newValue)}
          aria-label="Booking Tabs"
          className={!isAuthenticated ? 'filter blur-sm' : ''}
          disabled={!isAuthenticated}
          variant="fullWidth"
          TabIndicatorProps={{
            sx: {
              height: 3,
              borderRadius: '3px',
              backgroundColor: '#72b626'
            }
          }}
          sx={{
            '& .MuiTab-root': {
              minHeight: '64px',
              fontSize: '1rem',
              textTransform: 'none',
              fontWeight: 500,
              color: '#666',
              '&:hover': {
                color: '#72b626',
                opacity: 1,
              },
              '&.Mui-selected': {
                color: '#72b626',
                fontWeight: 600,
              },
              transition: 'all 0.2s ease-in-out',
            },
            '& .MuiTabs-flexContainer': {
              gap: 2,
            },
            backgroundColor: '#fff',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Tab 
            icon={<CalendarMonthIcon />} 
            iconPosition="start"
            label="Book by Date" 
            disabled={!isAuthenticated}
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: '1.3rem',
                mr: 1,
              },
            }}
          />
          <Tab 
            icon={<AccessTimeIcon />} 
            iconPosition="start"
            label="Book by Time" 
            disabled={!isAuthenticated}
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: '1.3rem',
                mr: 1,
              },
            }}
          />
        </Tabs>
      </Paper>

      <Box 
        sx={{ 
          padding: 3,
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }} 
        className={!isAuthenticated ? 'filter blur-sm' : ''}
      >
        {selectedBookingTab === 0 && (
          <DateSelection
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            availableTimes={availableTimes}
            handleTimeSelect={handleTimeSelect}
            selectedTimes={selectedDates}
            selectedTrainer={selectedTrainer}
            selectedCar={selectedCar}
            trainerCarTimes={trainerCarTimes}
            disabled={!isAuthenticated}
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
            disabled={!isAuthenticated}
          />
        )}
      </Box>

      <div className={`flex justify-center ${!isAuthenticated ? 'filter blur-sm' : ''}`}>
        <Button
          variant="contained"
          color="primary"
          endIcon={<KeyboardTabOutlinedIcon />}
          onClick={handleBooking}
          disabled={!isAuthenticated}
          sx={{
            fontWeight: "bold",
            textTransform: "none",
            backgroundColor: "#72b626",
            marginBottom: "40px",
            "&:hover": { backgroundColor: "#6aa51f" },
            opacity: !isAuthenticated ? 0.7 : 1,
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Data;
