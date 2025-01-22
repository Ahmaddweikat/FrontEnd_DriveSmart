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
    padding: '16px 8px',
    whiteSpace: 'nowrap'
  };

  const bodyCellStyle = {
    textAlign: 'center',
    padding: '16px 8px',
    whiteSpace: 'nowrap'
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Paper elevation={2} className="overflow-hidden">
        <TableContainer>
          <Table size="small">
            <TableHead className="bg-customGreen">
              <TableRow>
                <TableCell sx={headerCellStyle}>Student</TableCell>
                <TableCell sx={headerCellStyle}>Gender</TableCell>
                <TableCell sx={headerCellStyle}>License Type</TableCell>
                <TableCell sx={headerCellStyle}>Contact Number</TableCell>
                <TableCell sx={headerCellStyle}>Lessons Taken</TableCell>
                <TableCell sx={headerCellStyle}>Blood Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentStudents.length > 0 ? (
                currentStudents.map((student) => (
                  <TableRow key={student.id} hover>
                    <TableCell sx={bodyCellStyle}>
                      <div className="flex items-center justify-center gap-3">
                        <Avatar 
                          src={`https://randomuser.me/api/portraits/${student.gender.toLowerCase() === 'male' ? 'men' : 'women'}/${student.id}.jpg`}
                          alt={student.name}
                          sx={{ width: 40, height: 40 }}
                        />
                        <Typography className="text-sm">{student.name}</Typography>
                      </div>
                    </TableCell>
                    <TableCell sx={bodyCellStyle}>
                      <div className="flex items-center justify-center">
                        <Typography className="text-sm">{student.gender}</Typography>
                      </div>
                    </TableCell>
                    <TableCell sx={bodyCellStyle}>
                      <div className="flex items-center justify-center">
                        <Typography className="text-sm">{student.licenseType}</Typography>
                      </div>
                    </TableCell>
                    <TableCell sx={bodyCellStyle}>
                      <div className="flex items-center justify-center">
                        <Typography className="text-sm">{student.contactNumber}</Typography>
                      </div>
                    </TableCell>
                    <TableCell sx={bodyCellStyle}>
                      <div className="flex items-center justify-center">
                        <Typography className="text-sm">{student.lessonsTaken} lessons</Typography>
                      </div>
                    </TableCell>
                    <TableCell sx={bodyCellStyle}>
                      <div className="flex items-center justify-center">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          {student.bloodType}
                        </span>
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
                    <Typography className="text-gray-500">No students available</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default StudentTable;
