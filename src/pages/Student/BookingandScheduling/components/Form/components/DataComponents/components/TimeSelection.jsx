import React from "react";
import {
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
  Fade,
  IconButton,
  Tooltip,
} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
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
    <Box sx={{ py: 2 }}>
      <Paper elevation={0} sx={{ p: 3, backgroundColor: '#f8f9fa', borderRadius: 2, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <AccessTimeIcon sx={{ color: '#72b626' }} />
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
            Select Your Preferred Time
          </Typography>
        </Box>
        <TextField
          label="Select Time"
          type="time"
          value={selectedTimeInput}
          onChange={handleTimeInputChange}
          sx={{
            width: "300px",
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#fff',
              '&:hover': {
                '& > fieldset': {
                  borderColor: '#72b626',
                }
              }
            }
          }}
          variant="outlined"
        />
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <PersonIcon sx={{ color: '#72b626' }} />
                <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                  Available Trainers
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {selectedTimeInput ? (
                  <Fade in={true}>
                    <div>
                      {filteredTrainers.map(({ trainer, availableDays }) => (
                        <Card 
                          key={trainer} 
                          variant="outlined" 
                          sx={{ 
                            mb: 2,
                            borderColor: selectedTrainer === trainer ? '#72b626' : '#e0e0e0',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                              borderColor: '#72b626',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                            }
                          }}
                        >
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PersonIcon sx={{ color: selectedTrainer === trainer ? '#72b626' : '#757575' }} />
                                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                  {trainer}
                                </Typography>
                              </Box>
                              <Button
                                variant={selectedTrainer === trainer ? "contained" : "outlined"}
                                onClick={() => handleTrainerSelect(trainer)}
                                sx={{
                                  backgroundColor: selectedTrainer === trainer ? "#72b626" : "transparent",
                                  borderColor: '#72b626',
                                  color: selectedTrainer === trainer ? "#fff" : "#72b626",
                                  '&:hover': {
                                    backgroundColor: selectedTrainer === trainer ? "#66a322" : "rgba(114, 182, 38, 0.08)",
                                  },
                                }}
                              >
                                {selectedTrainer === trainer ? "Selected" : "Select Trainer"}
                              </Button>
                            </Box>

                            {selectedTrainer === trainer && (
                              <Fade in={true}>
                                <Box>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                    <EventAvailableIcon sx={{ color: '#72b626' }} fontSize="small" />
                                    <Typography variant="subtitle1" color="text.secondary">
                                      Available Days
                                    </Typography>
                                  </Box>
                                  <FormGroup row sx={{ gap: 1 }}>
                                    {availableDays.sort().map((day) => (
                                      <Chip
                                        key={day}
                                        label={day}
                                        onClick={() => handleDayChange({ target: { value: day, checked: !selectedDays.includes(day) } })}
                                        color={selectedDays.includes(day) ? "primary" : "default"}
                                        variant={selectedDays.includes(day) ? "filled" : "outlined"}
                                        sx={{
                                          borderColor: selectedDays.includes(day) ? '#72b626' : '#e0e0e0',
                                          backgroundColor: selectedDays.includes(day) ? '#72b626' : 'transparent',
                                          '&:hover': {
                                            backgroundColor: selectedDays.includes(day) ? '#66a322' : 'rgba(114, 182, 38, 0.08)',
                                          },
                                        }}
                                      />
                                    ))}
                                  </FormGroup>
                                </Box>
                              </Fade>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </Fade>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                    <AccessTimeIcon sx={{ fontSize: 48, color: '#72b626', opacity: 0.5, mb: 2 }} />
                    <Typography>
                      Please select a time to see available trainers
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          {selectedTrainer && selectedDays.length > 0 && selectedTimeInput && (
            <Card elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <DirectionsCarIcon sx={{ color: '#72b626' }} />
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                    Available Cars
                  </Typography>
                </Box>

                <Box sx={{ maxHeight: 'calc(100vh - 400px)', overflow: 'auto', pr: 1 }}>
                  {selectedDays.sort().map((day) => {
                    const filteredCarsForDay = Object.entries(
                      trainerCarTimes[selectedTrainer]?.[day] || {}
                    ).filter(([car, times]) => times.includes(selectedTimeInput));

                    return (
                      <Card key={day} variant="outlined" sx={{ mb: 2, borderColor: '#e0e0e0' }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <EventAvailableIcon sx={{ color: '#72b626' }} fontSize="small" />
                            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                              {day} ({getUpcomingDates([day])[day]})
                            </Typography>
                          </Box>

                          {filteredCarsForDay.length === 0 ? (
                            <Typography color="text.secondary">
                              No cars available for the selected time.
                            </Typography>
                          ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                              {filteredCarsForDay.map(([car]) => (
                                <Card
                                  key={car}
                                  variant="outlined"
                                  sx={{
                                    borderColor: selectedCars[day] === car ? '#72b626' : '#e0e0e0',
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                      borderColor: '#72b626',
                                      transform: 'translateY(-2px)',
                                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }
                                  }}
                                >
                                  <CardContent sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    '&:last-child': { pb: 2 }
                                  }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      <DirectionsCarIcon sx={{ color: selectedCars[day] === car ? '#72b626' : '#757575' }} />
                                      <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                          {car}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                          Available at {selectedTimeInput}
                                        </Typography>
                                      </Box>
                                    </Box>
                                    <Button
                                      variant={selectedCars[day] === car ? "contained" : "outlined"}
                                      onClick={() => handleCarSelect(car, day)}
                                      size="small"
                                      sx={{
                                        backgroundColor: selectedCars[day] === car ? "#72b626" : "transparent",
                                        borderColor: '#72b626',
                                        color: selectedCars[day] === car ? "#fff" : "#72b626",
                                        '&:hover': {
                                          backgroundColor: selectedCars[day] === car ? "#66a322" : "rgba(114, 182, 38, 0.08)",
                                        },
                                      }}
                                    >
                                      {selectedCars[day] === car ? "Selected" : "Select Car"}
                                    </Button>
                                  </CardContent>
                                </Card>
                              ))}
                            </Box>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
