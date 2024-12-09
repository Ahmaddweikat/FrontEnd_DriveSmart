import { Email, Language, LocationOn, Phone, DirectionsCar, Timeline, Assessment } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemText,
  Paper,
  Rating,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const SchoolPage = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState(0);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f6f9fc 0%, #ffffff 100%)",
        overflowX: "hidden",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          image="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf"
          alt="School Building"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.65) saturate(1.2)",
            transform: "scale(1.1)",
            transition: "transform 0.5s ease-in-out",
          }}
        />

        <Box
          sx={{
            position: "relative",
            textAlign: "center",
            color: "white",
            zIndex: 1,
            p: 4,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "3rem", md: "5rem" },
              fontWeight: 800,
              mb: 2,
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Smart Drive School
          </Typography>

          <Rating value={4.5} readOnly size="large" sx={{ mb: 3 }} />
          <Typography
            variant="h5"
            sx={{
              maxWidth: "800px",
              mx: "auto",
              opacity: 0.95,
            }}
          >
            Your Journey to Driving Excellence Starts Here
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Info Cards */}
        <Grid container spacing={4}>
          {[
            {
              icon: <Email />,
              title: "Email Us",
              content: "contact@smartdrive.com",
            },
            { icon: <Phone />, title: "Call Us", content: "+1 234 567 890" },
            {
              icon: <LocationOn />,
              title: "Visit Us",
              content: "123 Drive St, Smart City",
            },
            {
              icon: <Language />,
              title: "Online",
              content: "www.smartdrive.com",
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  textAlign: "center",
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(20px)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    mx: "auto",
                    mb: 2,
                    bgcolor: "primary.main",
                  }}
                >
                  {item.icon}
                </Avatar>

                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography color="text.secondary">{item.content}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Tabs Section */}
        <Box sx={{ mt: 8 }}>
          <Tabs
            value={tabValue}
            onChange={(e, val) => setTabValue(val)}
            centered
          >
            <Tab label="About" />
            <Tab label="Trainers" />
            <Tab label="Cars" />
            <Tab label="Gallery" />
          </Tabs>

          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={4}>
              {[
                {
                  id: 1,
                  name: "John Smith",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
                  specialization: "Manual Transmission",
                  experience: "10 years",
                  rating: 3,
                },
                {
                  id: 2,
                  name: "Sarah Johnson",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
                  specialization: "Automatic Transmission",
                  experience: "8 years",
                  rating: 4.9,
                },
                {
                  id: 3,
                  name: "Mike Wilson",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
                  specialization: "Both Transmissions",
                  experience: "12 years",
                  rating: 4.7,
                },
              ].map((trainer) => (
                <Grid item xs={12} sm={6} md={4} key={trainer.id}>
                  <Card sx={{ borderRadius: "20px", overflow: "hidden" }}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={trainer.image}
                      alt={trainer.name}
                    />
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography variant="h6" gutterBottom>
                        {trainer.name}
                      </Typography>
                      <Typography color="text.secondary" gutterBottom>
                        {trainer.specialization}
                      </Typography>
                      <Rating value={trainer.rating} readOnly />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={4}>
              {[
                {
                  id: 1,
                  model: "Toyota Corolla",
                  image: "https://images.unsplash.com/photo-1590362891991-f776e747a588",
                  type: "Manual",
                  year: "2022",
                },
                {
                  id: 2,
                  model: "Honda Civic",
                  image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf",
                  type: "Automatic",
                  year: "2023",
                },
                {
                  id: 3,
                  model: "Hyundai i30",
                  image: "https://images.unsplash.com/photo-1549399542-7b2b1d1c1c1c",
                  type: "Manual",
                  year: "2022",
                },
              ].map((car) => (
                <Grid item xs={12} sm={6} md={4} key={car.id}>
                  <Card sx={{ borderRadius: "20px", overflow: "hidden" }}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={car.image}
                      alt={car.model}
                    />
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography variant="h6" gutterBottom>
                        {car.model}
                      </Typography>
                      <Typography color="text.secondary">
                        {car.type} • {car.year}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <ImageList cols={3} gap={16}>
              {[
                {
                  id: 1,
                  img: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a",
                  title: "School Building",
                },
                {
                  id: 2,
                  img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
                  title: "Training Session",
                },
                {
                  id: 3,
                  img: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a",
                  title: "Car Fleet",
                },
                {
                  id: 4,
                  img: "https://images.unsplash.com/photo-1577412647305-991150c7d163",
                  title: "Classroom",
                },
                {
                  id: 5,
                  img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
                  title: "Practice Area",
                },
                {
                  id: 6,
                  img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
                  title: "Certificates",
                },
              ].map((item) => (
                <ImageListItem key={item.id}>
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    style={{ borderRadius: "12px" }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </TabPanel>

          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={4}>
              {[
                {
                  id: 1,
                  name: "David Thompson",
                  image: "https://images.unsplash.com/photo-1507679799987-c6a33cd113b2",
                  role: "Founder & CEO",
                  experience: "20+ years in Driver Education",
                },
                {
                  id: 2,
                  name: "Emily Rodriguez",
                  image: "https://images.unsplash.com/photo-1573496359394-025c4b977150",
                  role: "Chief Instructor",
                  experience: "15 years of Teaching Experience",
                },
                {
                  id: 3,
                  name: "Michael Chen",
                  image: "https://images.unsplash.com/photo-1568602471122-7b2b1d1c1c1c",
                  role: "Head of Safety Training",
                  experience: "18 years in Road Safety",
                },
              ].map((leader) => (
                <Grid item xs={12} sm={6} md={4} key={leader.id}>
                  <Card sx={{ borderRadius: "20px", overflow: "hidden", height: "100%" }}>
                    <CardMedia
                      component="img"
                      height="350"
                      image={leader.image}
                      alt={leader.name}
                      sx={{ 
                        objectFit: 'cover',
                        width: '100%',
                        height: '350px'
                      }}
                    />
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography variant="h6" gutterBottom>
                        {leader.name}
                      </Typography>
                      <Typography color="text.secondary" gutterBottom>
                        {leader.role}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {leader.experience}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* School Mission and Vision Section */}
            <Box sx={{ mt: 8, textAlign: "center", px: 4 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  background: "linear-gradient(45deg, #2196F3, #1976D2)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Our Mission
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                paragraph
                sx={{
                  maxWidth: "800px",
                  mx: "auto",
                  lineHeight: 1.6,
                }}
              >
                To empower individuals with comprehensive driving skills, foster road
                safety, and create confident, responsible drivers who contribute to
                community well-being.
              </Typography>
            </Box>
          </TabPanel>
        </Box>

        {/* License Packages Section */}
        <Box sx={{ mt: 12 }}>
          <Typography
            variant="h3"
            align="center"
            sx={{
              mb: 6,
              fontWeight: 700,
              background: "linear-gradient(45deg, #1a237e, #0d47a1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            License Packages
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                id: 1,
                type: "Class B - Car License",
                duration: "6 months",
                price: "$800",
                features: [
                  "30 hours theory",
                  "20 hours practical",
                  "Test preparation",
                  "Mock tests",
                ],
              },
              {
                id: 2,
                type: "Class A - Motorcycle License",
                duration: "3 months",
                price: "$600",
                features: [
                  "20 hours theory",
                  "15 hours practical",
                  "Safety training",
                  "Test preparation",
                ],
              },
              {
                id: 3,
                type: "Class A - Motorcycle License",
                duration: "3 months",
                price: "$600",
                features: [
                  "20 hours theory",
                  "15 hours practical",
                  "Safety training",
                  "Test preparation",
                ],
              },
              {
                id: 4,
                type: "Class A - Motorcycle License",
                duration: "3 months",
                price: "$600",
                features: [
                  "20 hours theory",
                  "15 hours practical",
                  "Safety training",
                  "Test preparation",
                ],
              },
            ].map((license) => (
              <Grid item xs={12} md={6} key={license.id}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: "20px",
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                    border: "1px solid rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Typography
                    variant="h4"
                    gutterBottom
                    color="primary"
                    sx={{ fontWeight: 600 }}
                  >
                    {license.type}
                  </Typography>

                  <Typography
                    variant="h3"
                    sx={{ color: "primary.main", fontWeight: 700, my: 2 }}
                  >
                    {license.price}
                  </Typography>
                  <List dense>
                    {license.features.map((feature, index) => (
                      <ListItem key={index} sx={{ py: 1 }}>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    variant="contained"
                    fullWidth
                    component={Link}
                    to="/signup/student"
                    sx={{
                      mt: 3,
                      py: 2,
                      borderRadius: "10px",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      background: "linear-gradient(45deg, #1a237e, #0d47a1)",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 16px rgba(26,35,126,0.3)",
                      },
                    }}
                  >
                    Get Started
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default SchoolPage;
