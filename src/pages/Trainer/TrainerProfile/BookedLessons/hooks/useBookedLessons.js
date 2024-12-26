import { useState } from 'react';

export const useBookedLessons = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const lessonsPerPage = 10;
  const [daysFilter, setDaysFilter] = useState('all');

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
      studentAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      licenseType: 'A',
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '10:00 AM',
      carName: 'Toyota Corolla',
      carImage: '/cars/toyota-corolla.jpg',
      status: 'pending',
      isRecurring: true
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      studentAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      licenseType: 'B',
      days: '2024-01-15',
      time: '11:00 AM',
      carName: 'Honda Civic',
      carImage: '/cars/honda-civic.jpg',
      status: 'accepted',
      isRecurring: false
    },
    {
      id: 3,
      studentName: 'Mike Johnson',
      studentAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      licenseType: 'A',
      days: ['Tuesday', 'Thursday'],
      time: '2:00 PM',
      carName: 'Toyota Camry',
      carImage: '/cars/toyota-camry.jpg',
      status: 'declined',
      isRecurring: true
    },
    {
      id: 4,
      studentName: 'Sarah Wilson',
      studentAvatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      licenseType: 'B',
      days: '2024-01-20',
      time: '3:30 PM',
      carName: 'Honda Civic',
      carImage: '/cars/honda-civic.jpg',
      status: 'pending',
      isRecurring: false
    },
    {
      id: 5,
      studentName: 'David Brown',
      studentAvatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      licenseType: 'A',
      days: ['Monday', 'Friday', 'Sunday'],
      time: '9:00 AM',
      carName: 'Toyota Corolla',
      carImage: '/cars/toyota-corolla.jpg',
      status: 'accepted',
      isRecurring: true
    },
    {
      id: 6,
      studentName: 'Emily Davis',
      studentAvatar: 'https://randomuser.me/api/portraits/women/6.jpg',
      licenseType: 'B',
      days: '2024-02-05',
      time: '1:00 PM',
      carName: 'Honda Civic',
      carImage: '/cars/honda-civic.jpg',
      status: 'pending',
      isRecurring: false
    },
    {
      id: 7,
      studentName: 'Michael Lee',
      studentAvatar: 'https://randomuser.me/api/portraits/men/7.jpg',
      licenseType: 'A',
      days: ['Wednesday'],
      time: '4:00 PM',
      carName: 'Toyota Camry',
      carImage: '/cars/toyota-camry.jpg',
      status: 'accepted',
      isRecurring: true
    },
    {
      id: 8,
      studentName: 'Lisa Anderson',
      studentAvatar: 'https://randomuser.me/api/portraits/women/8.jpg',
      licenseType: 'B',
      days: '2024-01-25',
      time: '10:30 AM',
      carName: 'Honda Civic',
      carImage: '/cars/honda-civic.jpg',
      status: 'declined',
      isRecurring: false
    },
    {
      id: 9,
      studentName: 'James Wilson',
      studentAvatar: 'https://randomuser.me/api/portraits/men/9.jpg',
      licenseType: 'A',
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '2:30 PM',
      carName: 'Toyota Corolla',
      carImage: '/cars/toyota-corolla.jpg',
      status: 'pending',
      isRecurring: true
    },
    {
      id: 10,
      studentName: 'Emma Taylor',
      studentAvatar: 'https://randomuser.me/api/portraits/women/10.jpg',
      licenseType: 'B',
      days: '2024-02-10',
      time: '11:30 AM',
      carName: 'Honda Civic',
      carImage: '/cars/honda-civic.jpg',
      status: 'accepted',
      isRecurring: false
    },
    {
      id: 11,
      studentName: 'Oliver Martin',
      studentAvatar: 'https://randomuser.me/api/portraits/men/11.jpg',
      licenseType: 'A',
      days: ['Tuesday', 'Thursday'],
      time: '3:00 PM',
      carName: 'Toyota Camry',
      carImage: '/cars/toyota-camry.jpg',
      status: 'pending',
      isRecurring: true
    },
    {
      id: 12,
      studentName: 'Sophia Clark',
      studentAvatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      licenseType: 'B',
      days: '2024-02-15',
      time: '9:30 AM',
      carName: 'Honda Civic',
      carImage: '/cars/honda-civic.jpg',
      status: 'accepted',
      isRecurring: false
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

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

  const getUniqueDays = () => {
    const allDays = new Set();
    lessons.forEach(lesson => {
      if (lesson.isRecurring && Array.isArray(lesson.days)) {
        lesson.days.forEach(day => allDays.add(day));
      }
    });
    return ['all', ...Array.from(allDays)];
  };

  const filterLessons = (lessons, status) => {
    return lessons.filter(lesson => {
      const matchesSearch = lesson.studentName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = lesson.status === status;
      const matchesDays = daysFilter === 'all' || 
        (lesson.isRecurring && Array.isArray(lesson.days) && lesson.days.includes(daysFilter));
      return matchesSearch && matchesStatus && matchesDays;
    });
  };

  const pendingLessons = filterLessons(lessons, 'pending');
  const acceptedLessons = filterLessons(lessons, 'accepted');
  const declinedLessons = filterLessons(lessons, 'declined');

  const formatLessonsForDisplay = (lessons) => {
    return lessons.map(lesson => ({
      ...lesson,
      displayDays: lesson.isRecurring 
        ? Array.isArray(lesson.days) ? lesson.days.join(', ') : lesson.days
        : formatDate(lesson.days)
    }));
  };

  const totalPages = Math.ceil(lessons.length / lessonsPerPage);
  const startIndex = (currentPage - 1) * lessonsPerPage;
  const paginatedLessons = lessons.slice(startIndex, startIndex + lessonsPerPage);

  return {
    pendingLessons: formatLessonsForDisplay(pendingLessons),
    acceptedLessons: formatLessonsForDisplay(acceptedLessons),
    declinedLessons: formatLessonsForDisplay(declinedLessons),
    totalPages,
    currentPage,
    handlePageChange,
    searchQuery,
    setSearchQuery,
    daysFilter,
    setDaysFilter,
    handleStatusChange,
    uniqueDays: getUniqueDays()
  };
};
