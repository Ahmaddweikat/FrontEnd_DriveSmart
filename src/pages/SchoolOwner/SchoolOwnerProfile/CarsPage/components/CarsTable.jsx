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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const CarsTable = ({
    cars,
    handleEdit,
    handleDelete,
    currentPage,
    totalPages,
    handlePageChange
}) => {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'available':
                return 'bg-green-100 text-green-800';
            case 'in use':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

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
                            <TableCell sx={headerCellStyle}>Car</TableCell>
                            <TableCell sx={headerCellStyle}>Year</TableCell>
                            <TableCell sx={headerCellStyle}>Transmission</TableCell>
                            <TableCell sx={headerCellStyle}>Owner</TableCell>
                            <TableCell sx={headerCellStyle}>Status</TableCell>
                            <TableCell sx={headerCellStyle}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cars.length > 0 ? (
                            cars.map((car) => (
                                <TableRow key={car.id} hover>
                                    <TableCell sx={bodyCellStyle}>
                                        <div className="flex items-center justify-center gap-3">
                                            <Tooltip title={car.model}>
                                                <Avatar
                                                    src={car.image}
                                                    alt={car.model}
                                                    variant="rounded"
                                                    sx={{
                                                        width: 56,
                                                        height: 32,
                                                        bgcolor: '#e0e0e0'
                                                    }}
                                                >
                                                    <DirectionsCarIcon />
                                                </Avatar>
                                            </Tooltip>
                                            <span>{car.model}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell sx={bodyCellStyle}>
                                        <div className="flex items-center justify-center">
                                            {car.year}
                                        </div>
                                    </TableCell>
                                    <TableCell sx={bodyCellStyle}>
                                        <div className="flex items-center justify-center">
                                            {car.transmission}
                                        </div>
                                    </TableCell>
                                    <TableCell sx={bodyCellStyle}>
                                        <div className="flex items-center justify-center">
                                            {car.owner}
                                        </div>
                                    </TableCell>
                                    <TableCell sx={bodyCellStyle}>
                                        <div className="flex items-center justify-center">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(car.status)}`}>
                                                {car.status}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell sx={bodyCellStyle}>
                                        <div className="flex items-center justify-center gap-2">
                                            <IconButton
                                                onClick={() => handleEdit(car)}
                                                color="primary"
                                                size="small"
                                                title="Edit"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleDelete(car.id)}
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
                                    colSpan={6}
                                    align="center"
                                    sx={{ py: 4 }}
                                >
                                    <p className="text-gray-500">No cars available</p>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {cars.length > 0 && (
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

export default CarsTable;
