import React, { useCallback, useState } from "react";
import { useQuizState } from "../hooks/useQuizState";
import { useTimer } from "../hooks/useTimer";
import { QuestionDisplay } from "./QuestionDisplay";
import { NavigationButtons } from "./NavigationButtons";
import QuizHistory from "./QuizHistory";
import { questions as quizQuestions } from "../data/Form2";
// import { questions as quizQuestions } from "../data/Form2";

const QuizApp = ({
  questions = quizQuestions,
  title = "Form1",
  timeLimit = "40 minutes",
}) => {
  // Parse time limit from string (e.g., "40 minutes")
  const parsedTimeLimit = parseInt(timeLimit.split(" ")[0], 10);

  const {
    currentQuestionIndex,
    isQuizCompleted,
    score,
    answersState,
    isAutoMove,
    setIsAutoMove,
    handleOptionClick,
    handleCheckAnswer,
    handleNextQuestion,
    handlePrevQuestion,
    handleRestartQuiz,
    setScore,
    setIsQuizCompleted,
    setAnswersState,
    handleCalendarClick,
    calculateFinalScore,
    handleFinishQuiz,
  } = useQuizState(questions);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const hasAttempts = () => {
    const history = JSON.parse(localStorage.getItem("quizHistory") || "{}");
    return (history[title] || []).length > 0;
  };

  const getLastAttempt = () => {
    const history = JSON.parse(localStorage.getItem("quizHistory") || "{}");
    const attempts = history[title] || [];
    return attempts[0] || null;
  };

  const Time = parsedTimeLimit; // Use parsed time
  const { timeRemaining, isTimeUp, resetTimer, stopTimer } = useTimer(
    Time,
    () => {
      const finalScore = calculateFinalScore();
      setScore(finalScore);
      setIsQuizCompleted(true);
      setAnswersState((prevState) =>
        prevState.map((questionState, index) => ({
          ...questionState,
          isAnswerChecked: true,
          isCorrect:
            questionState.selectedOption === questions[index].correctAnswer,
        }))
      );
    },
    !isQuizStarted
  );
  const handleFinishWithTimer = useCallback(() => {
    stopTimer();
    handleFinishQuiz();

    // Save quiz attempt to history
    const endTime = new Date();
    const timeSpent = startTime ? Math.floor((endTime - startTime) / 1000) : 0;
    const formattedTime = formatTime(timeSpent);

    const quizHistory = JSON.parse(localStorage.getItem("quizHistory") || "{}");

    // Calculate correct answers and score
    const correctAnswers = answersState.filter(
      (q, idx) => q.selectedOption === questions[idx].correctAnswer
    ).length;
    const calculatedScore = (correctAnswers / questions.length) * 100;
    const isPassed = calculatedScore >= 84;

    const newAttempt = {
      formName: title,
      date: new Date().toISOString(),
      score: calculatedScore,
      correctAnswers: correctAnswers,
      totalQuestions: questions.length,
      timeSpent: formattedTime,
      passed: isPassed,
    };

    quizHistory[title] = [...(quizHistory[title] || []), newAttempt].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    localStorage.setItem("quizHistory", JSON.stringify(quizHistory));

    // Log results to console
    console.log("Quiz Results:");
    console.log("Form:", title);
    console.log("Status:", isPassed ? "PASSED" : "FAILED");
    console.log("Score:", Math.round(calculatedScore) + "%");
    console.log("Correct Answers:", correctAnswers, "out of", questions.length);
    console.log("Time Spent:", formattedTime);
  }, [stopTimer, handleFinishQuiz, answersState, questions, startTime]);

  const handleRestartWithTimer = useCallback(() => {
    resetTimer();
    handleRestartQuiz();
  }, [resetTimer, handleRestartQuiz]);

  const calculateProgress = () => {
    const answeredQuestions = answersState.filter(
      (q) => q.selectedOption !== null
    ).length;
    return (answeredQuestions / questions.length) * 100;
  };

  // Format time helper
  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <>
      {!isQuizStarted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 transform animate-slideUp shadow-2xl border-2 border-green-200">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <span className="text-4xl">📝</span>
              </div>
              <h2 className="font-bold text-3xl text-green-600 mb-2">
                Ready to Start?
              </h2>
              <h3 className="text-xl text-gray-700 mb-4">{title}</h3>
              {hasAttempts() && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-blue-600 font-medium">
                    {(() => {
                      const lastAttempt = getLastAttempt();
                      if (lastAttempt) {
                        return `Last attempt: ${
                          lastAttempt.passed ? "Passed" : "Failed"
                        } with ${Math.round(lastAttempt.score)}%`;
                      }
                      return "";
                    })()}
                  </p>
                </div>
              )}
              <p className="text-gray-600 mb-6">
                You have {parsedTimeLimit} minutes to complete all questions.
                Good luck!
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setIsQuizStarted(true);
                    resetTimer();
                    setStartTime(new Date());
                  }}
                  className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors duration-300 w-full"
                >
                  Start Quiz
                </button>
                <button
                  onClick={() => setShowHistory(true)}
                  className="bg-gray-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-700 transition-colors duration-300 w-full"
                >
                  View History
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showHistory && (
        <QuizHistory formName={title} onClose={() => setShowHistory(false)} />
      )}

      <div className="flex justify-center items-center py-6">
        <div className="bg-white p-6 shadow-xl rounded-2xl w-full max-w-6xl flex mb-18 mx-4">
          {/* Main Content */}
          <div className="w-full p-0">
            <QuestionDisplay
              question={questions[currentQuestionIndex]}
              currentQuestionState={answersState[currentQuestionIndex]}
              onOptionClick={handleOptionClick}
              onFlagQuestion={() => {
                setAnswersState((prevState) => {
                  const newState = [...prevState];
                  newState[currentQuestionIndex] = {
                    ...newState[currentQuestionIndex],
                    isFlagged: !newState[currentQuestionIndex].isFlagged,
                  };
                  return newState;
                });
              }}
            />

            <NavigationButtons
              onPrev={handlePrevQuestion}
              onNext={handleNextQuestion}
              onCheck={handleCheckAnswer}
              isFirst={currentQuestionIndex === 0}
              isLast={currentQuestionIndex === questions.length - 1}
              isChecked={answersState[currentQuestionIndex].isAnswerChecked}
              onFinish={handleFinishWithTimer}
            />

            {/* Results Panel */}
            {isQuizCompleted && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
                <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 transform animate-slideUp shadow-2xl border-2 border-green-200">
                  <div className="text-center">
                    <div
                      className={`w-20 h-20 ${
                        score >= 84 ? "bg-green-100" : "bg-red-100"
                      } rounded-full mx-auto flex items-center justify-center mb-4`}
                    >
                      <span className="text-4xl">
                        {score >= 84 ? "🎉" : "😔"}
                      </span>
                    </div>
                    <h2
                      className={`font-bold text-3xl ${
                        score >= 84 ? "text-green-600" : "text-red-600"
                      } mb-2`}
                    >
                      {title} - {score >= 84 ? "Pass!" : "Fail"}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {score >= 84
                        ? "Congratulations!"
                        : "Required: 84% or higher"}
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 mb-8">
                      <p
                        className={`font-bold text-2xl ${
                          score >= 84 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {score.toFixed(0)}%
                      </p>
                      <p className="text-gray-600">
                        (
                        {
                          answersState.filter(
                            (q) =>
                              q.selectedOption ===
                              questions[answersState.indexOf(q)].correctAnswer
                          ).length
                        }{" "}
                        correct out of {questions.length} total questions)
                      </p>
                    </div>
                    <div className="space-x-4">
                      <button
                        onClick={handleRestartWithTimer}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                      >
                        Restart
                      </button>
                      <button
                        onClick={() => setIsQuizCompleted(false)}
                        className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
                      >
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-96 bg-gray-50 p-6 border-l rounded-r-2xl">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-gray-700">Progress</span>
              <span className="font-bold text-green-600">{`${calculateProgress().toFixed(
                0
              )}%`}</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div
                className="bg-green-600 h-3 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>

            <div className="flex justify-between pb-6">
              {/* Auto Move Switch */}
              <div className="flex items-center justify-start">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isAutoMove}
                      onChange={() => setIsAutoMove(!isAutoMove)}
                      className="sr-only"
                    />
                    <div
                      className={`block w-14 h-8 rounded-full transition duration-300 ${
                        isAutoMove ? "bg-green-600" : "bg-gray-300"
                      }`}
                    ></div>
                    <div
                      className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-all duration-300 shadow-sm ${
                        isAutoMove ? "translate-x-6" : ""
                      }`}
                    ></div>
                  </div>
                  <span className="ml-3 text-gray-700">Auto Move</span>
                </label>
              </div>

              {/* Timer Section */}
              <div className="flex items-center">
                <div className="font-bold text-xl text-green-600">
                  {isQuizStarted ? formatTime(timeRemaining) : formatTime(Time)}
                </div>
              </div>
            </div>

            {/* Sidebar Calendar */}
            <div className="grid grid-cols-5 gap-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleCalendarClick(index)}
                  className={`w-11 h-11 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-110 ${
                    answersState[index].isAnswerChecked
                      ? answersState[index].isCorrect
                        ? "bg-green-500 text-white shadow-lg"
                        : "bg-red-500 text-white shadow-lg"
                      : answersState[index].isFlagged
                      ? "bg-yellow-400 text-white shadow-lg"
                      : answersState[index].selectedOption !== null
                      ? "bg-gray-700 text-white shadow-lg"
                      : index === currentQuestionIndex
                      ? "bg-gray-400 text-white shadow-lg"
                      : "bg-white text-gray-700 border hover:border-green-400"
                  } flex justify-center items-center font-medium`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizApp;
