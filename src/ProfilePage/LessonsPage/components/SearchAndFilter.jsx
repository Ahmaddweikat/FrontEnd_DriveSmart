import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
const SearchAndFilter = ({
  setFilter,
  setHoveredRating,
  handleFilterSelect,
  hoveredRating,
  selectedRating,
  setSelectedRating,
}) => {
  return (
    <>
      {/* Search and Filter Panel */}
      <div className="mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search Lessons..."
            className="flex-1 bg-gray-100 border border-gray-300 rounded-full py-2 pl-4 pr-10 text-gray-600 focus:outline-none"
          />
          <div className="flex items-center">
            <span className="text-sm font-medium">Filter by Rating: </span>
            {/* Render Stars for Filtering */}
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
                    selectedRating === star
                      ? "text-yellow-400"
                      : "text-yellow-400"
                  }`}
                  onMouseEnter={() => setHoveredRating(star)} // Set hovered rating
                  onMouseLeave={() => setHoveredRating(0)} // Reset hovered rating
                  onClick={() => handleFilterSelect(`${star}star`)} // Set filter and rating
                />
              ))}
            </div>

            {/* Clear Filter Button */}
            <button
              onClick={() => {
                setFilter(""); // Reset the filter
                setSelectedRating(0); // Reset selected rating to 0
                setHoveredRating(0); // Reset hovered rating to 0
              }}
              className="ml-2 text-sm text-green-500 hover:underline"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchAndFilter;
