import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faFlag } from "@fortawesome/free-solid-svg-icons";
import { questions } from "../Forms/Form1"; // Import the questions array

const QuizApp = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(10); // 10 seconds for each question
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [countdownTime, setCountdownTime] = useState(2400); // 40 minutes in seconds
  const [isAutoMove, setIsAutoMove] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [CurrentQuestionState, setCurrentQuestionState] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0); // State for animated progress bar
  const [score, setScore] = useState(null);
  const [isTimerEnded, setIsTimerEnded] = useState(false);

  // Create an array of states for each question
  const [answersState, setAnswersState] = useState(
    questions.map(() => ({
      selectedOption: null,
      isAnswerChecked: false,
      isCorrect: false,
      isAnswerSubmitted: false,
      isFlagged: false, // Add flag state
    }))
  );
  const toggleFlagQuestion = () => {
    setAnswersState((prevState) => {
      const updatedState = [...prevState];
      updatedState[currentQuestionIndex] = {
        ...currentQuestionState,
        isFlagged: !currentQuestionState.isFlagged, // Toggle flag state
      };
      return updatedState;
    });
  };
  const handleCalendarClick = (index) => {
    if (!isQuizCompleted) {
      setAnswersState((prevState) => {
        const updatedState = [...prevState];
        updatedState[currentQuestionIndex] = {
          ...currentQuestionState,
          selectedOption: currentQuestionState.selectedOption, // Preserve the selected answer
        };
        return updatedState;
      });

      setCurrentQuestionIndex(index);
    } else {
      setCurrentQuestionIndex(index);
    }
  };
  // Effect to update progress when the current question changes
  useEffect(() => {
    // Calculate the progress width based on the number of questions
    setProgressWidth((currentQuestionIndex / questions.length) * 100); // Change to currentQuestionIndex
  }, [currentQuestionIndex]);

  // Get current question state
  const currentQuestionState = answersState[currentQuestionIndex];
  useEffect(() => {
    setCurrentQuestionState(answersState[currentQuestionIndex]);
  }, [currentQuestionIndex]);

  const handleOptionClick = (index) => {
    // Allow selection only if the answer is not checked and quiz is not completed
    if (!currentQuestionState.isAnswerChecked && !isQuizCompleted) {
      setAnswersState((prevState) => {
        const updatedState = [...prevState];
        updatedState[currentQuestionIndex] = {
          ...currentQuestionState,
          selectedOption: index,
        };
        return updatedState;
      });
      setProgressWidth(
        ((answersState.filter((answer) => answer.isAnswerSubmitted).length +
          1) /
          questions.length) *
          100
      ); // Update progress
    }
    if (isAutoMove) {
      setTimeout(() => {
        handleNextQuestion(); // Move to the next question automatically
      }, 700); // 2 seconds delay before moving to the next question
    }
  };

  const handleCheckAnswer = () => {
    const isCorrect =
      currentQuestionState.selectedOption ===
      questions[currentQuestionIndex].correctAnswer;

    setAnswersState((prevState) => {
      const updatedState = [...prevState];
      updatedState[currentQuestionIndex] = {
        ...currentQuestionState,
        isAnswerChecked: true,
        isCorrect,
        isAnswerSubmitted: true,
      };
      return updatedState;
    });

    // Move to the next question after a delay if auto-move is enabled
    if (isAutoMove) {
      setTimeout(() => {
        handleNextQuestion();
      }, 2000); // 2 seconds delay to show answer feedback
    }
  };

  const handleNextQuestion = () => {
    // Save the selected answer without checking if it's correct
    setAnswersState((prevState) => {
      const updatedState = [...prevState];
      updatedState[currentQuestionIndex] = {
        ...currentQuestionState,
        isAnswerSubmitted: true, // Mark the answer as submitted
      };
      return updatedState;
    });

    // Move to the next question or set quiz as completed
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizCompleted(true); // Set quiz completed state
    }
  };

  const calculateScore = () => {
    return answersState.reduce((score, questionState, index) => {
      // Only check answers for submitted questions
      if (questionState.selectedOption !== null) {
        return questionState.selectedOption === questions[index].correctAnswer
          ? score + 1
          : score;
      }
      return score;
    }, 0);
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const currentQuestion = questions[currentQuestionIndex];
  useEffect(() => {
    if (isTimeUp) return; // Do not start timer if time is up

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeUp(true);
          return 0; // Set time remaining to 0
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimeUp]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setCountdownTime((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          const finalScore = calculateScore();
          setScore(finalScore); // Update the score state
          return 0; // Set countdown time to 0
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  // Convert countdown time to MM:SS format
  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
  return (
    <>
      {/* Calendar Section */}
      <div className="flex justify-center py-4 border-1 border-gray-100 bg-gray-200 mt-1.5">
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => handleCalendarClick(index)} // Add click handler here
            className={`w-7 h-12 rounded-lg ${
              index === currentQuestionIndex
                ? "bg-green-500 text-white" // Change to green for active
                : "bg-white text-gray-700 border"
            } flex justify-center items-center`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white p-4 shadow-md w-full max-w-6xl flex mb-24">
          {/* Main Content: Questions and Answers */}
          <div className="w-full p-0">
            <div className="flex flex-col mt-0 border-2 border-t-0 bg-customGrayBG relative">
              <div className="flex items-center p-4">
                <div className="flex-1 text-center mr-2">
                  <span className="font-bold">{currentQuestion.id}-</span>
                  {currentQuestion.question}
                  {currentQuestion.image && (
                    <img
                      src={currentQuestion.image}
                      alt="Question"
                      className="inline w-18 h-18 ml-2"
                    />
                  )}
                  {currentQuestion.image && <span>:</span>}
                </div>
                {/* Flag Button */}
                <button
                  onClick={toggleFlagQuestion}
                  className="ml-4 mt-auto text-red-500 transition duration-100 transform hover:scale-110 text-lg "
                >
                  <FontAwesomeIcon icon={faFlag} />
                </button>
              </div>
              <div className="bg-white h-3 w-full"></div>
            </div>
            <div className="grid grid-cols-1 mb-4">
              {currentQuestion.options.map((option, index) => {
                let icon = null;

                if (currentQuestionState.isAnswerChecked) {
                  if (index === currentQuestion.correctAnswer) {
                    icon = (
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-green-800 ml-2"
                      />
                    );
                  } else if (currentQuestionState.selectedOption === index) {
                    icon = (
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="text-red-800 ml-2"
                      />
                    );
                  }
                }

                // Check if the option is an image path (assuming image paths contain "Images/")
                const isImageOption =
                  typeof option === "string" && option.includes("Images/");

                const defaultBgClass =
                  index === 0 || index === 2
                    ? "bg-gray-50" // First and third options
                    : "bg-customGrayOp"; // Second and fourth options

                return (
                  <div
                    key={index}
                    onClick={() => handleOptionClick(index)}
                    className={`flex items-center border-2 p-2 cursor-pointer h-14 ${
                      currentQuestionState.isAnswerChecked
                        ? index === currentQuestion.correctAnswer
                          ? "border-green-600 bg-green-600" // Correct answer background
                          : currentQuestionState.selectedOption === index
                          ? "border-red-500 bg-red-500" // Incorrect answer background
                          : `border-gray-100 ${defaultBgClass}` // Default background for non-selected options
                        : currentQuestionState.selectedOption === index
                        ? "border-green-500 bg-green-500" // Selected option before checking
                        : `border-gray-100 ${defaultBgClass}` // Default background before selection
                    }`}
                  >
                    <span className="font-bold mr-2">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <div className="border-l h-full mx-2 border-gray-500"></div>
                    <span className="flex-1 flex items-center">
                      {isImageOption ? (
                        <img
                          src={option}
                          alt={`Option ${index + 1}`}
                          className="ml-2"
                          style={{ width: "50px", height: "50px" }}
                        />
                      ) : (
                        option
                      )}
                      {icon}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Backward{" "}
              </button>

              <div className="flex-grow flex justify-center">
                <button
                  className="bg-yellow-400 text-white px-4 py-2 rounded"
                  onClick={handleCheckAnswer}
                  disabled={currentQuestionState.isAnswerChecked}
                >
                  Check the answer{" "}
                </button>
              </div>

              {currentQuestionIndex === questions.length - 1 ? (
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded"
                  onClick={() => {
                    setIsQuizCompleted(true); // Set quiz to completed
                    // const score = calculateScore(); // Calculate score when finishing

                    // Update answersState with whether each question was answered correctly
                    setAnswersState((prevState) =>
                      prevState.map((questionState, index) => ({
                        ...questionState,
                        isCorrect:
                          questionState.selectedOption ===
                          questions[index].correctAnswer,
                        isAnswerChecked: true, // Mark all answers as checked
                      }))
                    );
                  }}
                >
                  Finish
                </button>
              ) : (
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded"
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                >
                  Next
                </button>
              )}
            </div>

            {/* Display Correct Answer if Checked */}
            {isQuizCompleted && currentQuestionState.isAnswerChecked && (
              <div
                className={`mt-4 p-4 border rounded ${
                  currentQuestionState.isCorrect
                    ? "bg-green-100 border-green-400 text-green-700"
                    : "bg-red-100 border-red-400 text-red-700"
                }`}
              >
                <p>
                  {currentQuestionState.isCorrect ? "Correct!" : "Incorrect!"}{" "}
                  Correct Answer:{" "}
                  <span className="font-bold">
                    {
                      currentQuestion.options[
                        questions[currentQuestionIndex].correctAnswer
                      ]
                    }
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Sidebar: Calendar and Progress */}
          <div className="w-80 bg-gray-50 p-4 border-l">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Current progress:</span>
              <span className="font-semibold">{`${progressWidth.toFixed(
                0
              )}%`}</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div
                className="bg-green-500 h-2.5 rounded-full transition-all duration-500 ease-in-out" // Add transition classes
                style={{ width: `${progressWidth}%` }}
              ></div>
            </div>

            <div className=" flex justify-between pb-4">
              {/* Auto Move Switch */}
              <div className="flex items-center justify-start pt-1">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isAutoMove}
                      onChange={() => setIsAutoMove(!isAutoMove)}
                      className="sr-only" // Hide the default checkbox
                    />
                    <div
                      className={`block w-14 h-8 rounded-full ${
                        isAutoMove ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></div>
                    <div
                      className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                        isAutoMove ? "translate-x-full" : ""
                      }`}
                    ></div>
                  </div>
                  <span className="ml-3">Auto Move</span>
                </label>
              </div>

              {/* Timer Section */}
              <div className="flex justify-end pt-1 ">
                <div className="font-bold text-lg">
                  {formatTime(countdownTime)}
                </div>
              </div>
            </div>
            {/* Sidebar Calendar Section */}
            <div className="grid grid-cols-5 gap-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleCalendarClick(index)} // Add click handler for sidebar calendar
                  className={`w-10 h-10 ${
                    answersState[index].isAnswerChecked
                      ? answersState[index].isCorrect
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : answersState[index].isFlagged // Check if the question is flagged
                      ? "bg-yellow-400 text-white" // Yellow for flagged questions
                      : answersState[index].selectedOption !== null // Check if an answer has been selected
                      ? "bg-customGrayOption text-white" // Set to blue if an answer is chosen
                      : index === currentQuestionIndex
                      ? "bg-gray-400 text-white"
                      : "bg-white text-gray-700 border"
                  } flex justify-center items-center rounded`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            {/* Results Panel */}
            {isQuizCompleted && (
              <div className="mt-4 p-4 border rounded bg-blue-100">
                <h2 className="font-bold text-lg">Quiz Completed!</h2>
                <p>
                  Your score: {score} out of {questions.length} (
                  {((score / questions.length) * 100).toFixed(0)}%)
                </p>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
                  onClick={() => {
                    setIsQuizCompleted(false);
                    setCurrentQuestionIndex(0);
                    setProgressWidth(0);
                    setAnswersState(
                      questions.map(() => ({
                        selectedOption: null,
                        isAnswerChecked: false,
                        isCorrect: false,
                        isAnswerSubmitted: false,
                      }))
                    ); // Reset answer states
                    setScore(0); // Reset score
                    setIsTimerEnded(false); // Reset timer state
                  }}
                >
                  Restart Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizApp;
