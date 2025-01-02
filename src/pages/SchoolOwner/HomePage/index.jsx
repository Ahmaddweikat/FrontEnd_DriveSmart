import React from "react";
import Statistics from './components/Statistics';
import useStatistics from './hooks/useStatistics';

const HomePage = () => {
    const stats = useStatistics();

    return (
        <div className="h-screen overflow-y-auto bg-gray-50/50">
            <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-center text-[#72b626] mb-12">
                    School Manager Dashboard
                </h1>
                <Statistics stats={stats} />
            </div>
        </div>
    );
};

export default HomePage;