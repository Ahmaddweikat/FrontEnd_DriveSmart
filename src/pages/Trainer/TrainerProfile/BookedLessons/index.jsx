import React from "react";
import { useBookedLessons } from "./hooks/useBookedLessons";
import SearchBar from "./components/SearchBar";
import LessonsTable from "./components/LessonsTable";

const BookingLessons = () => {
  const {
    lessons,
    totalPages,
    currentPage,
    handlePageChange,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    handleStatusChange
  } = useBookedLessons();
 
  return (
    <div className="p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Booked Lessons</h1>
        <div className="space-y-6">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
          <LessonsTable 
            lessons={lessons} 
            handleStatusChange={handleStatusChange}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingLessons;
