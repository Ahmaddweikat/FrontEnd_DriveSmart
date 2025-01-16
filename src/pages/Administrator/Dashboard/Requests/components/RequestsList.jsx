import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Stack,
  Pagination,
  Chip,
  Avatar
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SchoolIcon from '@mui/icons-material/School';
import RequestDetails from './RequestDetails';

const RequestsList = ({
  requests,
  onAccept,
  onReject,
  currentPage,
  totalPages,
  handlePageChange
}) => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseDetails = () => {
    setSelectedRequest(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  // Check if any request is pending to determine if we should show the Actions column
  const showActionsColumn = requests.some(request => request.status === 'pending');

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
                <TableCell sx={headerCellStyle}>Contact Info</TableCell>
                <TableCell sx={headerCellStyle}>Status</TableCell>
                <TableCell sx={headerCellStyle}>Submission Date</TableCell>
                <TableCell sx={headerCellStyle}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.length > 0 ? (
                requests.map((request) => (
                  <TableRow key={request.id} hover>
                    <TableCell sx={bodyCellStyle}>
                      <div className="flex items-center justify-center gap-3">
                        <Tooltip title={request.school.name}>
                          <Avatar
                            src={request.school.logo}
                            alt={request.school.name}
                            sx={{
                              bgcolor: '#e0e0e0'
                            }}
                          >
                            <SchoolIcon />
                          </Avatar>
                        </Tooltip>
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{request.school.name}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell sx={bodyCellStyle}>
                      <div className="flex items-center justify-center">
                        {request.school.address}
                      </div>
                    </TableCell>
                    <TableCell sx={bodyCellStyle}>
                      <div className="flex items-center justify-center">
                        {request.school.city}
                      </div>
                    </TableCell>
                    <TableCell sx={bodyCellStyle}>
                      <div className="flex flex-col items-center">
                        <span>{request.school.email}</span>
                        <span>{request.school.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell sx={bodyCellStyle}>
                      <Chip
                        label={request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        color={getStatusColor(request.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell sx={bodyCellStyle}>
                      <div className="flex items-center justify-center">
                        {formatDate(request.submissionDate)}
                      </div>
                    </TableCell>
                    <TableCell sx={bodyCellStyle}>
                      <div className="flex items-center justify-center gap-2">
                        <Tooltip title="View Details">
                          <IconButton
                            onClick={() => handleViewDetails(request)}
                            color="info"
                            size="small"
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        {request.status === 'pending' && (
                          <>
                            <Tooltip title="Accept">
                              <IconButton
                                onClick={() => onAccept(request.id)}
                                sx={{ 
                                  color: '#72b626',
                                }}
                                size="small"
                              >
                                <CheckCircleIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Reject">
                              <IconButton
                                onClick={() => onReject(request.id)}
                                color="error"
                                size="small"
                              >
                                <CancelIcon />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
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
                    <p className="text-gray-500">No requests found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {requests.length > 0 && (
          <div className="flex justify-center py-4 bg-white">
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                shape="rounded"
                variant="outlined"
                color='primary'
                // sx={{
                //   '& .MuiPaginationItem-root': {
                //     '&.Mui-selected': {
                //       bgcolor: '#72b626',
                //       color: 'white',
                //       '&:hover': {
                //         bgcolor: '#5a9320',
                //       },
                //     },
                //   },
                // }}
              />
            </Stack>
          </div>
        )}
      </Paper>
      <RequestDetails
        open={!!selectedRequest}
        onClose={handleCloseDetails}
        request={selectedRequest}
      />
    </>
  );
};

export default RequestsList;
