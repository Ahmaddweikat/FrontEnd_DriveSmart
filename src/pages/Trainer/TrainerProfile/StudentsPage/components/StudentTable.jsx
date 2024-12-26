import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography
} from '@mui/material';

const StudentTable = ({ currentStudents }) => {
  const headerCellStyle = {
    color: 'white',
    fontWeight: 500,
    textAlign: 'center',
    padding: '16px 8px'
  };

  const bodyCellStyle = {
    textAlign: 'center',
    padding: '16px 8px',
    minWidth: '180px',
    maxWidth: '180px'
  };

  const narrowCellStyle = {
    ...bodyCellStyle,
    minWidth: '120px',
    maxWidth: '120px'
  };

  return (
    <Paper elevation={2} className="overflow-hidden">
      <TableContainer>
        <Table>
          <TableHead className="bg-customGreen">
            <TableRow>
              <TableCell sx={bodyCellStyle}>Student</TableCell>
              <TableCell sx={narrowCellStyle}>Gender</TableCell>
              <TableCell sx={narrowCellStyle}>License Type</TableCell>
              <TableCell sx={narrowCellStyle}>Contact Number</TableCell>
              <TableCell sx={narrowCellStyle}>Lessons Taken</TableCell>
              <TableCell sx={narrowCellStyle}>Blood Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentStudents.map((student) => (
              <TableRow key={student.id} hover>
                <TableCell sx={bodyCellStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
                    <Avatar 
                      src={`https://randomuser.me/api/portraits/${student.gender.toLowerCase() === 'male' ? 'men' : 'women'}/${student.id}.jpg`}
                      alt={student.name}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Typography 
                      variant="body2" 
                      className="text-gray-900"
                      sx={{ fontWeight: 500 }}
                    >
                      {student.name}
                    </Typography>
                  </div>
                </TableCell>
                <TableCell sx={narrowCellStyle}>
                  <Typography variant="body2">{student.gender}</Typography>
                </TableCell>
                <TableCell sx={narrowCellStyle}>
                  <Typography variant="body2">{student.licenseType}</Typography>
                </TableCell>
                <TableCell sx={narrowCellStyle}>
                  <Typography variant="body2">{student.contactNumber}</Typography>
                </TableCell>
                <TableCell sx={narrowCellStyle}>
                  <Typography variant="body2">{student.lessonsTaken} lessons</Typography>
                </TableCell>
                <TableCell sx={narrowCellStyle}>
                  <div className="flex items-center justify-center">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {student.bloodType}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default StudentTable;
