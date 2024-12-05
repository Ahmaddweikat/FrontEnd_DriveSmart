import { useState, useEffect,useCallback } from 'react';

export const useTimer = (initialTime, onTimeUp) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const resetTimer = useCallback(() => {
    setTimeRemaining(initialTime);
    setIsActive(true);
  }, [initialTime]);

  const stopTimer = useCallback(() => {
    setIsActive(false);
  }, []);
  useEffect(() => {
    let timer;
    if (isActive && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            onTimeUp();
            setIsActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isActive, timeRemaining, onTimeUp]);

  return {
    timeRemaining,
    isTimeUp: timeRemaining === 0,
    resetTimer,
    stopTimer
  };
};