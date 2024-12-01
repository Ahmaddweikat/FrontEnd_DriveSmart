// hooks/StudentDashboard/LessonPage/useRatingFilter.js
import { useState } from "react";

const useRatingFilter = (handleFilterSelect) => {
  const [hoveredRating, setHoveredRating] = useState(0); // Store hover state
  const [selectedRating, setSelectedRating] = useState(0); // Store selected rating

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
    handleFilterSelect(rating); // Pass rating to filter function
  };

  const resetRating = () => {
    setSelectedRating(0);
    setHoveredRating(0);
  };

  return {
    hoveredRating,
    setHoveredRating, // Return the setHoveredRating function
    selectedRating,
    setSelectedRating, // Return setSelectedRating function
    handleRatingClick,
    resetRating,
  };
};

export default useRatingFilter;
