import React from "react";

const SearchAndFilter = ({
  selectedFilter,
  setSelectedFilter,
  setFilter,
  setSelectedRating,
}) => {
  return (
    <div className="mb-6">
      {/* Search and Filter Panel */}
      <div className="flex space-x-4">
        {/* Search Input */}
        <div className="flex-1">
          <label htmlFor="search-course" className="sr-only">
            Search Course
          </label>
          <input
            id="search-course"
            type="text"
            placeholder="Search Course..."
            onChange={(e) => setFilter(e.target.value)} // Handle search input change
            className="w-full bg-gray-100 border border-gray-300 rounded-full py-2 pl-4 pr-10 text-gray-600 focus:outline-none"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center">
          <label
            htmlFor="difficulty-filter"
            className="text-sm font-medium mr-2"
          >
            Filter by Difficulty:
          </label>
          <select
            id="difficulty-filter"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1"
          >
            <option value="all">All</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          {/* Clear Filter Button */}
          <button
            onClick={() => {
              setFilter(""); // Reset the filter
              setSelectedRating(0); // Reset selected rating to 0
              setSelectedFilter("all"); // Reset to show all courses
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
