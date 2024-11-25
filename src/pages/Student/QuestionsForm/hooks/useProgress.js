import { useEffect, useState } from "react";

export const useProgress = (currentQuestionIndex, totalQuestions) => {
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    setProgressWidth((currentQuestionIndex / totalQuestions) * 100);
  }, [currentQuestionIndex, totalQuestions]);

  return progressWidth;
};
