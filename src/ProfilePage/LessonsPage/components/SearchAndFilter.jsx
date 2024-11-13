import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import useSearchTerm from "../../../hooks/StudentDashboard/useSearchTerm";
import useRatingFilter from "../../../hooks/StudentDashboard/LessonPage/useRatingFilter";

const SearchAndFilter = ({ setFilter, handleFilterSelect }) => {
  // Custom hooks
  const { searchTerm, setSearchTerm, clearSearchTerm } =
    useSearchTerm(setFilter);
  const {
    hoveredRating,
    selectedRating,
    setHoveredRating,
    handleRatingClick,
    resetRating,
  } = useRatingFilter(handleFilterSelect);

  // Clear button handler
  const handleClear = () => {
    clearSearchTerm(); // Reset local search term
    setFilter(""); // Reset the filter to show all lessons
    resetRating(); // Reset the selected and hovered rating
  };

  return (
    <div className="mb-6">
      <div className="flex space-x-4">
        <label htmlFor="search-lessons" className="sr-only">
          Search Lessons
        </label>
        <input
          id="search-lessons"
          type="text"
          placeholder="Search Lessons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-100 border border-gray-300 rounded-full py-2 pl-4 pr-10 text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="flex items-center">
          <span className="text-sm font-medium">Filter by Rating:</span>
          <div className="flex ml-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesomeIcon
                key={star}
                icon={
                  star <= (hoveredRating || selectedRating)
                    ? solidStar
                    : regularStar
                }
                className={`h-5 w-5 cursor-pointer ${
                  selectedRating === star ? "text-yellow-400" : "text-gray-400"
                }`}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => {
                  handleRatingClick(star);
                  clearSearchTerm(); // Clear search term when a rating is selected
                }}
              />
            ))}
          </div>

          <button
            onClick={handleClear} // Use the clear handler
            className="ml-2 text-sm text-green-500 hover:underline"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
