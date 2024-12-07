import React from 'react';

const QuizHistory = ({ formName, onClose }) => {
  // Get history from localStorage
  const getQuizHistory = () => {
    const history = localStorage.getItem('quizHistory');
    return history ? JSON.parse(history) : {};
  };

  const history = getQuizHistory()[formName] || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 transform shadow-2xl border-2 border-green-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-600">Quiz History - {formName}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        {history.length === 0 ? (
          <p className="text-gray-600 text-center">No previous attempts found.</p>
        ) : (
          <>
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-600">
                Total Attempts: {history.length}<br />
                Passed: {history.filter(attempt => attempt.passed).length}<br />
                Best Score: {Math.round(Math.max(...history.map(attempt => attempt.score)))}%
              </p>
            </div>
            <div className="space-y-4">
              {history.map((attempt, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    attempt.passed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">
                        {attempt.passed ? 'Pass' : 'Fail'} - {Math.round(attempt.score)}%
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(attempt.date).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {attempt.correctAnswers} / {attempt.totalQuestions} correct
                      </p>
                      <p className="text-sm text-gray-600">
                        Time: {attempt.timeSpent}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizHistory;
