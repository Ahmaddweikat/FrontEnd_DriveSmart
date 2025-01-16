import React from 'react';
import {
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
    Stack,
    Pagination,
    Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SchoolIcon from '@mui/icons-material/School';
import DeleteDialog from './DeleteDialog';

const SchoolTable = ({
    schools,
    handleEdit,
    handleView,
    handleDelete,
    handleDeleteCancel,
    handleDeleteConfirm,
    deleteDialogOpen,
    schoolToDelete,
    currentPage,
    totalPages,
    handlePageChange,
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
        <>
            <Paper elevation={2} className="overflow-hidden">
                <TableContainer>
                    <Table>
                        <TableHead className="bg-customGreen">
                            <TableRow>
                                <TableCell sx={headerCellStyle}>School</TableCell>
                                <TableCell sx={headerCellStyle}>Address</TableCell>
                                <TableCell sx={headerCellStyle}>City</TableCell>
                                <TableCell sx={headerCellStyle}>Phone</TableCell>
                                <TableCell sx={headerCellStyle}>Email</TableCell>
                                <TableCell sx={headerCellStyle}>Website</TableCell>
                                <TableCell sx={headerCellStyle}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {schools.length > 0 ? (
                                schools.map((school) => (
                                    <TableRow key={school.id} hover>
                                        <TableCell sx={bodyCellStyle}>
                                            <div className="flex items-center justify-center gap-3">
                                                <Tooltip title={school.name}>
                                                    <Avatar
                                                        src={school.logo}
                                                        alt={school.name}
                                                        sx={{
                                                            bgcolor: '#e0e0e0'
                                                        }}
                                                    >
                                                        <SchoolIcon />
                                                    </Avatar>
                                                </Tooltip>
                                                <div className="flex flex-col items-start">
                                                    <span className="font-medium">{school.name}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell sx={bodyCellStyle}>
                                            <div className="flex items-center justify-center">
                                                {school.address}
                                            </div>
                                        </TableCell>
                                        <TableCell sx={bodyCellStyle}>
                                            <div className="flex items-center justify-center">
                                                {school.city}
                                            </div>
                                        </TableCell>
                                        <TableCell sx={bodyCellStyle}>
                                            <div className="flex items-center justify-center">
                                                {school.phone}
                                            </div>
                                        </TableCell>
                                        <TableCell sx={bodyCellStyle}>
                                            <div className="flex items-center justify-center">
                                                {school.email}
                                            </div>
                                        </TableCell>
                                        <TableCell sx={bodyCellStyle}>
                                            <div className="flex items-center justify-center">
                                                {school.website}
                                            </div>
                                        </TableCell>
                                        <TableCell sx={bodyCellStyle}>
                                            <div className="flex items-center justify-center gap-2">
                                                <Tooltip title="View Details">
                                                    <IconButton
                                                        onClick={() => handleView(school)}
                                                        color="info"
                                                        size="small"
                                                    >
                                                        <VisibilityIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Edit">
                                                    <IconButton
                                                        onClick={() => handleEdit(school)}
                                                        color="primary"
                                                        size="small"
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton
                                                        onClick={() => handleDelete(school)}
                                                        color="error"
                                                        size="small"
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
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
                                        <p className="text-gray-500">No schools available</p>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {schools.length > 0 && (
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

            <DeleteDialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                schoolName={schoolToDelete?.name}
            />
        </>
    );
};

export default SchoolTable;
