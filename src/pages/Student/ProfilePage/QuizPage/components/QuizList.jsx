import React from "react";
import { CheckCircle, Schedule, Assignment, Done, Close } from '@mui/icons-material';

const QuizList = ({ quizzes }) => {
  // Check if there are no quizzes to display
  if (quizzes.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg text-center text-gray-500">
        No quizzes found matching the selected filter.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {quizzes.map((quiz) => (
        <div key={quiz.title} className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">{quiz.title}</h3>

            {quiz.status === "PASSED" ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center border-2 border-green-500 bg-green-500 text-white rounded-full w-20 h-15">
                  <span className="text-sm font-semibold">Passed</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center border-2 border-red-500 bg-red-500 text-white rounded-full w-20 h-15">
                  <span className="text-sm font-semibold">Failed</span>
                </div>
              </div>
            )}
          </div>

          {/* Date and Duration in Light Font */}
          <p className="text-gray-500 text-sm mt-1">
          Date: {new Date(quiz.completedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} | Duration: {quiz.timeSpent}
          </p>

          <div className="flex justify-between items-start mt-10">
            <div>
              <p className="text-black-700 font-small">
                <strong>Category:</strong> {quiz.category}
              </p>
              <p className="text-black-500 text-sm mt-2">
                <strong>Score: </strong> {quiz.score}%
              </p>
              <p className="text-black-500 text-sm mt-2">
                <strong>Correct Answers: </strong> ({quiz.correctAnswers} correct)
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizList;
