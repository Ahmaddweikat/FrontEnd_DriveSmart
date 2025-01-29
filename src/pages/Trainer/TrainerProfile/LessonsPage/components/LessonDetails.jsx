import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Box,
  Grid,
  Button,
  Chip,
  Rating,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CancelIcon from "@mui/icons-material/Cancel";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventIcon from "@mui/icons-material/Event";
import { useCancelLesson, useCompleteLesson } from "../hooks/useLessons";

const LessonDetails = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#72b626",
      },
    },
  });

  const { mutate: cancelLesson } = useCancelLesson();
  const { mutate: completeLesson } = useCompleteLesson();

  const { id } = useParams();
  const { lessons, updateLessonRating } = useOutletContext();
  const navigate = useNavigate();
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [cancelReason, setCancelReason] = useState("");

  const lesson = lessons.find((l) => {
    const formattedDate = new Date(l.date).toLocaleDateString("en-CA");
    return formattedDate === id;
  });

  console.log("🚀 ~ lesson ~ lesson:", lesson);

  useEffect(() => {
    if (!lesson && lessons.length > 0) {
      navigate("/trainer/lessons");
    }
  }, [lesson, lessons, navigate]);

  if (!lesson) {
    return null;
  }

  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return { bgcolor: "#4caf50", color: "white" };
      case "upcoming":
        return { bgcolor: "#2196f3", color: "white" };
      case "canceled":
        return { bgcolor: "#dc2626", color: "white" }; // red-600
      case "out of date":
        return { bgcolor: "#dc2626", color: "white" }; // red-600
      default:
        return { bgcolor: "grey", color: "white" };
    }
  };

  const handleFeedbackClick = () => {
    setRating(lesson.rating || 0);
    setFeedback(lesson.feedback || "");
    setFeedbackOpen(true);
  };

  const handleCancelSubmit = () => {
    cancelLesson({
      date: lesson.date,
      cancellationReason: cancelReason,
    });
    setCancelOpen(false);
  };

  const handleFeedbackSubmit = () => {
    completeLesson({
      date: lesson.date,
      trainerFeedback: feedback,
      studentRating: rating,
    });
    setFeedbackOpen(false);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const isToday = (date) => {
    const today = new Date();
    const lessonDate = new Date(date);
    return (
      lessonDate.getDate() === today.getDate() &&
      lessonDate.getMonth() === today.getMonth() &&
      lessonDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/trainer/lessons")}
          >
            Back to Lessons
          </Button>
          <Box sx={{ display: "flex", gap: 2 }}>
            {lesson.status === "upcoming" && (
              <>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={() => setCancelOpen(true)}
                >
                  Cancel Lesson
                </Button>
                {isToday(lesson.date) && (
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircleIcon />}
                    onClick={() => setFeedbackOpen(true)}
                  >
                    Complete Lesson
                  </Button>
                )}
              </>
            )}
            {/* {lesson.status === "completed" && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<StarIcon />}
                onClick={handleFeedbackClick}
              >
                {lesson.rating
                  ? "Edit Rating & Feedback"
                  : "Add Rating & Feedback"}
              </Button>
            )} */}
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <Avatar
                  src={lesson.studentImage}
                  sx={{
                    width: 100,
                    height: 100,
                    mr: 3,
                  }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    {lesson.title}
                  </Typography>
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    {lesson.student}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Chip
                      label={lesson.status}
                      sx={getStatusStyles(lesson.status)}
                    />
                    {lesson.rating > 0 && (
                      <Rating
                        value={lesson.rating}
                        readOnly
                        sx={{
                          "& .MuiRating-iconFilled": {
                            color: "#72b626",
                          },
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <CalendarTodayIcon sx={{ mr: 1, color: "#72b626" }} />
                    <Typography variant="body1">
                      <strong>Date:</strong>{" "}
                      {new Date(lesson.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <EventIcon sx={{ mr: 1, color: "#72b626" }} />
                    <Typography variant="body1">
                      <strong>Day:</strong> {lesson.day}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <AccessTimeIcon sx={{ mr: 1, color: "#72b626" }} />
                    <Typography variant="body1">
                      <strong>Time:</strong> {lesson.time}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <AccessTimeIcon sx={{ mr: 1, color: "#72b626" }} />
                    <Typography variant="body1">
                      <strong>Duration:</strong> {lesson.duration}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      src={lesson.carImage}
                      sx={{ mr: 2, width: 50, height: 50 }}
                    />
                    <Typography variant="body1">
                      <strong>Car:</strong> {lesson.car}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                {lesson.status === "completed" && lesson.feedback && (
                  <>
                    <Typography variant="h6" gutterBottom>
                      Trainer Feedback
                    </Typography>
                    <Typography variant="body1">{lesson.feedback}</Typography>
                  </>
                )}
                {lesson.status === "canceled" && lesson.reason && (
                  <>
                    <Typography variant="h6" gutterBottom>
                      Cancellation Reason
                    </Typography>
                    <Typography variant="body1" color="error">
                      {lesson.reason}
                    </Typography>
                  </>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Feedback Dialog */}
        <Dialog open={feedbackOpen} onClose={() => setFeedbackOpen(false)}>
          <DialogTitle>
            {lesson.rating ? "Edit Rating & Feedback" : "Add Rating & Feedback"}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ py: 2 }}>
              <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
                <Rating
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                  size="large"
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: "#72b626",
                    },
                    "& .MuiRating-iconHover": {
                      color: "#72b626",
                    },
                  }}
                />
              </Box>
              <TextField
                label="Feedback"
                multiline
                rows={4}
                fullWidth
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setFeedbackOpen(false)}>Cancel</Button>
            <Button
              onClick={handleFeedbackSubmit}
              variant="contained"
              color="primary"
            >
              {lesson.rating ? "Update" : "Submit"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Cancel Dialog */}
        <Dialog open={cancelOpen} onClose={() => setCancelOpen(false)}>
          <DialogTitle>Cancel Lesson</DialogTitle>
          <DialogContent>
            <Box sx={{ py: 2 }}>
              <TextField
                label="Cancellation Reason"
                multiline
                rows={4}
                fullWidth
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCancelOpen(false)}>Back</Button>
            <Button
              onClick={handleCancelSubmit}
              variant="contained"
              color="error"
            >
              Cancel Lesson
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default LessonDetails;
