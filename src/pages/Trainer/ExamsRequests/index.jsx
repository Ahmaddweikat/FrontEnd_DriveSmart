import React from 'react';
import { Box, Typography } from '@mui/material';
import TheoreticalExamsTable from './components/TheoreticalExamsTable';
import PracticalExamsTable from './components/PracticalExamsTable';
import SearchBar from './components/SearchBar';
import { useExamRequests } from './hooks/useExamRequests';

const ExamsRequests = () => {
  const {
    theoreticalRequests,
    practicalRequests,
    handleTheoreticalApprove,
    handleTheoreticalReject,
    handlePracticalApprove,
    handlePracticalReject,
    searchQuery,
    setSearchQuery,
    licenseFilter,
    setLicenseFilter,
    licenseTypes,
    currentPage,
    handlePageChange,
    totalTheoreticalPages,
    totalPracticalPages,
    theoreticalTab,
    setTheoreticalTab,
    practicalTab,
    setPracticalTab,
  } = useExamRequests();

  const NoRequestsMessage = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      <p className="text-gray-500">
        No exam requests found matching your search criteria.
      </p>
    </div>
  );

  return (
    <div className="p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Exam Requests</h1>
        <div className="space-y-8">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            licenseFilter={licenseFilter}
            setLicenseFilter={setLicenseFilter}
            licenseTypes={licenseTypes}
          />
          
          <Box className="space-y-8">
            {/* Theoretical Exams Section */}
            <Box>
              <Typography variant="h5" className="mb-4">
                Theoretical Exam Requests
              </Typography>
              {theoreticalRequests.length > 0 ? (
                <TheoreticalExamsTable
                  requests={theoreticalRequests}
                  onApprove={handleTheoreticalApprove}
                  onReject={handleTheoreticalReject}
                  currentPage={currentPage}
                  totalPages={totalTheoreticalPages}
                  handlePageChange={handlePageChange}
                  activeTab={theoreticalTab}
                  setActiveTab={setTheoreticalTab}
                />
              ) : (
                <NoRequestsMessage />
              )}
            </Box>

            {/* Practical Exams Section */}
            <Box>
              <Typography variant="h5" className="mb-4">
                Practical Exam Requests
              </Typography>
              {practicalRequests.length > 0 ? (
                <PracticalExamsTable
                  requests={practicalRequests}
                  onApprove={handlePracticalApprove}
                  onReject={handlePracticalReject}
                  currentPage={currentPage}
                  totalPages={totalPracticalPages}
                  handlePageChange={handlePageChange}
                  activeTab={practicalTab}
                  setActiveTab={setPracticalTab}
                />
              ) : (
                <NoRequestsMessage />
              )}
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ExamsRequests;
