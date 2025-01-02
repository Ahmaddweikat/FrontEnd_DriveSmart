import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Stack,
  Pagination,
} from '@mui/material';

const StudentTable = ({ currentStudents }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLicenseType, setFilterLicenseType] = useState('all');
  
  const ITEMS_PER_PAGE = 10;

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

  const formatContactNumber = (number) => {
    if (!number) return '-';
    const digits = number.replace(/\D/g, '');
    if (digits.length === 10) {
      return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    return number;
  };

  const formatLessons = (lessons) => {
    if (lessons === undefined || lessons === null || isNaN(lessons)) {
      return 'No lessons!';
    }
    return lessons === 0 ? '0 lessons' : `${lessons} ${lessons === 1 ? 'lesson' : 'lessons'}`;
  };

  const filteredStudents = useMemo(() => {
    return currentStudents.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLicenseType = filterLicenseType === 'all' || student.licenseType === filterLicenseType;
      return matchesSearch && matchesLicenseType;
    });
  }, [currentStudents, searchTerm, filterLicenseType]);

  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Get unique license types for filter
  const licenseTypes = ['all', ...new Set(currentStudents.map(student => student.licenseType))];
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-7xl mx-auto mb-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by student name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent"
          />
        </div>
        <div className="w-full sm:w-48">
          <select
            value={filterLicenseType}
            onChange={(e) => setFilterLicenseType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customGreen focus:border-transparent"
          >
            {licenseTypes.map((type) => (
              <option key={type} value={type}>
                {type === 'all' ? 'All License Types' : type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Paper elevation={2} className="overflow-hidden">
        <TableContainer>
          <Table size="small">
            <TableHead className="bg-customGreen">
              <TableRow>
                <TableCell sx={headerCellStyle}>Student</TableCell>
                <TableCell sx={headerCellStyle}>License Type</TableCell>
                <TableCell sx={headerCellStyle}>Contact Number</TableCell>
                <TableCell sx={headerCellStyle}>Lessons Taken</TableCell>
                <TableCell sx={headerCellStyle}>Blood Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedStudents.length > 0 ? (
                paginatedStudents.map((student) => (
                  <TableRow key={student.id} hover>
                    <TableCell sx={bodyCellStyle}>
                      <div className="flex items-center justify-center gap-3">
                        <Avatar 
                          src={student.avatar}
                          alt={student.name}
                          sx={{ width: 40, height: 40 }}
                        />
                        <Typography className="text-sm">{student.name}</Typography>
                      </div>
                    </TableCell>
                    <TableCell sx={bodyCellStyle}>
                      <Typography className="text-sm">{student.licenseType}</Typography>
                    </TableCell>
                    <TableCell sx={bodyCellStyle}>
                      <Typography className="text-sm">{formatContactNumber(student.phone)}</Typography>
                    </TableCell>
                    <TableCell sx={bodyCellStyle}>
                      <Typography className="text-sm" sx={{ textAlign: 'center' }}>{formatLessons(student.lessonsTaken)}</Typography>
                    </TableCell>
                    <TableCell sx={bodyCellStyle}>
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        {student.bloodType}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell 
                    colSpan={5} 
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

      {filteredStudents.length > ITEMS_PER_PAGE && (
        <div className="flex flex-col items-center space-y-4 mt-6">
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
    </div>
  );
};

export default StudentTable;
