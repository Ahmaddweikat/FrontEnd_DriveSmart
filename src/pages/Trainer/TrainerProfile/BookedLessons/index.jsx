import React from "react";
import { useBookedLessons } from "./hooks/useBookedLessons";
import SearchBar from "./components/SearchBar";
import LessonsTable from "./components/LessonsTable";

const BookingLessons = () => {
  const {
    pendingLessons,
    acceptedLessons,
    declinedLessons,
    currentPage,
    handlePageChange,
    searchQuery,
    setSearchQuery,
    daysFilter,
    setDaysFilter,
    handleStatusChange,
    uniqueDays
  } = useBookedLessons();
 
  const NoLessonsMessage = ({ day }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      <p className="text-gray-500">
        {day === 'all' 
          ? 'No lessons found matching your search criteria.'
          : `No lessons scheduled for ${day}.`}
      </p>
    </div>
  );

  return (
    <div className="p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Booked Lessons</h1>
        <div className="space-y-8">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            daysFilter={daysFilter}
            setDaysFilter={setDaysFilter}
            uniqueDays={uniqueDays}
          />
          
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Pending Lessons</h2>
              {pendingLessons.length > 0 ? (
                <LessonsTable 
                  lessons={pendingLessons}
                  handleStatusChange={handleStatusChange}
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                  showActions={true}
                />
              ) : (
                <NoLessonsMessage day={daysFilter} />
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Accepted Lessons</h2>
              {acceptedLessons.length > 0 ? (
                <LessonsTable 
                  lessons={acceptedLessons}
                  handleStatusChange={handleStatusChange}
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                  showActions={false}
                />
              ) : (
                <NoLessonsMessage day={daysFilter} />
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Declined Lessons</h2>
              {declinedLessons.length > 0 ? (
                <LessonsTable 
                  lessons={declinedLessons}
                  handleStatusChange={handleStatusChange}
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                  showActions={false}
                />
              ) : (
                <NoLessonsMessage day={daysFilter} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingLessons;
