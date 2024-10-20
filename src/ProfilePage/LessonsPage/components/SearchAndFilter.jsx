import React, { useState, useEffect } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilter(searchTerm); // Update filter after a delay
    }, 300); // 300ms delay

    return () => {
      clearTimeout(handler); // Cleanup on unmount or when the term changes
    };
  }, [searchTerm, setFilter]);

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
          onChange={(e) => setSearchTerm(e.target.value)} // Update local state
          className="w-full bg-gray-100 border border-gray-300 rounded-full py-2 pl-4 pr-10 text-gray-600 focus:outline-none"
        />
        <div className="flex items-center">
          <span className="text-sm font-medium">Filter by Rating: </span>
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
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => {
                  handleFilterSelect(star); // Pass star directly
                  setSearchTerm(""); // Clear search term when a rating is selected
                }}
              />
            ))}
          </div>

          <button
            onClick={() => {
              setSearchTerm(""); // Reset local search term
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
  );
};

export default SearchAndFilter;
