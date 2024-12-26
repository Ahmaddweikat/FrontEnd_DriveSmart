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
  Tooltip
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const LessonsTable = ({ lessons, handleStatusChange, currentPage, totalPages, handlePageChange, showActions = false }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
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
              <TableCell sx={headerCellStyle}>Student</TableCell>
              <TableCell sx={headerCellStyle}>License Type</TableCell>
              <TableCell sx={headerCellStyle}>Days / Date</TableCell>
              <TableCell sx={headerCellStyle}>Time</TableCell>
              <TableCell sx={headerCellStyle}>Car</TableCell>
              <TableCell sx={headerCellStyle}>Status</TableCell>
              {showActions && (
                <TableCell sx={headerCellStyle}>Actions</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {lessons.length > 0 ? (
              lessons.map((lesson) => (
                <TableRow key={lesson.id} hover>
                  <TableCell sx={bodyCellStyle}>
                    <div className="flex items-center justify-center gap-3">
                      <Avatar 
                        src={lesson.studentAvatar} 
                        alt={lesson.studentName}
                      />
                      <span>{lesson.studentName}</span>
                    </div>
                  </TableCell>
                  <TableCell sx={bodyCellStyle}>
                    <div className="flex items-center justify-center">
                      {lesson.licenseType}
                    </div>
                  </TableCell>
                  <TableCell sx={bodyCellStyle}>
                    <div className="flex items-center justify-center">
                      {lesson.displayDays}
                    </div>
                  </TableCell>
                  <TableCell sx={bodyCellStyle}>
                    <div className="flex items-center justify-center">
                      {lesson.time}
                    </div>
                  </TableCell>
                  <TableCell sx={bodyCellStyle}>
                    <div className="flex items-center justify-center gap-3">
                      <Tooltip title={lesson.carName}>
                        <Avatar 
                          src={lesson.carImage} 
                          alt={lesson.carName}
                          variant="rounded"
                          sx={{ width: 56, height: 32, objectFit: 'cover' }}
                        />
                      </Tooltip>
                      <span>{lesson.carName}</span>
                    </div>
                  </TableCell>
                  <TableCell sx={bodyCellStyle}>
                    <div className="flex items-center justify-center">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(lesson.status)}`}>
                        {lesson.status}
                      </span>
                    </div>
                  </TableCell>
                  {showActions && (
                    <TableCell sx={bodyCellStyle}>
                      <div className="flex items-center justify-center gap-2">
                        <IconButton
                          onClick={() => handleStatusChange(lesson.id, 'accepted')}
                          color="success"
                          size="small"
                          title="Accept"
                        >
                          <CheckCircleOutlineIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleStatusChange(lesson.id, 'declined')}
                          color="error"
                          size="small"
                          title="Decline"
                        >
                          <CancelOutlinedIcon />
                        </IconButton>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell 
                  colSpan={showActions ? 7 : 6} 
                  align="center" 
                  sx={{ py: 4 }}
                >
                  <p className="text-gray-500">No lessons available</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {lessons.length > 0 && (
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

export default LessonsTable;
