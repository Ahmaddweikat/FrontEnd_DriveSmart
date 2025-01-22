import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, selectedCity, setSelectedCity, cities = [] }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-7xl mx-auto mb-4">
            <div className="flex-1">
                <input
                    type="text"
                    placeholder="Search by school name, email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent"
                />
            </div>
            <div className="w-full sm:w-[200px]">
                <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent"
                >
                    <option value="">All Cities</option>
                    {cities.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SearchBar;
