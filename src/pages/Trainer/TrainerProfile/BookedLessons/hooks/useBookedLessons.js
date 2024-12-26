import { useState } from 'react';

export const useBookedLessons = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const lessonsPerPage = 10;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const [lessons, setLessons] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      licenseType: 'A',
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '10:00 AM',
      carName: 'Toyota Corolla',
      status: 'pending',
      isRecurring: true
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      licenseType: 'B',
      days: '2024-01-15',
      time: '11:00 AM',
      carName: 'Honda Civic',
      status: 'accepted',
      isRecurring: false
    },
    {
      id: 3,
      studentName: 'Mike Johnson',
      licenseType: 'A',
      days: ['Tuesday', 'Thursday'],
      time: '2:00 PM',
      carName: 'Toyota Camry',
      status: 'declined',
      isRecurring: true
    },
    {
      id: 4,
      studentName: 'Sarah Wilson',
      licenseType: 'B',
      days: '2024-01-20',
      time: '3:30 PM',
      carName: 'Honda Civic',
      status: 'pending',
      isRecurring: false
    },
    {
      id: 5,
      studentName: 'David Brown',
      licenseType: 'A',
      days: ['Monday', 'Friday'],
      time: '9:00 AM',
      carName: 'Toyota Corolla',
      status: 'accepted',
      isRecurring: true
    },
    {
      id: 6,
      studentName: 'Emily Davis',
      licenseType: 'B',
      days: '2024-02-05',
      time: '1:00 PM',
      carName: 'Honda Civic',
      status: 'pending',
      isRecurring: false
    },
    {
      id: 7,
      studentName: 'Michael Lee',
      licenseType: 'A',
      days: ['Wednesday'],
      time: '4:00 PM',
      carName: 'Toyota Camry',
      status: 'accepted',
      isRecurring: true
    },
    {
      id: 8,
      studentName: 'Lisa Anderson',
      licenseType: 'B',
      days: '2024-01-25',
      time: '10:30 AM',
      carName: 'Honda Civic',
      status: 'declined',
      isRecurring: false
    },
    {
      id: 9,
      studentName: 'James Wilson',
      licenseType: 'A',
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '2:30 PM',
      carName: 'Toyota Corolla',
      status: 'pending',
      isRecurring: true
    },
    {
      id: 10,
      studentName: 'Emma Taylor',
      licenseType: 'B',
      days: '2024-02-10',
      time: '11:30 AM',
      carName: 'Honda Civic',
      status: 'accepted',
      isRecurring: false
    },
    {
      id: 11,
      studentName: 'Oliver Martin',
      licenseType: 'A',
      days: ['Tuesday', 'Thursday'],
      time: '3:00 PM',
      carName: 'Toyota Camry',
      status: 'pending',
      isRecurring: true
    },
    {
      id: 12,
      studentName: 'Sophia Clark',
      licenseType: 'B',
      days: '2024-02-15',
      time: '9:30 AM',
      carName: 'Honda Civic',
      status: 'accepted',
      isRecurring: false
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleStatusChange = (lessonId, newStatus) => {
    setLessons(prevLessons =>
      prevLessons.map(lesson =>
        lesson.id === lessonId ? { ...lesson, status: newStatus } : lesson
      )
    );
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lesson.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredLessons.length / lessonsPerPage);
  const startIndex = (currentPage - 1) * lessonsPerPage;
  const paginatedLessons = filteredLessons.slice(startIndex, startIndex + lessonsPerPage);

  const formattedLessons = paginatedLessons.map(lesson => ({
    ...lesson,
    displayDays: lesson.isRecurring 
      ? Array.isArray(lesson.days) ? lesson.days.join(', ') : lesson.days
      : formatDate(lesson.days)
  }));

  return {
    lessons: formattedLessons,
    totalPages,
    currentPage,
    handlePageChange,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    handleStatusChange
  };
};
