import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  Grid,
  Button,
  IconButton,
  useTheme,
  Paper,
  CircularProgress,
  Chip
} from '@mui/material';
import { 
  QuestionMark,
  PlayArrow,
  Timer,
  School,
  CheckCircleOutline
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { personalLicenseForms } from './data/personalLicense/index';

const customGreen = {
  main: '#4CAF50',
  light: '#81C784',
  dark: '#388E3C',
  contrastText: '#ffffff'
};

const questionSets = personalLicenseForms.map(form => ({
  id: form.id,
  title: form.title,
  questionsCount: form.questions.length,
  timeLimit: form.timeLimit || "45 minutes",
  formType: form.formType
}));

const TheoryPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleStartQuiz = (quizId, formType) => {
    // Navigate to the specific quiz
    navigate(`/student/theory/quiz/${formType}`);
  };

  return (
    <div className='overflow-y-auto'>
    <Container maxWidth="lg" sx={{ py: 4}}>
      {/* Header Section */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom
          sx={{
            fontWeight: 'bold',
            background: `linear-gradient(45deg, ${customGreen.main} 30%, ${customGreen.light} 90%)`,
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
          Theory Test Practice
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Master your driving theory with our comprehensive question sets
        </Typography>
      </Box>

      {/* Question Sets Grid */}
      <Grid container spacing={4}>
        {questionSets.map((set) => (
          <Grid item xs={12} md={4} key={set.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                },
                position: 'relative',
                overflow: 'visible',
                borderRadius: 2,
              }}
            >
              <Box sx={{ p: 3, flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                  {set.title}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                  <Chip
                    icon={<Timer sx={{ fontSize: 16 }} />}
                    label={set.timeLimit}
                    size="small"
                    sx={{ borderRadius: 1 }}
                  />
                  <Chip
                    icon={<QuestionMark sx={{ fontSize: 16 }} />}
                    label={`${set.questionsCount} Questions`}
                    size="small"
                    sx={{ borderRadius: 1 }}
                  />
                </Box>

                <Button
                  variant="contained"
                  startIcon={<PlayArrow />}
                  onClick={() => handleStartQuiz(set.id, set.formType)}
                  fullWidth
                  sx={{
                    mt: 2,
                    background: `linear-gradient(45deg, ${customGreen.main} 30%, ${customGreen.light} 90%)`,
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': {
                      background: `linear-gradient(45deg, ${customGreen.dark} 30%, ${customGreen.main} 90%)`,
                    }
                  }}
                >
                  Start Practice
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </div>
  );
};

export default TheoryPage;
