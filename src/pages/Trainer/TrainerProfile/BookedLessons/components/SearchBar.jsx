import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, daysFilter, setDaysFilter, uniqueDays }) => {
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
          value={daysFilter}
          onChange={(e) => setDaysFilter(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent"
        >
          {uniqueDays.map((day) => (
            <option key={day} value={day}>
              {day === 'all' ? 'All Days' : day}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
