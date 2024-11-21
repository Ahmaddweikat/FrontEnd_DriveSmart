import React from "react";

const SearchAndFilter = ({
  filter,
  setFilter,
  selectedFilter,
  setSelectedFilter,
  setSelectedRating,
}) => {
  const handleSearchChange = (e) => {
    setFilter(e.target.value); // Update search filter state
  };

  const handleClearFilters = () => {
    setSelectedFilter("all"); // Reset status filter
  };

  return (
    <div className="mb-6">
      <div className="flex space-x-4 items-center">
        {/* Search Bar */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by lesson title"
            onChange={handleSearchChange}
            className="w-full bg-gray-100 border border-gray-300 rounded-full py-2 pl-4 pr-10 text-gray-600 focus:outline-none focus:ring-2 focus:ring-customGreen"
          />
        </div>

        {/* Filter by Status */}
        <div className="flex items-center">
          <label htmlFor="statusFilter" className="text-sm font-medium mr-2">
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 text-gray-600"
          >
            <option value="all">All</option>
            <option value="passed">Passed</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={handleClearFilters}
          className="text-sm text-green-500 underline-shrink ml-4"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilter;
