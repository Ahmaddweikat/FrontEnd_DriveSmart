import React from "react";
import { Box } from "@mui/material";

import LessonCard from "./components/LessonCard";
import {lessons} from "../../constants/lessons"

const Type = ({ onSelectLesson }) => {
  const studentLessonCount = 10; // Example value
  const REQUIRED_LESSONS = 15;

  const lessonsWithLockStatus = lessons.map(lesson => ({
    ...lesson,
    isLocked: lesson.type === "revision" ? studentLessonCount < REQUIRED_LESSONS : false,
    description: lesson.type === "revision" && studentLessonCount < REQUIRED_LESSONS
      ? `${lesson.description} (Requires ${REQUIRED_LESSONS} lessons, you have ${studentLessonCount})`
      : lesson.description
  }));

  const handleLessonSelect = (lesson) => {
    if (lesson.isLocked) {
      return;
    }
    console.log("Selected lesson:", lesson.title);
    if (onSelectLesson) {
      onSelectLesson(lesson.title);
    }
  };
  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: '#f8fafc',
      py: 6
    }}>
      <Box sx={{ 
        maxWidth: 'screen-xl',
        mx: 'auto',
        px: 4
      }}>
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(3, 1fr)'
          },
          gap: 4
        }}>
          {lessonsWithLockStatus.map((lesson, index) => (
            <LessonCard 
              key={index} 
              {...lesson} 
              onSelect={() => handleLessonSelect(lesson)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Type;