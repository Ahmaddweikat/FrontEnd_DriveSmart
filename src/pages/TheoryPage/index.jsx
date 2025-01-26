import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  Grid,
  Button,
  useTheme,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";
import { QuestionMark, PlayArrow, Timer } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { personalLicenseForms } from "./data/personalLicense/index";
import ExamEligibility from "./components/ExamEligibility";

const customGreen = {
  main: "#4CAF50",
  light: "#81C784",
  dark: "#388E3C",
  contrastText: "#ffffff",
};

// Add this mock data (later replace with real data from backend)
const quizAttempts = [
  {
    id: 1,
    quizTitle: "Personal License Form 1",
    date: "2024-01-15",
    score: 85,
    correctAnswers: 17,
    totalQuestions: 20,
    timeSpent: "35 minutes",
    status: "Passed",
  },
  {
    id: 2,
    quizTitle: "Personal License Form 2",
    date: "2024-01-14",
    score: 75,
    correctAnswers: 15,
    totalQuestions: 20,
    timeSpent: "42 minutes",
    status: "Passed",
  },
  {
    id: 3,
    quizTitle: "Personal License Form 2",
    date: "2024-01-14",
    score: 75,
    correctAnswers: 15,
    totalQuestions: 20,
    timeSpent: "42 minutes",
    status: "Passed",
  },
  {
    id: 4,
    quizTitle: "Personal License Form 2",
    date: "2024-01-14",
    score: 75,
    correctAnswers: 15,
    totalQuestions: 20,
    timeSpent: "42 minutes",
    status: "Passed",
  },
];

const questionSets = personalLicenseForms.map((form) => ({
  id: form.id,
  title: form.title,
  questionsCount: form.questions.length,
  timeLimit: form.timeLimit || "45 minutes",
  formType: form.formType,
}));

const TheoryPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleStartQuiz = (quizId, formType) => {
    // Navigate to the specific quiz
    navigate(`/student/theory/quiz/${formType}`);
  };
  return (
    <div className="overflow-y-auto">
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Header Section */}
        <Box sx={{ mb: 8, textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              background: `linear-gradient(45deg, ${customGreen.main} 30%, ${customGreen.light} 90%)`,
              backgroundClip: "text",
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3,
            }}
          >
            Theory Test Practice
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Master your driving theory with our comprehensive question sets
          </Typography>
        </Box>

        {/* Practice Tests Section */}
        <Box sx={{ mb: 10 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Available Practice Tests
          </Typography>
          <Grid container spacing={4}>
            {questionSets.map((set) => (
              <Grid item xs={12} md={4} key={set.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    },
                    position: "relative",
                    overflow: "visible",
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ p: 3, flexGrow: 1 }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      component="div"
                      sx={{ fontWeight: "bold" }}
                    >
                      {set.title}
                    </Typography>

                    <Box
                      sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}
                    >
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
                        color: "white",
                        textTransform: "none",
                        fontWeight: "bold",
                        "&:hover": {
                          background: `linear-gradient(45deg, ${customGreen.dark} 30%, ${customGreen.main} 90%)`,
                        },
                      }}
                    >
                      Start Practice
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Exam Eligibility Section */}
        <Box sx={{ mb: 10 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Official Exam Eligibility
          </Typography>
          <ExamEligibility successRate={99} />
        </Box>

        {/* Quiz History Section */}
        <Box>
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Your Quiz History
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              borderRadius: 2,
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: customGreen.light }}>
                  <TableCell>Date</TableCell>
                  <TableCell>Quiz Title</TableCell>
                  <TableCell align="center">Score</TableCell>
                  <TableCell align="center">Correct Answers</TableCell>
                  <TableCell align="center">Time Spent</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quizAttempts.map((attempt) => (
                  <TableRow
                    key={attempt.id}
                    sx={{
                      "&:hover": { backgroundColor: "#f5f5f5" },
                    }}
                  >
                    <TableCell>
                      {new Date(attempt.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{attempt.quizTitle}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={`${attempt.score}%`}
                        color={attempt.score >= 80 ? "success" : "warning"}
                        sx={{ fontWeight: "bold" }}
                      />
                    </TableCell>
                    <TableCell align="center">{`${attempt.correctAnswers}/${attempt.totalQuestions}`}</TableCell>
                    <TableCell align="center">{attempt.timeSpent}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={attempt.status}
                        color={
                          attempt.status === "Passed" ? "success" : "error"
                        }
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </div>
  );
};
export default TheoryPage;
