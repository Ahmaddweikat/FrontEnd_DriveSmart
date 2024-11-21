import React from "react";

const SearchAndFilter = ({
  selectedFilter,
  setSelectedFilter,
  setFilter,
  setSelectedRating,
}) => {
  return (
    <div className="mb-6">
      <div className="flex space-x-4">
        <div className="flex-1">
          <input
            id="search-course"
            type="text"
            placeholder="Search Course..."
            onChange={(e) => setFilter(e.target.value)} // Update search filter
            className="w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-4 text-gray-600 focus:outline-none"
          />
        </div>

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
            onChange={(e) => setSelectedFilter(e.target.value)} // Update difficulty filter
            className="border border-gray-300 rounded-md px-2 py-1"
          >
            <option value="all">All</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <button
            onClick={() => {
              setFilter("");
              setSelectedFilter("all");
            }}
            className="ml-2 text-sm text-customGreen underline-shrink"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
