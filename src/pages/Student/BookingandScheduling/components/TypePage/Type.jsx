import React from "react";
import { Box } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import img2 from "../../../../../assets/BookingAndScheduling/type/images/learning.jpg";
import img3 from "../../../../../assets/BookingAndScheduling/type/images/practial.jpeg";
import img4 from "../../../../../assets/BookingAndScheduling/type/images/revision.png";
import LessonCard from "./components/LessonCard";

const Type = ({ onSelectLesson }) => {
  const lessons = [
    {
      title: "Theoretical Lesson",
      description: "Theoretical lesson focuses on understanding driving signs and rules of the road through comprehensive classroom instruction.",
      image: img2,
      icon: SchoolIcon,
      price: "75"
    },
    {
      title: "Practical Lesson",
      description: "Hands-on driving experience to master vehicle control, road safety, and real-world driving scenarios.",
      image: img3,
      icon: DriveEtaIcon,
      price: "90"
    },
    {
      title: "Revision Lesson",
      description: "Comprehensive review session to reinforce your driving skills and prepare for your driving test.",
      image: img4,
      icon: AutoStoriesIcon,
      price: "60"
    }
  ];

  const handleLessonSelect = (lessonTitle) => {
    console.log("Selected lesson:", lessonTitle);
    if (onSelectLesson) {
      onSelectLesson(lessonTitle);
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
          {lessons.map((lesson, index) => (
            <LessonCard 
              key={index} 
              {...lesson} 
              onSelect={() => handleLessonSelect(lesson.title)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Type;