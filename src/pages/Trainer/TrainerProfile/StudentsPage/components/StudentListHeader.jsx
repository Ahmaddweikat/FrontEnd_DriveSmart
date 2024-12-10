import React from 'react';

const StudentListHeader = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold ml-12">Student List</h2>
            <div className="relative w-64">
                <input
                    type="text"
                    placeholder="Search students..."
                    className="w-52 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-customGreen focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    );
};

export default StudentListHeader;
