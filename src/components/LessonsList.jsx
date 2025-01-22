import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Chip,
  Box
} from '@mui/material';

const LessonsList = ({ lessons }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'upcoming':
        return 'primary';
      case 'canceled':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleLessonClick = (lesson) => {
    // Create a URL-friendly identifier for the lesson
    const lessonId = encodeURIComponent(lesson.title.toLowerCase().replace(/\s+/g, '-'));
    navigate(`/trainer/lessons/${lessonId}`, { state: { lesson } });
  };

  return (
    <List className="bg-white rounded-lg shadow">
      {lessons.map((lesson, index) => (
        <ListItem
          key={index}
          className="hover:bg-gray-50 cursor-pointer"
          onClick={() => handleLessonClick(lesson)}
          divider={index !== lessons.length - 1}
        >
          <ListItemText
            primary={
              <Box className="flex items-center justify-between">
                <Typography variant="subtitle1" component="span">
                  {lesson.title}
                </Typography>
                <Chip
                  label={lesson.status}
                  color={getStatusColor(lesson.status)}
                  size="small"
                />
              </Box>
            }
            secondary={
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {lesson.student} • {lesson.duration}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(lesson.date).toLocaleDateString()}
                </Typography>
                {lesson.rating > 0 && (
                  <Typography variant="body2" color="text.secondary">
                    {'⭐'.repeat(lesson.rating)}
                  </Typography>
                )}
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default LessonsList;
