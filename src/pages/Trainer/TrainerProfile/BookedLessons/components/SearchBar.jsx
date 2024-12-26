import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, statusFilter, setStatusFilter }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg max-w-7xl mx-auto mb-6">
      <div className="px-6 py-4 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by student name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen focus:border-customGreen"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-48 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen focus:border-customGreen"
        >
          <option value="all">All Lessons</option>
          <option value="accepted">Accepted</option>
          <option value="declined">Declined</option>
          <option value="pending">Pending</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
