import React from "react";

const SearchAndFilter = ({
  setFilter,
  selectedFilter,
  setSelectedFilter,
  setSelectedRating,
  setHoveredRating,
}) => {
  return (
    <>
      {/* Search and Filter Panel */}
      <div className="mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search Test..."
            className="flex-1 bg-gray-100 border border-gray-300 rounded-full py-2 pl-4 pr-10 text-gray-600 focus:outline-none"
          />
          <div className="flex items-center">
            <span className="text-sm font-medium">Filter by Status: </span>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1"
            >
              <option value="all">All</option>
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
            </select>
            {/* Clear Filter Button */}
            <button
              onClick={() => {
                setFilter(""); // Reset the filter
                setSelectedRating(0); // Reset selected rating to 0
                setHoveredRating(0); // Reset hovered rating to 0
                setSelectedFilter("all"); // Reset to show all tests
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
