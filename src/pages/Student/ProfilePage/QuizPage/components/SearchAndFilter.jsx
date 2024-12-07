import React from "react";
import { Search, FilterList, Done, Close } from '@mui/icons-material';

const SearchAndFilter = ({
  selectedFilter,
  setSelectedFilter,
  setFilter,
}) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title, score, or time..."
              onChange={(e) => setFilter(e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-full py-2 pl-10 pr-4 text-gray-600 focus:outline-none focus:border-customGreen  focus:ring-2 focus:ring-customGreen"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
          <label htmlFor="statusFilter" className="text-sm font-medium mr-2">
            Filter by Status:
          </label>            
          <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="all">All Status</option>
              <option value="passed">
                <Done className="text-green-500" /> Passed
              </option>
              <option value="failed">
                <Close className="text-red-500" /> Failed
              </option>
            </select>
          </div>

          <button
            onClick={() => {
              setFilter("");
              setSelectedFilter("all");
            }}
            className="text-customGreen font-medium  underline-shrink"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
