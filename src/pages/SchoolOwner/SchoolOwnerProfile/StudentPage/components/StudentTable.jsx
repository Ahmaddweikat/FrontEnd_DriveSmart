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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';

const StudentTable = ({
    students,
    handleDelete,
    currentPage,
    totalPages,
    handlePageChange
}) => {
    const headerCellStyle = {
        color: 'white',
        fontWeight: 500,
        textAlign: 'center',
        padding: '16px 8px',
        width: '150px',
    };

    const bodyCellStyle = {
        textAlign: 'center',
        padding: '16px 8px',
        width: '150px',
    };

    return (
        <Paper elevation={2} className="overflow-hidden">
            <TableContainer>
                <Table>
                    <TableHead className="bg-customGreen">
                        <TableRow>
                            <TableCell sx={headerCellStyle}>Student</TableCell>
                            <TableCell sx={headerCellStyle}>Gender</TableCell>
                            <TableCell sx={headerCellStyle}>License Type</TableCell>
                            <TableCell sx={headerCellStyle}>Phone</TableCell>
                            <TableCell sx={headerCellStyle}>Trainer</TableCell>
                            <TableCell sx={headerCellStyle}>Number of Lessons</TableCell>
                            <TableCell sx={headerCellStyle}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.length > 0 ? (
                            students.map((student) => (
                                <TableRow key={student.id} hover>
                                    <TableCell sx={bodyCellStyle}>
                                        <div className="flex items-center justify-center gap-3">
                                            <Tooltip title={`${student.firstName} ${student.lastName}`}>
                                                <Avatar
                                                    src={student.image}
                                                    alt={`${student.firstName} ${student.lastName}`}
                                                    sx={{
                                                        bgcolor: '#e0e0e0'
                                                    }}
                                                >
                                                    <PersonIcon />
                                                </Avatar>
                                            </Tooltip>
                                            <div className="flex flex-col items-start">
                                                <span className="font-medium">{student.firstName} {student.lastName}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell sx={bodyCellStyle}>
                                        <div className="flex items-center justify-center">
                                            {student.gender}
                                        </div>
                                    </TableCell>
                                    <TableCell sx={bodyCellStyle}>
                                        <div className="flex items-center justify-center">
                                            {student.licenseType}
                                        </div>
                                    </TableCell>
                                    <TableCell sx={bodyCellStyle}>
                                        <div className="flex items-center justify-center">
                                            {student.phone}
                                        </div>
                                    </TableCell>
                                    <TableCell sx={bodyCellStyle}>
                                        <div className="flex items-center justify-center">
                                            {student.trainer}
                                        </div>
                                    </TableCell>
                                    <TableCell sx={bodyCellStyle}>
                                        <div className="flex items-center justify-center">
                                            {student.numberOfLessons}
                                        </div>
                                    </TableCell>
                                    <TableCell sx={bodyCellStyle}>
                                        <div className="flex items-center justify-center">
                                            <IconButton
                                                onClick={() => handleDelete(student.id)}
                                                color="error"
                                                size="small"
                                                title="Delete"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    align="center"
                                    sx={{ py: 4 }}
                                >
                                    <p className="text-gray-500">No students available</p>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {students.length > 0 && (
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

export default StudentTable;
