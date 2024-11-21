import { useState } from "react";

export const useQuizState = (questions, isAutoMove) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answersState, setAnswersState] = useState(
    questions.map(() => ({
      selectedOption: null,
      isAnswerChecked: false,
      isCorrect: false,
      isAnswerSubmitted: false,
      isFlagged: false,
    }))
  );
  const [progressWidth, setProgressWidth] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const handleNextQuestion = () => {
    setAnswersState((prevState) => {
      const updatedState = [...prevState];
      updatedState[currentQuestionIndex].isAnswerSubmitted = true;
      return updatedState;
    });

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleOptionSelect = (index) => {
    if (!answersState[currentQuestionIndex].isAnswerChecked) {
      setAnswersState((prevState) => {
        const updatedState = [...prevState];
        updatedState[currentQuestionIndex].selectedOption = index;
        return updatedState;
      });

      if (isAutoMove) {
        setTimeout(handleNextQuestion, 700);
      }
    }
  };

  const handleCheckAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect =
      answersState[currentQuestionIndex].selectedOption ===
      currentQuestion.correctAnswer;

    setAnswersState((prevState) => {
      const updatedState = [...prevState];
      updatedState[currentQuestionIndex].isAnswerChecked = true;
      updatedState[currentQuestionIndex].isCorrect = isCorrect;
      updatedState[currentQuestionIndex].isAnswerSubmitted = true;
      return updatedState;
    });
  };

  return {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answersState,
    setAnswersState,
    progressWidth,
    setProgressWidth,
    isQuizCompleted,
    setIsQuizCompleted,
    handleNextQuestion,
    handleOptionSelect,
    handleCheckAnswer,
  };
};
