import { useState } from "react";

const useRatingFilter = (handleFilterSelect) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
    handleFilterSelect(rating); // This should set the filter in Lessons
  };

  const resetRating = () => {
    setSelectedRating(0);
    setHoveredRating(0);
  };

  return {
    hoveredRating,
    selectedRating,
    setHoveredRating,
    handleRatingClick,
    resetRating,
  };
};

export default useRatingFilter;
