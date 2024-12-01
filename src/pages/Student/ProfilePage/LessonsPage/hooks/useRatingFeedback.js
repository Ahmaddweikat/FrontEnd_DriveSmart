import { useState } from "react";

const useRatingFeedback = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setShowFeedback(newRating <= 3);
  };

  const resetFeedback = () => {
    setRating(0);
    setFeedback("");
    setShowFeedback(false);
  };

  return {
    rating,
    feedback,
    showFeedback,
    handleRatingChange,
    setFeedback,
    resetFeedback,
  };
};

export default useRatingFeedback;
