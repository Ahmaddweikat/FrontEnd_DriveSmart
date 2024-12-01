import { Email, Language, LocationOn, Phone } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Rating,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const SchoolPage = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="p-5 bg-gray-100">
      {/* School Header Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf"
              alt="School Building"
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom>
            Smart Drive School
          </Typography>
          <Rating value={4.5} readOnly precision={0.5} />

          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Email />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Email"
                secondary="contact@smartdrive.com"
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Phone />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Phone" secondary="+1 234 567 890" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LocationOn />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Address"
                secondary="123 Drive St, Smart City"
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Language />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Website" secondary="www.smartdrive.com" />
            </ListItem>
          </List>
        </Grid>
      </Grid>

      {/* Tabs Section */}
      <Box sx={{ width: "100%", mt: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="About" />
          <Tab label="Trainers" />
          <Tab label="Cars" />
          <Tab label="Gallery" />
        </Tabs>

        {/* About Tab */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="body1" paragraph>
            Detailed description of the driving school, its history, values, and
            achievements...
          </Typography>

          <Typography variant="h6" gutterBottom>
            School Manager
          </Typography>
          <Card sx={{ maxWidth: 345, mb: 4 }}>
            <CardMedia
              component="img"
              height="200"
              image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              alt="School Manager"
            />
            <Typography variant="h6" align="center" sx={{ p: 2 }}>
              John Smith
            </Typography>
          </Card>
        </TabPanel>

        {/* Trainers Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {/* Trainer Cards */}
            {trainers.map((trainer) => (
              <Grid item xs={12} sm={6} md={4} key={trainer.id}>
                <TrainerCard trainer={trainer} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Cars Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            {/* Car Cards */}
            {cars.map((car) => (
              <Grid item xs={12} sm={6} md={4} key={car.id}>
                <CarCard car={car} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Gallery Tab */}
        <TabPanel value={tabValue} index={3}>
          <ImageList cols={3} gap={8}>
            {/* Gallery Images */}
            {galleryImages.map((item) => (
              <ImageListItem key={item.id}>
                <img src={item.img} alt={item.title} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        </TabPanel>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom align="center">
          Available Driving Licenses
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {drivingLicenses.map((license) => (
            <Grid item xs={12} md={6} key={license.id}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  {license.type}
                </Typography>
                <Typography variant="h6" color="primary">
                  {license.price}
                </Typography>
                <Typography variant="subtitle1">
                  Duration: {license.duration}
                </Typography>
                <List>
                  {license.features.map((feature, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  component={Link}
                  to={{
                    pathname: "/signup/student",
                  }}
                >
                  Register Now
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

// Helper Components
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const TrainerCard = ({ trainer }) => (
  <Card>
    <CardMedia
      component="img"
      height="200"
      image={trainer.image}
      alt={trainer.name}
    />
    <Typography variant="h6" align="center" sx={{ p: 2 }}>
      {trainer.name}
    </Typography>
  </Card>
);

const CarCard = ({ car }) => (
  <Card>
    <CardMedia component="img" height="200" image={car.image} alt={car.model} />
    <Typography variant="h6" align="center" sx={{ p: 2 }}>
      {car.model}
    </Typography>
  </Card>
);

export default SchoolPage;

// Add this template data at the top of the file
const trainers = [
  {
    id: 1,
    name: "John Smith",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    specialization: "Manual Transmission",
    experience: "10 years",
    rating: 4.8,
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
];

const cars = [
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
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341",
    type: "Manual",
    year: "2022",
  },
];

const galleryImages = [
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
];

const schoolData = {
  name: "Smart Drive School",
  email: "contact@smartdrive.com",
  phone: "+1 234 567 890",
  address: "123 Drive St, Smart City",
  website: "www.smartdrive.com",
  rating: 4.5,
  description:
    "Smart Drive School has been a leading driving education institution since 2005. We specialize in comprehensive driver training with state-of-the-art facilities and experienced instructors. Our mission is to create confident and responsible drivers through personalized instruction and practical training.",
  manager: {
    name: "Robert Brown",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    experience: "15 years",
    qualification: "Master Instructor",
  },
};

const drivingLicenses = [
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
];

// Add these exports at the bottom of the file
export { cars, galleryImages, schoolData, trainers };
