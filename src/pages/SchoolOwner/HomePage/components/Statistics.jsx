import React from 'react';
import StatisticCard from './StatisticCard';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TimelineIcon from '@mui/icons-material/Timeline';
import CarRentalIcon from '@mui/icons-material/CarRental';

const Statistics = ({ stats }) => {
    const topRowCards = [
        {
            title: "Total Students",
            value: stats.students,
            icon: GroupIcon,
        },
        {
            title: "Total Trainers",
            value: stats.trainers,
            icon: SchoolIcon,
        },
        {
            title: "Total Cars",
            value: stats.cars,
            icon: CarRentalIcon,
        },
    ];

    const bottomRowCards = [
        {
            title: "Theoretical Exam Passed",
            value: stats.exams.theoretical,
            subtitle: `${((stats.exams.theoretical / stats.students) * 100).toFixed(1)}% of total students`,
            icon: MenuBookIcon,
        },
        {
            title: "Practical Exam Passed",
            value: stats.exams.practical,
            subtitle: `${((stats.exams.practical / stats.students) * 100).toFixed(1)}% of total students`,
            icon: DirectionsCarIcon,
        },
        {
            title: "Practical Lessons",
            value: stats.practicalLessons.completed,
            subtitle: `${((stats.practicalLessons.completed / stats.practicalLessons.total) * 100).toFixed(1)}% completion rate`,
            icon: TimelineIcon,
        },
    ];

    return (
        <div className="w-full space-y-6">
            {/* Top Row - Total counts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {topRowCards.map((card, index) => (
                    <div key={index} className="h-full">
                        <StatisticCard {...card} />
                    </div>
                ))}
            </div>

            {/* Bottom Row - Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {bottomRowCards.map((card, index) => (
                    <div key={index} className="h-full">
                        <StatisticCard {...card} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Statistics;
