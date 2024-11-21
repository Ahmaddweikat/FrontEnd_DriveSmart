import React from "react";

const SearchAndFilter = ({
  filter,
  setFilter,
  selectedFilter,
  setSelectedFilter,
  setSelectedRating,
}) => {
  return (
    <>
      {/* Search and Filter Panel */}
      <div className="mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            value={filter}
            placeholder="Search Test..."
            onChange={(e) => setFilter(e.target.value)} // Update search filter state
            className="flex-1 bg-gray-100 border border-gray-300 rounded-full py-2 pl-4 pr-10 text-gray-600 focus:outline-none"
          />
          <div className="flex items-center">
            <span className="text-sm font-medium">Filter by Status: </span>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)} // Update status filter state
              className="border border-gray-300 rounded-md px-2 py-1"
            >
              <option value="all">All</option>
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
            </select>
            {/* Clear Filter Button */}
            <button
              onClick={() => {
                setFilter(""); // Reset search filter
                setSelectedRating(0); // Reset rating filter
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
