import { useState } from 'react';

const useFeedbackManagement = (onUpdateLesson, closeModal, closePanel) => {
  const [selectedRatingState, setSelectedRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isEditingFeedback, setIsEditingFeedback] = useState(false);

  const handleSubmitFeedback = (selectedLesson) => {
    if (selectedRatingState === 0 || !feedback.trim()) {
      alert("Please provide both rating and feedback.");
      return;
    }

    onUpdateLesson(selectedLesson, selectedRatingState, feedback.trim());

    alert(selectedLesson.rating > 0 ? "Feedback updated successfully!" : "Feedback submitted successfully!");
    closeModal();
    closePanel();
  };

  const handleRating = (rating) => {
    setSelectedRating(rating);
  };

  const handleEditFeedback = (e, lesson, openModal) => {
    e.stopPropagation();
    openModal(lesson);
    setIsEditingFeedback(true);
    setFeedback(lesson.feedback || "");
    setSelectedRating(lesson.rating || 0);
  };

  const resetFeedbackState = (lesson) => {
    setIsEditingFeedback(false);
    setFeedback(lesson.feedback || "");
    setSelectedRating(lesson.rating || 0);
  };

  return {
    selectedRatingState,
    feedback,
    isEditingFeedback,
    setFeedback,
    handleSubmitFeedback,
    handleRating,
    handleEditFeedback,
    resetFeedbackState,
    setIsEditingFeedback
  };
};

export default useFeedbackManagement;
