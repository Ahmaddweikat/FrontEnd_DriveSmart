import React, { useState } from "react";
import { Box, Typography, Grid, TextField, Button, Divider, MenuItem } from "@mui/material";

import CalculateIcon from '@mui/icons-material/Calculate';

const LESSON_TYPES = [
  { type: "Theoretical Lesson", cost: 75 },
  { type: "Practical Lesson", cost: 90 },
  { type: "Revision Lesson", cost: 60 }
];

const Details = ({ selectedLessonType, numberOfLessons }) => {

  const calculateTotalCost = () => {
    const lessonType = LESSON_TYPES.find(lesson => lesson.type === selectedLessonType);
    return lessonType ? lessonType.cost * numberOfLessons : 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking confirmed", {
      lessonType: selectedLessonType,
      numberOfLessons,
      totalCost: calculateTotalCost()
    });
  };
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box sx={{ 
        mt: 4, 
        p: 3, 
        bgcolor: 'rgba(114, 182, 38, 0.1)', 
        borderRadius: 2,
        border: '1px dashed #72b626'
      }}>
        <Typography variant="h6">
          <CalculateIcon color="primary" />
          Selected Lesson Details
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography color="text.secondary">Lesson Type:</Typography>
            <Typography fontWeight={500}>{selectedLessonType}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography color="text.secondary">Cost per lesson:</Typography>
            <Typography fontWeight={500}>
              ${LESSON_TYPES.find(lesson => lesson.type === selectedLessonType)?.cost || 0}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography color="text.secondary">Number of lessons:</Typography>
            <Typography fontWeight={500}>{numberOfLessons}</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Total Cost:</Typography>
            <Typography variant="h5" color="primary" fontWeight={600}>
              ${calculateTotalCost()}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          mt: 3,
          bgcolor: '#72b626',
          color: 'white',
          py: 1.5,
          fontSize: '1.1rem',
          fontWeight: 500,
          '&:hover': {
            bgcolor: '#5a9320'
          }
        }}
      >
        Confirm Booking
      </Button>
    </Box>
  );
};
export default Details;