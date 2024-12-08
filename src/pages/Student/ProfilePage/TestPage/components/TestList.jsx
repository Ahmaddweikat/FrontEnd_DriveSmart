import React, { useState, useMemo } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const TestList = ({ filteredTests, filter = 'all' }) => {
  // State for current page
  const [currentPage, setCurrentPage] = useState(1);
  
  // Number of tests per page
  const TESTS_PER_PAGE = 5;

  // Filter tests based on passed/failed status
  const processedTests = useMemo(() => {
    return filteredTests.filter(test => {
      if (filter === 'passed') return parseInt(test.score) > 24;
      if (filter === 'failed') return parseInt(test.score) <= 24;
      return true;
    });
  }, [filteredTests, filter]);

  // Calculate total pages
  const totalPages = Math.ceil(processedTests.length / TESTS_PER_PAGE);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Slice tests for current page
  const paginatedTests = processedTests.slice(
    (currentPage - 1) * TESTS_PER_PAGE, 
    currentPage * TESTS_PER_PAGE
  );

  // Pad tests to always show 5 slots
  const paddedTests = [
    ...paginatedTests,
    ...Array(TESTS_PER_PAGE - paginatedTests.length).fill(null)
  ];

  if (processedTests.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg text-center text-gray-500">
        No tests found matching the selected filter.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Test List */}
      <div className="space-y-4">
        {paddedTests.map((test, index) => (
          test ? (
            <div key={`${test.title}-${index}`} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{test.title}</h3>

                {parseInt(test.score) > 24 ? (
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
                Date: {test.date} | Duration: {test.duration}
              </p>

              <div className="flex justify-between items-start mt-10">
                <div>
                  <p className="text-black-700 font-small">
                    <strong>Tester:</strong> {test.tester}
                  </p>

                  {/* Score Display */}
                  <p className="text-black-500 text-sm mt-2">
                    <strong>Mark: </strong> {test.score}/30
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div key={`empty-${index}`} className="bg-white rounded-lg shadow-lg p-6 opacity-50">
              <div className="text-center text-gray-400">No test data</div>
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

export default TestList;