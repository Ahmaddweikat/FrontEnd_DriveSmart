import React, { useState } from "react";
import LessonsList from "./components/LessonsList";
import ProfilePanel from "./components/ProfilePanel";
import SearchAndFilter from "./components/SearchAndFilter";
import { lessons } from "./constants/Lessons"; // Assuming lessons are imported
import useRatingFulter from "./hooks/useRatingFilter"; // Import custom hook
import useSearchState from "./hooks/useSearchState"; // Import custom hook

const LessonsPage = () => {
  const [filter, setFilter] = useState({}); // Filter state initialized here

  const handleFilterSelect = (rating) => {
    setFilter({ ...filter, rating }); // Apply filter on rating
  };

  const { setSearchTerm, filteredLessons } = useSearchState(
    Array.isArray(lessons) ? lessons : []
  );

  const {
    hoveredRating,
    selectedRating,
    setHoveredRating,
    handleRatingClick,
    resetRating,
  } = useRatingFulter(handleFilterSelect); // Use rating filter hook

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
            <ProfilePanel lessons={lessons} />
            <SearchAndFilter
              setFilter={setFilter}
              handleFilterSelect={handleRatingClick}
              selectedRating={selectedRating}
              setHoveredRating={setHoveredRating}
              hoveredRating={hoveredRating}
              setSearchTerm={setSearchTerm}
              resetRating={resetRating}
            />
            <LessonsList
              lessons={filteredLessons}
              selectedRating={selectedRating}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonsPage;
