import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, selectedTrainer, setSelectedTrainer, trainers = [] }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-7xl mx-auto">
            <div className="flex-1">
                <input
                    type="text"
                    placeholder="Search by student name, email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent"
                />
            </div>
            <div className="w-full sm:w-[200px]">
                <select
                    value={selectedTrainer}
                    onChange={(e) => setSelectedTrainer(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent"
                >
                    <option value="">All Trainers</option>
                    {trainers.map((trainer) => (
                        <option key={trainer.id} value={trainer.name}>
                            {trainer.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SearchBar;
