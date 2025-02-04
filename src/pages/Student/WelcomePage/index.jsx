import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  LinearProgress,
} from "@mui/material";
import {
  School,
  MenuBook,
  DateRange,
  AccessTime,
  DirectionsCar,
  Chat,
  Settings,
  Assignment,
  EmojiEvents,
  ArrowForward,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useStudentProgressStore from "../../../store/studentProgress.store";
import useAuthStore from "../../../store/auth.store";

const WelcomePage = () => {
  const navigate = useNavigate();

  // Static flags (replace with actual data later)
  const { user } = useAuthStore();
  const studentName = user.name.split(" ")[0];

  const { theoreticalExamStatus, hasBookedTrainer, successRate } =
    useStudentProgressStore();

  // Mock next lesson data
  const nextLesson = {
    date: "2024-02-20",
    time: "14:30",
    car: {
      name: "Toyota Camry",
      avatar: "https://example.com/car-avatar.jpg",
    },
    trainer: "John Doe",
  };

  const platformServices = [
    {
      title: "Theory Tests",
      icon: <School sx={{ color: "#2196F3" }} />,
      path: "/student/theory",
      description:
        "Practice tests and quizzes to prepare for your theoretical exam",
      requiresTheoryPass: false,
    },
    {
      title: "Study Material",
      icon: <MenuBook sx={{ color: "#4CAF50" }} />,
      path: "/student/material",
      description:
        "Access comprehensive learning resources and road safety guides",
      requiresTheoryPass: false,
    },
    {
      title: "Book Lessons",
      icon: <DateRange sx={{ color: "#FF9800" }} />,
      path: "/student/new-booking",
      description: "Schedule practical driving lessons with qualified trainers",
      requiresTheoryPass: true,
    },
    {
      title: "Chat with Trainer",
      icon: <Chat sx={{ color: "#9C27B0" }} />,
      path: "/student/messages",
      description: "Direct communication with your driving instructor",
      requiresTheoryPass: false,
    },
    {
      title: "My Lessons",
      icon: <Assignment sx={{ color: "#F44336" }} />,
      path: "/student/lessons",
      description: "Track your progress and view upcoming lesson schedule",
      requiresTheoryPass: true,
    },
    {
      title: "Settings",
      icon: <Settings sx={{ color: "#607D8B" }} />,
      path: "/student/settings",
      description: "Manage your account preferences and profile information",
      requiresTheoryPass: false,
    },
  ];

  return (
    <div className="overflow-y-auto">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Welcome Header */}
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          Welcome back, {studentName}! 👋
        </Typography>

        {/* Progress Status */}
        <Card sx={{ mb: 4, backgroundColor: "#f5f5f5" }}>
          <CardContent>
            {theoreticalExamStatus === "Passed" ? (
              <Box>
                <Typography
                  variant="h5"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <EmojiEvents sx={{ color: "#FFD700" }} />
                  Congratulations! You've passed the theoretical exam
                </Typography>
                {!hasBookedTrainer && (
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<ArrowForward />}
                    onClick={() => navigate("/student/new-booking")}
                    sx={{ mt: 2 }}
                  >
                    Book Your First Practical Lesson
                  </Button>
                )}
              </Box>
            ) : (
              <Box>
                <Typography variant="h6">Theoretical Exam Progress</Typography>
                <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
                  Current Success Rate: {successRate}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={successRate}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    mb: 2,
                    backgroundColor: "#e0e0e0",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor:
                        successRate >= 80 ? "#4caf50" : "#ff9800",
                      borderRadius: 5,
                    },
                  }}
                />
                {successRate >= 90 ? (
                  <Box>
                    <Typography
                      variant="body1"
                      color="success.main"
                      sx={{ mb: 2 }}
                    >
                      🎉 Great job! You're ready to take the official
                      theoretical exam.
                    </Typography>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => navigate("/student/theory")}
                      sx={{ mt: 2 }}
                    >
                      Request Official Exam
                    </Button>
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/student/theory")}
                    sx={{ mt: 2 }}
                  >
                    Continue Studying
                  </Button>
                )}
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Next Lesson Card (show only if passed exam and has booked trainer) */}
        {theoreticalExamStatus === "Passed" && hasBookedTrainer && (
          <Card sx={{ mb: 4, backgroundColor: "#e8f5e9" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Next Practical Lesson
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar
                    src={nextLesson.car.avatar}
                    alt={nextLesson.car.name}
                    sx={{ width: 60, height: 60 }}
                  />
                </Grid>
                <Grid item xs>
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <Chip
                      icon={<DateRange />}
                      label={new Date(nextLesson.date).toLocaleDateString()}
                    />
                    <Chip icon={<AccessTime />} label={nextLesson.time} />
                    <Chip
                      icon={<DirectionsCar />}
                      label={nextLesson.car.name}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Platform Services Grid */}
        <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 3 }}>
          What would you like to do?
        </Typography>
        <Grid container spacing={3}>
          {platformServices.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  cursor:
                    service.requiresTheoryPass &&
                    theoreticalExamStatus !== "Passed"
                      ? "not-allowed"
                      : "pointer",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform:
                      service.requiresTheoryPass &&
                      theoreticalExamStatus !== "Passed"
                        ? "none"
                        : "translateY(-4px)",
                  },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  opacity:
                    service.requiresTheoryPass &&
                    theoreticalExamStatus !== "Passed"
                      ? 0.6
                      : 1,
                }}
                onClick={() => {
                  if (
                    !service.requiresTheoryPass ||
                    theoreticalExamStatus === "Passed"
                  ) {
                    navigate(service.path);
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      {service.icon}
                      <Typography variant="h6">{service.title}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                    {service.requiresTheoryPass &&
                      theoreticalExamStatus !== "Passed" && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ mt: 1 }}
                        >
                          Pass theoretical exam to unlock
                        </Typography>
                      )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default WelcomePage;
