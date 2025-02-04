import { useState, useEffect } from "react";

const useStatistics = () => {
  const [stats, setStats] = useState({
    totalSchools: 0,
    totalCars: 0,
    totalTrainers: 0,
    totalStudents: 0,
    schoolsByCity: [],
    exams: {
      theoretical: 0,
      practical: 0,
    },
    practicalLessons: {
      completed: 0,
      total: 0,
    },
    monthlyStats: [],
  });

  useEffect(() => {
    // Mock data - replace with actual API calls later
    const mockStats = {
      totalSchools: 25,
      totalCars: 150,
      totalTrainers: 75,
      totalStudents: 1200,
      schoolsByCity: [
        { city: "Nablus", count: 8 },
        { city: "Ramallah", count: 5 },
        { city: "Hebron", count: 3 },
        { city: "Jenin", count: 2 },
        { city: "Tulkarm", count: 2 },
      ],
      exams: {
        theoretical: 850,
        practical: 720,
      },
      practicalLessons: {
        completed: 8500,
        total: 10000,
      },
      monthlyStats: [
        {
          month: "Jan",
          newStudents: 120,
          theoreticalPassed: 95,
          practicalPassed: 82,
        },
        {
          month: "Feb",
          newStudents: 145,
          theoreticalPassed: 110,
          practicalPassed: 95,
        },
        {
          month: "Mar",
          newStudents: 165,
          theoreticalPassed: 125,
          practicalPassed: 108,
        },
        {
          month: "Apr",
          newStudents: 155,
          theoreticalPassed: 118,
          practicalPassed: 98,
        },
        {
          month: "May",
          newStudents: 180,
          theoreticalPassed: 140,
          practicalPassed: 120,
        },
        {
          month: "Jun",
          newStudents: 210,
          theoreticalPassed: 165,
          practicalPassed: 142,
        },
      ],
    };

    setStats(mockStats);
  }, []);

  return stats;
};

export default useStatistics;
