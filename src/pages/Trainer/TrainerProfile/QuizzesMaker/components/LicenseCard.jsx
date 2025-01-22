import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Tooltip,
  Pagination
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const LicenseCard = ({
  licenseType,
  quizzes,
  onNewQuiz,
  onEditQuiz,
  onDeleteQuiz,
  onPageChange,
  getPaginatedItems
}) => {
  const {
    currentItems: currentQuizzes,
    currentPage,
    totalPages,
    startIndex
  } = getPaginatedItems(quizzes, licenseType);

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ color: '#72b626' }}>
            {licenseType}
          </Typography>
          <Button
            startIcon={<AddIcon />}
            onClick={() => onNewQuiz(licenseType)}
            variant="contained"
            size="small"
            sx={{ 
              bgcolor: '#72b626',
              '&:hover': {
                bgcolor: '#5a9320',
              },
            }}
          >
            Add Quiz
          </Button>
        </Box>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <TableContainer 
            component={Paper} 
            sx={{ 
              maxHeight: 350,
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '0.4em'
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#888'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#555'
              }
            }}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Questions</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Created</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentQuizzes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography variant="body2" color="textSecondary">
                        No quizzes available
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  currentQuizzes.map((quiz, index) => (
                    <TableRow key={quiz.id} hover>
                      <TableCell>{quiz.title}</TableCell>
                      <TableCell>{quiz.questions.length}</TableCell>
                      <TableCell>
                        {new Date(quiz.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Edit Quiz">
                          <IconButton 
                            size="small" 
                            onClick={() => onEditQuiz(licenseType, startIndex + index)}
                            sx={{ color: '#72b626' }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Quiz">
                          <IconButton 
                            size="small" 
                            onClick={() => onDeleteQuiz(licenseType, startIndex + index)}
                            color="error"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="flex justify-center mt-4" style={{ marginTop: '1rem' }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => onPageChange(licenseType, event, value)}
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#72b626',
                },
                '& .Mui-selected': {
                  bgcolor: '#72b626 !important',
                  color: 'white !important',
                  '&:hover': {
                    bgcolor: '#5a9320 !important',
                  },
                },
                '& .MuiPaginationItem-page:hover': {
                  bgcolor: 'rgba(114, 182, 38, 0.1) !important',
                },
              }}
            />
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LicenseCard;
