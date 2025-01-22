import { useState } from 'react';

const useLessonCancellation = (onUpdateLesson) => {
  const [cancelReason, setCancelReason] = useState("");
  const [lessonToCancel, setLessonToCancel] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleCancelLesson = (lesson) => {
    setLessonToCancel(lesson);
    setShowCancelModal(true);
  };

  const confirmCancellation = () => {
    if (!cancelReason.trim()) {
      alert("Please provide a reason for cancellation");
      return;
    }
    
    const updatedLesson = {
      ...lessonToCancel,
      status: "canceled",
      reason: cancelReason.trim()
    };
    
    onUpdateLesson(updatedLesson, 0, cancelReason.trim(), "canceled");
    resetCancellationState();
  };

  const resetCancellationState = () => {
    setShowCancelModal(false);
    setCancelReason("");
    setLessonToCancel(null);
  };

  return {
    cancelReason,
    showCancelModal,
    setCancelReason,
    handleCancelLesson,
    confirmCancellation,
    resetCancellationState
  };
};

export default useLessonCancellation;
