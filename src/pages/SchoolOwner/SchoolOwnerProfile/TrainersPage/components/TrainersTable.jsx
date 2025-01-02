import React from 'react';
import {
    Pagination,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Avatar,
    Tooltip,
    Chip,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';

const TrainersTable = ({ 
    trainers, 
    handleViewDetails,
    currentPage, 
    totalPages, 
    handlePageChange 
}) => {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'available':
                return 'bg-green-100 text-green-800';
            case 'busy':
                return 'bg-yellow-100 text-yellow-800';
            case 'on leave':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const headerCellStyle = {
        color: 'white',
        fontWeight: 500,
        textAlign: 'center',
        padding: '16px 8px'
    };

    const bodyCellStyle = {
        textAlign: 'center',
        padding: '16px 8px'
    };

    return (
        <Paper elevation={2} className="overflow-hidden">
            <TableContainer>
                <Table>
                    <TableHead className="bg-customGreen">
                        <TableRow>
                            <TableCell sx={headerCellStyle}>Trainer</TableCell>
                            <TableCell sx={headerCellStyle}>Email</TableCell>
                            <TableCell sx={headerCellStyle}>Phone</TableCell>
                            <TableCell sx={headerCellStyle}>Students</TableCell>
                            <TableCell sx={headerCellStyle}>Status</TableCell>
                            <TableCell sx={headerCellStyle}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trainers.length > 0 ? (
                            trainers.map((trainer) => (
                                <TableRow key={trainer.id} hover>
                                    <TableCell sx={bodyCellStyle}>
                                        <div className="flex items-center justify-center gap-3">
                                            <Avatar 
                                                src={trainer.avatar} 
                                                alt={trainer.name}
                                                sx={{ 
                                                    width: 40, 
                                                    height: 40,
                                                    bgcolor: '#e0e0e0'
                                                }}
                                            >
                                                <PersonIcon />
                                            </Avatar>
                                            <span>{trainer.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell sx={bodyCellStyle}>
                                        <div className="flex items-center justify-center">
                                            {trainer.email}
                                        </div>
                                    </TableCell>
                                    <TableCell sx={bodyCellStyle}>
                                        <div className="flex items-center justify-center">
                                            {trainer.phone}
                                        </div>
                                    </TableCell>
                                    <TableCell sx={bodyCellStyle}>
                                        <div className="flex items-center justify-center">
                                            <Chip 
                                                label={trainer.studentsCount}
                                                size="small"
                                                sx={{
                                                    backgroundColor: '#72b626',
                                                    color: 'white',
                                                    '& .MuiChip-label': {
                                                        fontWeight: 500
                                                    }
                                                }}
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell sx={bodyCellStyle}>
                                        <div className="flex items-center justify-center">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(trainer.status)}`}>
                                                {trainer.status}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell sx={bodyCellStyle}>
                                        <div className="flex items-center justify-center">
                                            <Tooltip title="View Details">
                                                <IconButton
                                                    onClick={() => handleViewDetails(trainer)}
                                                    size="small"
                                                    sx={{
                                                        color: '#72b626',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(114, 182, 38, 0.1)'
                                                        }
                                                    }}
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    align="center"
                                    sx={{ py: 4 }}
                                >
                                    <p className="text-gray-500">No trainers available</p>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {trainers.length > 0 && (
                <div className="flex justify-center py-4 bg-white">
                    <Stack spacing={2}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            shape="rounded"
                            variant="outlined"
                            color="primary"
                        />
                    </Stack>
                </div>
            )}
        </Paper>
    );
};

export default TrainersTable;
