import { useState, useEffect, useCallback } from "react";

export const useQuizState = (questions) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [score, setScore] = useState(null);
  const [progressWidth, setProgressWidth] = useState(0);
  const [isAutoMove, setIsAutoMove] = useState(false);
  const [answersState, setAnswersState] = useState(() =>
    questions.map(() => ({
      selectedOption: null,
      isAnswerChecked: false,
      isCorrect: false,
      isAnswerSubmitted: false,
      isFlagged: false,
    }))
  );

  const calculateFinalScore = useCallback(() => {
    const totalAnswered = answersState.filter(q => q.selectedOption !== null).length;
    if (totalAnswered === 0) return 0;
    
    const totalCorrect = answersState.reduce((score, questionState, index) => {
      if (questionState.selectedOption === questions[index].correctAnswer) {
        return score + 1;
      }
      return score;
    }, 0);
    return (totalCorrect / questions.length) * 100;
  }, [answersState, questions]);

  const handleFinishQuiz = useCallback(() => {
    setIsQuizCompleted(true);
    const finalScore = calculateFinalScore();
    setScore(finalScore);
    console.log("Final score:", finalScore);
    
    // Mark all answers as checked and update their correctness
    setAnswersState((prevState) =>
      prevState.map((state, index) => ({
        ...state,
        isAnswerChecked: true,
        isCorrect: state.selectedOption === questions[index].correctAnswer,
      }))
    );
  }, [questions, calculateFinalScore]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  const handlePrevQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [currentQuestionIndex]);

  const handleOptionClick = useCallback((index) => {
    if (!answersState[currentQuestionIndex].isAnswerChecked && !isQuizCompleted) {
      setAnswersState((prevState) => {
        const updatedState = [...prevState];
        updatedState[currentQuestionIndex] = {
          ...updatedState[currentQuestionIndex],
          selectedOption: index,
          isAnswerSubmitted: true,
        };
        return updatedState;
      });

      if (isAutoMove) {
        setTimeout(handleNextQuestion, 700);
      }
    }
  }, [answersState, currentQuestionIndex, isQuizCompleted, isAutoMove, handleNextQuestion]);

  const handleCheckAnswer = useCallback(() => {
    setAnswersState((prevState) => {
      const updatedState = [...prevState];
      const currentQuestion = questions[currentQuestionIndex];
      updatedState[currentQuestionIndex] = {
        ...updatedState[currentQuestionIndex],
        isAnswerChecked: true,
        isCorrect: updatedState[currentQuestionIndex].selectedOption === currentQuestion.correctAnswer,
      };
      return updatedState;
    });
  }, [currentQuestionIndex, questions]);

  const handleCalendarClick = useCallback((index) => {
    setCurrentQuestionIndex(index);
  }, []);

  const handleRestartQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setIsQuizCompleted(false);
    setScore(null);
    setProgressWidth(0);
    setAnswersState(
      questions.map(() => ({
        selectedOption: null,
        isAnswerChecked: false,
        isCorrect: false,
        isAnswerSubmitted: false,
        isFlagged: false,
      }))
    );
  }, [questions]);

  useEffect(() => {
    setProgressWidth((currentQuestionIndex / questions.length) * 100);
  }, [currentQuestionIndex, questions.length]);

  return {
    currentQuestionIndex,
    isQuizCompleted,
    score,
    progressWidth,
    answersState,
    isAutoMove,
    setIsAutoMove,
    handleOptionClick,
    handleCheckAnswer,
    handleNextQuestion,
    handlePrevQuestion,
    handleRestartQuiz,
    questions,
    setScore,
    setIsQuizCompleted,
    setAnswersState,
    handleCalendarClick,
    calculateFinalScore,
    handleFinishQuiz
  };
};