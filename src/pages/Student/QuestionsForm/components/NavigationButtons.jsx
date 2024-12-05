import React from 'react';

export const NavigationButtons = ({
  onPrev,
  onNext,
  onCheck,
  isFirst,
  isLast,
  isChecked,
  onFinish
}) => {
  return (
    <div className="flex justify-between -mt-2">
      <button
        className="bg-red-600 text-white px-6 py-3 rounded-lg transition duration-300 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        onClick={onPrev}
        disabled={isFirst}
      >
        Previous
      </button>

      <div className="flex-grow flex justify-center">
        <button
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg transition duration-300 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium mx-2"
          onClick={onCheck}
          disabled={isChecked}
        >
          Check Answer
        </button>
      </div>

      {isLast ? (
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg transition duration-300 hover:bg-green-700 font-medium"
          onClick={onFinish}
        >
          Finish Quiz
        </button>
      ) : (
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg transition duration-300 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          onClick={onNext}
          disabled={isLast}
        >
          Next
        </button>
      )}
    </div>
  );
};