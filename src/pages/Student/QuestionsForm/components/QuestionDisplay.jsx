import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faFlag } from "@fortawesome/free-solid-svg-icons";

export const QuestionDisplay = ({ 
  question, 
  currentQuestionState, 
  onOptionClick,
  onFlagQuestion  
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="flex flex-col mt-0 border border-gray-100 bg-white rounded-xl shadow-sm relative">
        <div className="flex items-center p-6">
          <div className="flex-1 text-center mr-2 text-lg">
            <span className="font-bold text-green-600">
              {question.id}.{" "}
            </span>
            {question.question}
            {question.image && (
              <img
                src={question.image}
                alt="Question"
                className="inline w-20 h-20 ml-3 rounded-lg shadow-sm"
              />
            )}
          </div>
          <button
                onClick={() => onFlagQuestion(question.id)}
                className={`ml-4 p-2 rounded-lg transition-all duration-300 hover:bg-yellow-50 ${
                  currentQuestionState.isFlagged ? 'text-yellow-500' : 'text-gray-400'
                }`}
                title={currentQuestionState.isFlagged ? "Unflag question" : "Flag question for review"}
              >
                 <FontAwesomeIcon
                  icon={faFlag}
                  className={`text-xl ${
                    currentQuestionState.isFlagged ? 'transform scale-110' : ''
                  }`}
                />
              </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 my-6">
        {question.options.map((option, index) => {
          let icon = null;

          if (currentQuestionState.isAnswerChecked) {
            if (index === question.correctAnswer) {
              icon = (
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-green-600 ml-2 text-xl"
                />
              );
            } else if (currentQuestionState.selectedOption === index) {
              icon = (
                <FontAwesomeIcon
                  icon={faTimes}
                  className="text-red-600 ml-2 text-xl"
                />
              );
            }
          }

          const isImageOption =
            typeof option === "string" && option.includes("Images/");

          return (
            <div
              key={index}
              onClick={() => onOptionClick(index)}
              className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-[1.01] ${
                currentQuestionState.isAnswerChecked
                  ? index === question.correctAnswer
                    ? "bg-green-50 border-2 border-green-500 shadow-green-100"
                    : currentQuestionState.selectedOption === index
                    ? "bg-red-50 border-2 border-red-500 shadow-red-100"
                    : "bg-white border-2 border-gray-100 hover:border-green-200"
                  : currentQuestionState.selectedOption === index
                  ? "bg-green-50 border-2 border-green-500 shadow-lg"
                  : "bg-white border-2 border-gray-100 hover:border-green-200"
              }`}
            >
              <span className="font-bold text-lg text-green-600 mr-3">
                {String.fromCharCode(65 + index)}
              </span>
              <div className="border-l h-8 mx-3 border-gray-300"></div>
              <span className="flex-1 flex items-center text-gray-700">
                {isImageOption ? (
                  <img
                    src={option}
                    alt={`Option ${index + 1}`}
                    className="ml-2 rounded-lg shadow-sm"
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
    </div>
  );
};