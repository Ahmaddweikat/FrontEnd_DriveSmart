import React from 'react';

const SearchAndFilter = ({ searchTerm, setSearchTerm, dateFilter, setDateFilter }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-7xl mx-auto mb-4">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search by school name, email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent"
        />
      </div>
      <div className="w-full sm:w-[200px]">
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default SearchAndFilter;
