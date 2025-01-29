import React, { useState } from "react";
import { Stack, Pagination } from "@mui/material";
import DayMapping from "../../../../../constants/dayMapping";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const AvailabilityTable = ({ lessons, handleEdit, handleCancel }) => {
  const [filterDay, setFilterDay] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterTime, setFilterTime] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const filteredLessons = lessons.filter((lesson) => {
    const matchesDay = filterDay
      ? lesson.daysOfWeek.includes(Number(filterDay))
      : true;
    const matchesDate = filterDate ? lesson.specificDate === filterDate : true;
    const matchesTime = filterTime ? lesson.startTime === filterTime : true;
    return matchesDay && matchesDate && matchesTime;
  });

  const totalPages = Math.ceil(filteredLessons.length / rowsPerPage);
  const currentLessons = filteredLessons.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const clearFilters = () => {
    setFilterDay("");
    setFilterDate("");
    setFilterTime("");
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
        Scheduled Lessons
      </h3>

      <div className="overflow-x-auto">
        {/* Filter Section */}
        <div className="flex justify-end space-x-4 mb-4">
          <select
            value={filterDay}
            onChange={(e) => setFilterDay(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">All Days</option>
            {Object.entries(DayMapping).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="time"
            value={filterTime}
            onChange={(e) => setFilterTime(e.target.value)}
            className="border rounded p-2"
          />
          <button
            type="button"
            onClick={clearFilters}
            className="bg-red-500 text-white rounded p-2 hover:bg-red-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
        {/* End of Filter Section */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-customGreen text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-2/5">
                Schedule
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider w-1/5">
                Time
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider w-1/5">
                Type
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider w-1/5">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider w-1/5">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentLessons.map((lesson, index) => (
              <tr key={index} className="hover:bg-gray-100 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {lesson.isRecurring ? (
                      <div className="flex flex-wrap gap-2">
                        {lesson.daysOfWeek.map((day) => (
                          <span
                            key={day}
                            className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-customGreen/20 text-customGreen"
                          >
                            {DayMapping[day].slice(0, 3)}
                          </span>
                        ))}
                      </div>
                    ) : (
                      formatDate(lesson.specificDate)
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900">
                    {formatTime(lesson.startTime)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      lesson.isRecurring
                        ? "bg-customGreen/20 text-customGreen"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {lesson.isRecurring ? "Recurring" : "One-time"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      lesson.isBooked
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {lesson.isBooked ? "Booked" : "Available"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center space-x-4">
                  <button
                    onClick={() => handleEdit(index, lesson)}
                    className="text-customGreen hover:text-customGreen/80"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleCancel(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col items-center space-y-4 mt-6">
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
    </div>
  );
};
