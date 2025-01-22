import React from "react";
import Statistics from './components/Statistics';
import useStatistics from './hooks/useStatistics';

const HomePage = () => {
    const stats = useStatistics();

    return (
        <div className="h-[calc(100vh-64px)] overflow-y-auto">
            <div className="p-6">
                <div className="max-w-[2000px] mx-auto">
                    <h1 className="text-3xl font-bold text-[#72b626] mb-8">
                        Dashboard Overview
                    </h1>
                    <Statistics stats={stats} />
                </div>
            </div>
        </div>
    );
};

export default HomePage;