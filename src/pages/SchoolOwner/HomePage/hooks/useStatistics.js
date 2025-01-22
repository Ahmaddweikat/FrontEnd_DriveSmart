import { useState, useEffect } from 'react';

const useStatistics = () => {
    const [stats, setStats] = useState({
        students: 0,
        trainers: 0,
        cars: 0,
        exams: {
            theoretical: 0,
            practical: 0
        },
        practicalLessons: {
            total: 0,
            completed: 0
        }
    });

    useEffect(() => {
       
        const fetchStats = async () => {
            
            const data = {
                students: 150,
                trainers: 15,
                cars: 12,
                exams: {
                    theoretical: 85,
                    practical: 70
                },
                practicalLessons: {
                    total: 500,
                    completed: 420
                }
            };
            setStats(data);
        };

        fetchStats();
    }, []);

    return stats;
};

export default useStatistics;
