import React from 'react';
import { Pagination, Stack } from '@mui/material';

const LessonsTable = ({ lessons, handleStatusChange, currentPage, totalPages, handlePageChange }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg max-w-7xl mx-auto">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-customGreen text-white">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Student Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">License Type</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Days / Date</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Time</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Car Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {lessons.map((lesson) => (
            <tr key={lesson.id} className="hover:bg-gray-100 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{lesson.studentName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{lesson.licenseType}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{lesson.displayDays}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{lesson.time}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{lesson.carName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(lesson.status)}`}>
                  {lesson.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {lesson.status === 'pending' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleStatusChange(lesson.id, 'accepted')}
                      className="text-green-400 hover:text-green-900 transition-colors"
                      title="Accept"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleStatusChange(lesson.id, 'declined')}
                      className="text-red-600 hover:text-red-900 transition-colors"
                      title="Decline"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex flex-col items-center space-y-4 py-6">
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

export default LessonsTable;
