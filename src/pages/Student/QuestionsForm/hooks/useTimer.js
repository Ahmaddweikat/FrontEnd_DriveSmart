import { useState, useEffect } from "react";

export const useTimer = (initialTime, onComplete) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    if (timeRemaining <= 0) {
      onComplete && onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, onComplete]);

  const resetTimer = (newTime) => {
    setTimeRemaining(newTime);
  };

  return [timeRemaining, resetTimer];
};
