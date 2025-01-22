import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Typography,
    Avatar,
    Divider,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Table,
    TableBody,
    TableCell,
    Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import StudentTable from './StudentTable';

const TrainerDetailsDialog = ({ open, onClose, trainer }) => {
    if (!trainer) return null;

    const enhancedStudents = trainer.students.map(student => {
        console.log('Original student data:', student);
        return {
            id: student.id,
            name: student.name,
            avatar: student.avatar,
            gender: student.gender || 'Not Specified',
            licenseType: student.licenseType || '-',
            contactNumber: student.phone || '-',
            lessonsTaken: student.lessonsTaken, 
            bloodType: student.bloodType || '-'
        };
    });

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
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle className="flex justify-between items-center">
                <Typography variant="h6">Trainer Details</Typography>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <div className="space-y-6">
                    {/* Personal Information */}
                    <div className="flex items-center gap-4 mb-6">
                        <Avatar
                            src={trainer.avatar}
                            alt={trainer.name}
                            sx={{ width: 80, height: 80 }}
                        >
                            <PersonIcon />
                        </Avatar>
                        <div>
                            <Typography variant="h6">{trainer.name}</Typography>
                            <Chip
                                label={trainer.status}
                                color={
                                    trainer.status === 'available' ? 'success' :
                                    trainer.status === 'busy' ? 'warning' : 'error'
                                }
                                size="small"
                            />
                        </div>
                    </div>

                    <Divider />

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                    <Divider />

                    {/* Students Table */}
                    <div>
                        <Typography variant="h6" className="mb-3">
                            Current Students
                        </Typography>
                        <StudentTable currentStudents={enhancedStudents} />
                    </div>

                    <Divider />

                    {/* Availability Schedule */}
                    <div>
                        <Typography variant="h6" className="mb-3">
                            Available Time Slots
                        </Typography>
                        <TableContainer component={Paper} variant="outlined">
                            <Table size="small">
                                <TableHead className="bg-customGreen">
                                    <TableRow>
                                        <TableCell sx={{ color: 'white' }}>Days</TableCell>
                                        <TableCell sx={{ color: 'white' }}>Time</TableCell>
                                        <TableCell sx={{ color: 'white' }}>Car</TableCell>
                                        <TableCell sx={{ color: 'white' }}>Recurring</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {trainer.availability.map((slot) => (
                                        <TableRow key={slot.id} hover>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
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
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {slot.time}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
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
                                            <TableCell>
                                                <Chip
                                                    label={slot.isRecurring ? 'Weekly' : 'One-time'}
                                                    size="small"
                                                    color={slot.isRecurring ? 'success' : 'warning'}
                                                    sx={{ fontSize: '0.75rem' }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TrainerDetailsDialog;
