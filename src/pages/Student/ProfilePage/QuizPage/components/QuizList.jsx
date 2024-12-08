import React, { useState, useMemo } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const QuizList = ({ quizzes, filter = 'all' }) => {
  // State for current page
  const [currentPage, setCurrentPage] = useState(1);
  
  // Number of quizzes per page
  const QUIZZES_PER_PAGE = 5;

  // Filter quizzes based on passed/failed status
  const processedQuizzes = useMemo(() => {
    return quizzes.filter(quiz => {
      if (filter === 'passed') return quiz.status === "PASSED";
      if (filter === 'failed') return quiz.status !== "PASSED";
      return true;
    });
  }, [quizzes, filter]);

  // Calculate total pages
  const totalPages = Math.ceil(processedQuizzes.length / QUIZZES_PER_PAGE);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Slice quizzes for current page
  const paginatedQuizzes = processedQuizzes.slice(
    (currentPage - 1) * QUIZZES_PER_PAGE, 
    currentPage * QUIZZES_PER_PAGE
  );

  // Pad quizzes to always show 5 slots
  const paddedQuizzes = [
    ...paginatedQuizzes,
    ...Array(QUIZZES_PER_PAGE - paginatedQuizzes.length).fill(null)
  ];

  // Check if there are no quizzes to display
  if (processedQuizzes.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg text-center text-gray-500">
        No quizzes found matching the selected filter.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Quiz List */}
      <div className="space-y-4">
        {paddedQuizzes.map((quiz, index) => (
          quiz ? (
            <div key={`${quiz.title}-${index}`} className="bg-white rounded-lg shadow-lg p-6">
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
          ) : (
            <div key={`empty-${index}`} className="bg-white rounded-lg shadow-lg p-6 opacity-50">
              <div className="text-center text-gray-400">No quiz data</div>
            </div>
          )
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <Stack spacing={2}>
          <Pagination 
            count={totalPages} 
            page={currentPage}
            onChange={handlePageChange}
            shape="rounded"
            variant="outlined"
            color="primary"
          />
        </Stack>
      </div>
    </div>
  );
};

export default QuizList;