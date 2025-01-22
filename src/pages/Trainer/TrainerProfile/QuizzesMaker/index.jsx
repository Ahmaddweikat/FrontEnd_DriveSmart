import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NewQuizDialog from './components/NewQuizDialog';
import QuestionDialog from './components/QuestionDialog';
import LicenseCard from './components/LicenseCard';
import useQuizManagement from './hooks/useQuizManagement';
import usePagination from './hooks/usePagination';

const LICENSE_TYPES = [
  'A - Motorcycle',
  'B - Car',
  'C - Truck',
  'D - Bus',
  'E - Heavy Equipment',
  'G - Special License'
];

const ROWS_PER_PAGE = 5;

const theme = createTheme({
  palette: {
    primary: {
      main: '#72b626',
    },
  },
});

const QuizzesMaker = () => {
  const {
    quizzes,
    isNewQuizDialogOpen,
    selectedLicenseType,
    newQuizForm,
    formError,
    currentQuizData,
    currentQuestionIndex,
    questions,
    isQuestionDialogOpen,
    setIsNewQuizDialogOpen,
    setNewQuizForm,
    setFormError,
    setCurrentQuestionIndex,
    setIsQuestionDialogOpen,
    handleNewQuiz,
    handleStartQuestions,
    handleSaveQuestion,
    handleEditQuiz,
    handleDeleteQuiz,
  } = useQuizManagement();

  const { handlePageChange, getPaginatedItems } = usePagination(ROWS_PER_PAGE);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        width: '100%', 
        height: 'calc(100vh - 64px)',
        p: 3,
        backgroundColor: '#f5f5f5',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '4px',
          '&:hover': {
            background: '#555',
          },
        },
      }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#72b626' }}>
            Quiz Management
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            Create and manage quizzes for different license types
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          {LICENSE_TYPES.map((licenseType) => (
            <Grid item xs={12} md={6} key={licenseType}>
              <LicenseCard
                licenseType={licenseType}
                quizzes={quizzes[licenseType] || []}
                onNewQuiz={handleNewQuiz}
                onEditQuiz={handleEditQuiz}
                onDeleteQuiz={handleDeleteQuiz}
                onPageChange={handlePageChange}
                getPaginatedItems={getPaginatedItems}
              />
            </Grid>
          ))}
        </Grid>

        <NewQuizDialog
          open={isNewQuizDialogOpen}
          onClose={() => {
            setIsNewQuizDialogOpen(false);
            setFormError('');
          }}
          selectedLicenseType={selectedLicenseType}
          formData={newQuizForm}
          onFormChange={(updates) => {
            setNewQuizForm(prev => ({ ...prev, ...updates }));
            setFormError('');
          }}
          formError={formError}
          onStartQuestions={handleStartQuestions}
        />

        <QuestionDialog
          open={isQuestionDialogOpen}
          onClose={() => setIsQuestionDialogOpen(false)}
          currentQuizData={currentQuizData}
          currentQuestionIndex={currentQuestionIndex}
          onQuestionIndexChange={setCurrentQuestionIndex}
          questions={questions}
          onSaveQuestion={handleSaveQuestion}
        />
      </Box>
    </ThemeProvider>
  );
};

export default QuizzesMaker;
      
