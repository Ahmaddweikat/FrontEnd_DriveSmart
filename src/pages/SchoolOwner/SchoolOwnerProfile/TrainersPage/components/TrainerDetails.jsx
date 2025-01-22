import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Typography,
    Avatar,
    Divider,
    Paper,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    IconButton,
    Button,
    Table,           
    TableCell,       
    TableBody,       
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useTrainers from '../hooks/useTrainers';
import StudentTable from './StudentTable';

const TrainerDetails = () => {
    const { TrainerName } = useParams();
    const navigate = useNavigate();
    const { trainers } = useTrainers();
    const [searchQuery, setSearchQuery] = useState('');
    const [daysFilter, setDaysFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('');
    const [timeFilter, setTimeFilter] = useState('all');

    const trainer = trainers.find(t => {
        const urlFriendlyName = t.name.toLowerCase().replace(/\s+/g, '-');
        return urlFriendlyName === TrainerName.toLowerCase();
    });

    const uniqueTimes = useMemo(() => {
        const times = trainer?.availability?.map(slot => slot.time) || [];
        return ['all', ...new Set(times)];
    }, [trainer]);

    const filteredAvailability = useMemo(() => {
        if (!trainer?.availability) return [];
        
        return trainer.availability.filter(slot => {
            // Search filter
            const matchesSearch = !searchQuery || 
                slot.carName.toLowerCase().includes(searchQuery.toLowerCase());

            // Handle days filter
            if (daysFilter !== 'all') {
                if (slot.type === 'recurring') {
                    if (!slot.days.includes(daysFilter)) {
                        return false;
                    }
                } else if (slot.type === 'specific') {
                    const date = new Date(slot.specificDate);
                    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
                    if (dayOfWeek !== daysFilter) {
                        return false;
                    }
                }
            }
            
            // Handle date filter for specific slots
            if (slot.type === 'specific' && dateFilter) {
                if (new Date(slot.specificDate).toISOString().split('T')[0] !== dateFilter) {
                    return false;
                }
            }
            
            // Time filter
            if (timeFilter !== 'all' && slot.time !== timeFilter) {
                return false;
            }

            return matchesSearch;
        });
    }, [trainer, searchQuery, daysFilter, dateFilter, timeFilter]);

    if (!trainer) {
        return (
            <div className="h-full flex items-center justify-center">
                <Paper className="p-6">
                    <Typography variant="h6" color="error">
                        Trainer not found
                    </Typography>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/schoolManager/trainers')}
                        sx={{ mt: 2 }}
                    >
                        Back to Trainers
                    </Button>
                </Paper>
            </div>
        );
    }

    const enhancedStudents = trainer.students.map(student => ({
        ...student,
        gender: student.gender || 'Not Specified',
        contactNumber: student.phone || 'N/A',
        lessonsTaken: student.progress || 0,
        bloodType: student.bloodType || 'N/A'
    }));

    const InfoRow = ({ icon, label, value }) => (
        <div className="flex items-center gap-3 mb-3">
            {icon}
            <div>
                <Typography variant="caption" color="textSecondary">
                    {label}
                </Typography>
                <Typography>{value}</Typography>
            </div>
        </div>
    );

    return (
        <div className="h-full overflow-y-auto bg-gray-100">
            <div className="p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="flex items-center gap-4">
                        <IconButton 
                            onClick={() => navigate('/schoolManager/trainers')}
                            sx={{ color: '#72b626' }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography 
                            variant="h4" 
                            component="h1" 
                            sx={{ 
                                fontWeight: 600,
                                color: '#1a1a1a',
                            }}
                        >
                            Trainer Details
                        </Typography>
                    </div>

                    <Paper className="p-6">
                        {/* Personal Information */}
                        <div className="flex items-center gap-4 mb-6">
                            <Avatar
                                src={trainer.avatar}
                                alt={trainer.name}
                                sx={{ width: 100, height: 100 }}
                            >
                                <PersonIcon />
                            </Avatar>
                            <div>
                                <Typography variant="h5">{trainer.name}</Typography>
                                <Chip 
                                    label={trainer.status}
                                    color={
                                        trainer.status === 'available' ? 'success' :
                                        trainer.status === 'busy' ? 'warning' : 'error'
                                    }
                                    size="small"
                                    sx={{ mt: 1 }}
                                />
                            </div>
                        </div>

                        <Divider sx={{ my: 3 }} />

                        {/* Contact Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <InfoRow 
                                icon={<EmailIcon color="action" />}
                                label="Email"
                                value={trainer.email}
                            />
                            <InfoRow 
                                icon={<PhoneIcon color="action" />}
                                label="Phone"
                                value={trainer.phone}
                            />
                            <InfoRow 
                                icon={<CalendarTodayIcon color="action" />}
                                label="Joined Date"
                                value={trainer.joinedDate}
                            />
                        </div>

                        <Divider sx={{ my: 3 }} />

                        {/* Students */}
                        <div className="mb-6">
                            <Typography variant="h6" className="mb-3">
                                Current Students
                            </Typography>
                            <StudentTable currentStudents={trainer.students} />
                            </div>

                        <Divider sx={{ my: 3 }} />

                        {/* Availability Schedule */}
                        <div>
                            <Typography variant="h6" className="mb-3">
                                Available Time Slots
                            </Typography>
                            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-7xl mx-auto mb-4">
                                <div className="w-full sm:w-[calc(100%-500px)]">
                                    <input
                                        type="text"
                                        placeholder="Search by car..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 sm:w-[500px]">
                                    <div className="w-full sm:w-[150px]">
                                        <select
                                            value={daysFilter}
                                            onChange={(e) => setDaysFilter(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent"
                                        >
                                            <option value="all">All Days</option>
                                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                                                <option key={day} value={day}>
                                                    {day}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="w-full sm:w-[150px]">
                                        <input
                                            type="date"
                                            value={dateFilter}
                                            onChange={(e) => setDateFilter(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent"
                                        />
                                    </div>
                                    <div className="w-full sm:w-[150px]">
                                        <select
                                            value={timeFilter}
                                            onChange={(e) => setTimeFilter(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent"
                                        >
                                            <option value="all">All Times</option>
                                            {uniqueTimes.slice(1).map((time) => (
                                                <option key={time} value={time}>
                                                    {time}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="max-w-7xl mx-auto">
                                <Paper elevation={2} className="overflow-hidden">
                                    <TableContainer>
                                        <Table size="small">
                                            <TableHead className="bg-customGreen">
                                                <TableRow>
                                                    <TableCell sx={{ color: 'white', fontWeight: 500, textAlign: 'center', padding: '16px 8px', whiteSpace: 'nowrap' }}>Type</TableCell>
                                                    <TableCell sx={{ color: 'white', fontWeight: 500, textAlign: 'center', padding: '16px 8px', whiteSpace: 'nowrap' }}>Days/Date</TableCell>
                                                    <TableCell sx={{ color: 'white', fontWeight: 500, textAlign: 'center', padding: '16px 8px', whiteSpace: 'nowrap' }}>Time</TableCell>
                                                    <TableCell sx={{ color: 'white', fontWeight: 500, textAlign: 'center', padding: '16px 8px', whiteSpace: 'nowrap' }}>Car</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {filteredAvailability.length > 0 ? (
                                                    filteredAvailability.map((slot) => (
                                                        <TableRow key={slot.id} hover>
                                                            <TableCell sx={{ textAlign: 'center', padding: '16px 8px', whiteSpace: 'nowrap' }}>
                                                                <Chip
                                                                    label={slot.type === 'recurring' ? 'Weekly' : 'One-time'}
                                                                    size="small"
                                                                    color={slot.type === 'recurring' ? 'success' : 'warning'}
                                                                    sx={{ fontSize: '0.75rem' }}
                                                                />
                                                            </TableCell>
                                                            <TableCell sx={{ textAlign: 'center', padding: '16px 8px', whiteSpace: 'nowrap' }}>
                                                                {slot.type === 'recurring' ? (
                                                                    <div className="flex flex-wrap gap-1 justify-center">
                                                                        {slot.days.map((day) => (
                                                                            <Chip
                                                                                key={day}
                                                                                label={day}
                                                                                size="small"
                                                                                color="primary"
                                                                                sx={{ 
                                                                                    backgroundColor: '#72b626',
                                                                                    fontSize: '0.75rem'
                                                                                }}
                                                                            />
                                                                        ))}
                                                                    </div>
                                                                ) : (
                                                                    <Typography variant="body2">
                                                                        {new Date(slot.specificDate).toLocaleDateString('en-US', {
                                                                            weekday: 'long',
                                                                            year: 'numeric',
                                                                            month: 'long',
                                                                            day: 'numeric'
                                                                        })}
                                                                    </Typography>
                                                                )}
                                                            </TableCell>
                                                            <TableCell sx={{ textAlign: 'center', padding: '16px 8px', whiteSpace: 'nowrap' }}>
                                                                <Typography variant="body2">
                                                                    {slot.time}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell sx={{ textAlign: 'center', padding: '16px 8px', whiteSpace: 'nowrap' }}>
                                                                <div className="flex items-center justify-center gap-2">
                                                                    <Avatar
                                                                        src={slot.carImage}
                                                                        alt={slot.carName}
                                                                        variant="rounded"
                                                                        sx={{ width: 32, height: 32 }}
                                                                    />
                                                                    <Typography variant="body2">
                                                                        {slot.carName}
                                                                    </Typography>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={4} sx={{ textAlign: 'center', padding: '24px' }}>
                                                            <Typography variant="body1" color="textSecondary">
                                                                No available time slots found
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>
        </div>
    );
};

export default TrainerDetails;
