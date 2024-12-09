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

const questionSets = personalLicenseForms.map(form => ({
  id: form.id,
  title: form.title,
  questionsCount: form.questions.length,
  timeLimit: form.timeLimit || "45 minutes",
  category: form.category || "General",
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
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
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
          <Grid item xs={12} md={6} key={set.id}>
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
              {/* Progress Indicator */}
              {/* <Box
                sx={{
                  position: 'absolute',
                  top: -10,
                  right: -10,
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  padding: '2px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                <CircularProgress variant="determinate" value={parseInt(set.progress)} size={44} />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="caption" component="div" color="text.secondary">
                    {set.progress}
                  </Typography>
                </Box>
              </Box> */}

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
                  {/* <Chip
                    icon={<School sx={{ fontSize: 16 }} />}
                    label={set.difficulty}
                    size="small"
                    sx={{ borderRadius: 1 }}
                  /> */}
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
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
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

      {/* Quick Stats Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Your Progress
        </Typography>
        <Grid container spacing={3}>
          {[
            { title: 'Tests Completed', value: '12', icon: CheckCircleOutline },
            { title: 'Average Score', value: '85%', icon: School },
            { title: 'Time Spent', value: '6.5 hrs', icon: Timer },
          ].map((stat, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  backgroundColor: 'rgba(33, 150, 243, 0.04)',
                  borderRadius: 2,
                }}
              >
                <IconButton
                  sx={{
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    mb: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(33, 150, 243, 0.2)',
                    }
                  }}
                >
                  <stat.icon color="primary" />
                </IconButton>
                <Typography variant="h4" gutterBottom>
                  {stat.value}
                </Typography>
                <Typography color="text.secondary">
                  {stat.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
    </div>
  );
};

export default TheoryPage;
