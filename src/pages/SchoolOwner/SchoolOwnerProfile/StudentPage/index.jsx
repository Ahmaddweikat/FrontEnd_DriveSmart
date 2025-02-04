import React, { useState, useMemo } from 'react';
import {
    Typography,
} from '@mui/material';
import SearchBar from './components/SearchBar';
import StudentTable from './components/StudentTable';

const StudentPage = () => {
    const [students, setStudents] = useState([
        {
            id: 1,
            firstName: 'Yousef',
            lastName: 'Hamdan',
            gender: 'Male',
            phone: '+1234567890',
            licenseType: 'Class B',
            trainer: 'Mike Johnson',
            image: 'https://example.com/john.jpg',
            numberOfLessons: 12
        },
        {
            id: 2,
            firstName: 'Mariam',
            lastName: 'Khalil',
            gender: 'Female',
            phone: '+9876543210',
            licenseType: 'Class A',
            trainer: 'Sarah Wilson',
            image: 'https://example.com/jane.jpg',
            numberOfLessons: 8
        },
        {
            id: 3,
            firstName: 'Hassan',
            lastName: 'Nasser',
            gender: 'Male',
            phone: '+9876543211',
            licenseType: 'Class B',
            trainer: 'Mike Johnson',
            image: 'https://example.com/hassan.jpg',
            numberOfLessons: 15
        },
        {
            id: 4,
            firstName: 'Rawan',
            lastName: 'Zaid',
            gender: 'Female',
            phone: '+9876543212',
            licenseType: 'Class A',
            trainer: 'Sarah Wilson',
            image: 'https://example.com/rawan.jpg',
            numberOfLessons: 10
        },
        {
            id: 5,
            firstName: 'Kamal',
            lastName: 'Othman',
            gender: 'Male',
            phone: '+9876543213',
            licenseType: 'Class B',
            trainer: 'Mike Johnson',
            image: 'https://example.com/kamal.jpg',
            numberOfLessons: 6
        }
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTrainer, setSelectedTrainer] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredStudents = useMemo(() => {
        return students?.filter(student => {
            const matchesSearch = !searchQuery || 
                `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.trainer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.licenseType.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesTrainer = !selectedTrainer || 
                student.trainer === selectedTrainer;

            return matchesSearch && matchesTrainer;
        });
    }, [students, searchQuery, selectedTrainer]);

    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

    const handleDelete = (studentId) => {
        setStudents(students.filter(student => student.id !== studentId));
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const trainers = [...new Set(students.map(student => student.trainer))].map(name => ({
        id: name,
        name: name
    }));

    return (
        <div className="h-full overflow-y-auto bg-gray-100">
            <div className="p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    <Typography 
                        variant="h4" 
                        component="h1" 
                        sx={{ 
                            fontWeight: 600,
                            color: '#1a1a1a',
                        }}
                    >
                        School Students
                    </Typography>

                    <SearchBar 
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        selectedTrainer={selectedTrainer}
                        setSelectedTrainer={setSelectedTrainer}
                        trainers={trainers}
                    />

                    <StudentTable 
                        students={displayedStudents}
                        handleDelete={handleDelete}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentPage;