import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Avatar,
  Stack,
  Pagination
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "accepted":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const RequestsList = ({ 
  requests, 
  onAccept, 
  onReject, 
  currentPage, 
  totalPages, 
  handlePageChange 
}) => {
  const hasPendingRequests = requests.some(request => request.status === "pending");

  const headerCellStyle = {
    color: 'white',
    fontWeight: 500,
    textAlign: 'center',
    padding: '16px 8px',
    whiteSpace: 'nowrap',
    minWidth: '120px'
  };

  const bodyCellStyle = {
    textAlign: 'center',
    padding: '16px 8px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    minWidth: '120px'
  };

  const columnWidths = {
    student: { minWidth: '200px' },
    email: { minWidth: '250px' },
    licenseType: { minWidth: '120px' },
    submissionDate: { minWidth: '150px' },
    status: { minWidth: '120px' },
    documents: { minWidth: '120px' },
    actions: { minWidth: '120px' }
  };

  return (
    <Paper elevation={2} className="overflow-hidden">
      <TableContainer className="overflow-x-auto" sx={{ maxHeight: 'calc(100vh - 300px)' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ ...headerCellStyle, ...columnWidths.student, backgroundColor: '#72b626' }}>Student</TableCell>
              <TableCell sx={{ ...headerCellStyle, ...columnWidths.email, backgroundColor: '#72b626' }}>Email</TableCell>
              <TableCell sx={{ ...headerCellStyle, ...columnWidths.licenseType, backgroundColor: '#72b626' }}>License Type</TableCell>
              <TableCell sx={{ ...headerCellStyle, ...columnWidths.submissionDate, backgroundColor: '#72b626' }}>Submission Date</TableCell>
              <TableCell sx={{ ...headerCellStyle, ...columnWidths.status, backgroundColor: '#72b626' }}>Status</TableCell>
              <TableCell sx={{ ...headerCellStyle, ...columnWidths.documents, backgroundColor: '#72b626' }}>Documents</TableCell>
              {hasPendingRequests && (
                <TableCell sx={{ ...headerCellStyle, ...columnWidths.actions, backgroundColor: '#72b626' }}>Actions</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.length > 0 ? (
              requests.map((request) => (
                <TableRow key={request.id} hover>
                  <TableCell sx={{ ...bodyCellStyle, ...columnWidths.student }}>
                    <div className="flex items-center justify-center gap-3">
                      <Avatar>{request.student.name[0]}</Avatar>
                      <span className="truncate">{request.student.name}</span>
                    </div>
                  </TableCell>
                  <TableCell sx={{ ...bodyCellStyle, ...columnWidths.email }}>
                    <div className="flex items-center justify-center">
                      <span className="truncate">{request.student.email}</span>
                    </div>
                  </TableCell>
                  <TableCell sx={{ ...bodyCellStyle, ...columnWidths.licenseType }}>
                    <div className="flex items-center justify-center">
                      <span className="truncate">{request.student.licenseType}</span>
                    </div>
                  </TableCell>
                  <TableCell sx={{ ...bodyCellStyle, ...columnWidths.submissionDate }}>
                    <div className="flex items-center justify-center">
                      {new Date(request.submissionDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell sx={{ ...bodyCellStyle, ...columnWidths.status }}>
                    <div className="flex items-center justify-center">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell sx={{ ...bodyCellStyle, ...columnWidths.documents }}>
                    <div className="flex items-center justify-center gap-2">
                      {request.files.map((file, index) => (
                        <Tooltip key={index} title={file.name}>
                          <IconButton
                            size="small"
                            onClick={() => window.open(file.url)}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      ))}
                    </div>
                  </TableCell>
                  {hasPendingRequests && (
                    <TableCell sx={{ ...bodyCellStyle, ...columnWidths.actions }}>
                      {request.status === "pending" && (
                        <div className="flex items-center justify-center gap-2">
                          <IconButton
                            onClick={() => onAccept(request.id)}
                            color="success"
                            size="small"
                            title="Accept"
                          >
                            <CheckCircleOutlineIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => onReject(request.id)}
                            color="error"
                            size="small"
                            title="Reject"
                          >
                            <CancelOutlinedIcon />
                          </IconButton>
                        </div>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell 
                  colSpan={hasPendingRequests ? 7 : 6} 
                  align="center" 
                  sx={{ py: 4 }}
                >
                  <p className="text-gray-500">No registration requests available</p>
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
              color="primary"
            />
          </Stack>
        </div>
      )}
    </Paper>
  );
};

export default RequestsList;
