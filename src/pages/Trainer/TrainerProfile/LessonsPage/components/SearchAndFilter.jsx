import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const SearchAndFilter = ({
  handleFilterSelect,
  selectedRating,
  setHoveredRating,
  hoveredRating,
  setSearchTerm,
  resetRating,
}) => {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMouseEnter = (rating) => {
    setHoveredRating(rating);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleClear = () => {
    resetRating();
    setSearchTerm("");
  };

  return (
    <div className="mb-6 flex items-center space-x-6 max-w-7xl mx-auto">
      <div className="flex flex-1 space-x-4">
        <input
          type="text"
          placeholder="Search by student name or lesson title"
          onChange={handleSearchChange}
          className="w-full bg-gray-100 border border-gray-300 rounded-full py-2 pl-4 pr-10 text-gray-600 focus:outline-none focus:ring-2 focus:ring-customGreen"
        />
      </div>

      <div className="flex items-center">
        <span className="text-sm font-medium">Filter by Rating:</span>
        <div className="flex ml-4">
          {[1, 2, 3, 4, 5].map((rating) => (
            <div
              key={rating}
              onClick={() => handleFilterSelect(rating)}
              onMouseEnter={() => handleMouseEnter(rating)}
              onMouseLeave={handleMouseLeave}
              className="cursor-pointer"
            >
              <FontAwesomeIcon
                icon={
                  rating <= (hoveredRating || selectedRating)
                    ? solidStar
                    : regularStar
                }
                className="h-6 w-6 text-yellow-400"
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleClear}
          className="ml-4 text-sm text-customGreen underline-shrink"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilter;
