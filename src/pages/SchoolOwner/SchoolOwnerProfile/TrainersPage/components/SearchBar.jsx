import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, availabilityFilter, setAvailabilityFilter }) => {
  const availabilities = ['all', 'available', 'busy', 'on leave'];

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-7xl mx-auto">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search by student name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent"
        />
      </div>
      <div className="w-full sm:w-48">
        <select
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent"
        >
          {availabilities.map((status) => (
            <option key={status} value={status}>
              {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
