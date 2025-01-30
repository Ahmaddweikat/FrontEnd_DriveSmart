import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
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
  Person,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useGetProfile from "../../../hooks/useGetProfile";
import useNextLesson from "./hooks/useNextLesson";
import DayMapping from "../../../constants/dayMapping";

const WelcomePage = () => {
  const navigate = useNavigate();
  const { data: profile } = useGetProfile();
  const { data: nextLesson } = useNextLesson();

  const platformServices = [
    {
      title: "My Students",
      icon: <Person sx={{ color: "#2196F3" }} />,
      path: "/trainer/students",
      description: "View and manage your current students",
    },
    {
      title: "Lessons Schedule",
      icon: <Assignment sx={{ color: "#4CAF50" }} />,
      path: "/trainer/lessons",
      description: "View your upcoming and past lessons",
    },
    {
      title: "Availability",
      icon: <DateRange sx={{ color: "#FF9800" }} />,
      path: "/trainer/availability",
      description: "Manage your available time slots",
    },
    {
      title: "Bookings",
      icon: <DirectionsCar sx={{ color: "#F44336" }} />,
      path: "/trainer/bookings",
      description: "View and manage lesson bookings",
    },
    {
      title: "Create Quizzes",
      icon: <MenuBook sx={{ color: "#9C27B0" }} />,
      path: "/trainer/quizzes",
      description: "Create and manage practice quizzes",
    },
    {
      title: "Messages",
      icon: <Chat sx={{ color: "#607D8B" }} />,
      path: "/trainer/messages",
      description: "Chat with your students",
    },
  ];

  return (
    <div className="overflow-y-auto">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          Welcome back, {profile?.name}!
        </Typography>

        {nextLesson && (
          <Card sx={{ mb: 4, backgroundColor: "#e8f5e9" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Next Lesson
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      src={nextLesson.student.profilePicture}
                      alt={nextLesson.student.name}
                      sx={{ width: 60, height: 60 }}
                    />
                    <Typography variant="subtitle1">
                      {nextLesson.student.name}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs>
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <Chip
                      icon={<DateRange />}
                      label={new Date(nextLesson.date).toLocaleDateString()}
                    />
                    <Chip
                      icon={<AccessTime />}
                      label={nextLesson.startTime.substring(0, 5)}
                    />
                    <Chip
                      icon={<DirectionsCar />}
                      label={nextLesson.car.name}
                    />
                    <Chip label={DayMapping[nextLesson.day]} />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 3 }}>
          What would you like to do?
        </Typography>
        <Grid container spacing={3}>
          {platformServices.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                  },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={() => navigate(service.path)}
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
