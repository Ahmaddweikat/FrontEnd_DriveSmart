import React, { useState, useMemo } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const QuizList = ({ quizzes, filter = 'all' }) => {
  // State for current page
  const [currentPage, setCurrentPage] = useState(1);

  // State for exam request dialog
  const [openDialog, setOpenDialog] = useState(false);

  // Number of quizzes per page
  const QUIZZES_PER_PAGE = 5;

  // Calculate average pass rate
  const averagePassRate = useMemo(() => {
    if (quizzes.length === 0) return 0;
    const passedQuizzes = quizzes.filter(quiz => quiz.status === "PASSED");
    return (passedQuizzes.length / quizzes.length) * 100;
  }, [quizzes]);

  // Filter quizzes based on passed/failed status
  const processedQuizzes = useMemo(() => {
    return quizzes.filter(quiz => {
      if (filter === 'passed') return quiz.status === "PASSED";
      if (filter === 'failed') return quiz.status !== "PASSED";
      return true;
    });
  }, [quizzes, filter]);

  const totalPages = Math.ceil(processedQuizzes.length / QUIZZES_PER_PAGE);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleOpenExamRequest = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmExamRequest = () => {
    console.log('Exam request submitted');
    handleCloseDialog();
  };

  const paginatedQuizzes = processedQuizzes.slice(
    (currentPage - 1) * QUIZZES_PER_PAGE,
    currentPage * QUIZZES_PER_PAGE
  );

  const paddedQuizzes = [
    ...paginatedQuizzes,
    ...Array(QUIZZES_PER_PAGE - paginatedQuizzes.length).fill(null)
  ];

  if (processedQuizzes.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg text-center text-gray-500">
        No quizzes found matching the selected filter.
      </div>
    );
  }

  return (
    <div className="space-y-4">
    {/* Request Official Exam Section */}
    <div className="flex justify-between items-center mb-4">
      <div className="flex-grow">
        <h2 className="text-xl font-semibold text-gray-800">Your Quiz Performance</h2>
        <p className="text-sm text-gray-500">
          Current Pass Rate: {averagePassRate.toFixed(2)}%
        </p>
      </div>
      <Button 
        variant="contained" 
        color="primary" 
        size="medium"
        onClick={handleOpenExamRequest}
        startIcon={<CheckCircleOutlineIcon />}
        disabled={processedQuizzes.length === 0}
        className="px-6 py-2"
      >
        Request Official Exam
      </Button>
    </div>
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
      <div className="flex flex-col items-center space-y-4 mt-6">
        {/* Pagination Controls */}
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

      {/* Exam Request Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="exam-request-dialog-title"
        aria-describedby="exam-request-dialog-description"
      >
        <DialogTitle id="exam-request-dialog-title" className="flex items-center">
          <WarningAmberIcon color="warning" className="mr-2" />
          Official Exam Request
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="exam-request-dialog-description" className="mb-4">
            <strong>Important Guidance:</strong>
            <ul className="list-disc pl-5 mt-2">
              <li>Your current pass rate is <strong>{averagePassRate.toFixed(2)}%</strong></li>
              <li>To guarantee passing the official exam, your pass rate should be <strong>above 85%</strong></li>
              <li>We recommend additional practice if your pass rate is below the recommended threshold</li>
            </ul>
          </DialogContentText>

          {averagePassRate >= 85 ? (
            <div className="flex items-center text-green-600">
              <CheckCircleOutlineIcon className="mr-2" />
              <span>You meet the pass rate requirement!</span>
            </div>
          ) : (
            <div className="flex items-center text-red-600">
              <WarningAmberIcon className="mr-2" />
              <span>Your pass rate is below the recommended threshold.</span>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmExamRequest}
            color="primary"
            variant="contained"
            disabled={averagePassRate < 85}
          >
            {averagePassRate >= 85 ? 'Confirm Request' : 'Improve Skills'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default QuizList;