import { Email, Language, LocationOn, Phone } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Container,
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
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import useSchoolRegistrationStore from "./../../store/schoolRegistration.store";
import useSchool from "./hooks/useSchool";
import useSchoolCars from "./hooks/useSchoolCars";
import useSchoolTrainers from "./hooks/useSchoolTrainers";
const SchoolPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setSelectedSchool } = useSchoolRegistrationStore();
  const { setSelectedLicense } = useSchoolRegistrationStore();

  const { data: school, isLoading, error } = useSchool(id);
  const {
    data: cars,
    isLoading: carsIsLoading,
    error: carsError,
  } = useSchoolCars(id);
  const {
    data: trainers,
    isLoading: trainersIsLoading,
    error: trainersError,
  } = useSchoolTrainers(id);

  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (error || carsError || trainersError) {
      navigate("/not-found");
    }
  }, [error, carsError, trainersError, navigate]);

  if (isLoading || carsIsLoading || trainersIsLoading) {
    return <Spinner />;
  }

  if (!error && !carsError && !trainersError)
    return (
      <div className="bg-gray-100">
        <Container maxWidth="lg">
          <div className="p-5 ">
            {/* School Header Section */}
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardMedia
                    component="img"
                    style={{ height: "100%", width: "100%" }}
                    image={school.profilePicture}
                    alt={school.name}
                    sx={{ objectFit: "cover" }}
                  />
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h3" gutterBottom>
                  {school.name}
                </Typography>
                <Rating value={school.rating} readOnly precision={0.5} />

                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Email />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Email" secondary={school.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Phone />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Phone" secondary={school.phone} />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <LocationOn />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Address"
                      secondary={`${school.address}, ${school.city}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Language />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Website"
                      secondary={school.website}
                    />
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
                  {school.description}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  School Manager
                </Typography>
                <Card sx={{ maxWidth: 345, mb: 4 }}>
                  <CardMedia
                    component="img"
                    height="400"
                    width="100%"
                    image={school.SchoolManager.profilePicture}
                    alt={`${school.SchoolManager.firstName} ${school.SchoolManager.lastName}`}
                    sx={{ objectFit: "cover" }}
                  />
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {`${school.SchoolManager.firstName} ${school.SchoolManager.lastName}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Email: {school.SchoolManager.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Phone: {school.SchoolManager.phone}
                    </Typography>
                  </Box>
                </Card>
              </TabPanel>

              {/* Trainers Tab */}
              <TabPanel value={tabValue} index={1}>
                <Grid container spacing={3}>
                  {trainers.map((trainer) => (
                    <Grid item xs={12} sm={6} md={4} key={trainer.id}>
                      <Card sx={{ maxWidth: 345, mb: 4 }}>
                        <CardMedia
                          component="img"
                          style={{ height: "200px", width: "100%" }}
                          image={trainer.profilePicture}
                          alt={trainer.name}
                          sx={{ objectFit: "cover" }}
                        />
                        <Box sx={{ p: 2 }}>
                          <Typography variant="h6" gutterBottom>
                            {trainer.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            License Type: {trainer.licenseType}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            City: {trainer.city}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Phone: {trainer.phone}
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>

              {/* Cars Tab */}
              <TabPanel value={tabValue} index={2}>
                <Grid container spacing={3}>
                  {cars.map((car) => (
                    <Grid item xs={12} sm={6} md={4} key={car.id}>
                      <Card sx={{ maxWidth: 345, mb: 4 }}>
                        <CardMedia
                          component="img"
                          style={{ height: "200px", width: "100%" }}
                          image={car.profilePicture}
                          alt={`${car.manufacturer} ${car.model}`}
                          sx={{ objectFit: "cover" }}
                        />
                        <Box sx={{ p: 2 }}>
                          <Typography variant="h6" gutterBottom>
                            {`${car.manufacturer} ${car.model}`}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Year: {car.year}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Type: {car.type}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Color: {car.color}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Gearbox: {car.gearboxType}
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>

              {/* Gallery Tab */}
              <TabPanel value={tabValue} index={3}>
                <ImageList cols={3} gap={8}>
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
                {school.licenseTypes.map((license) => (
                  <Grid item xs={12} md={4} key={license.id}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                      <Typography variant="h5" gutterBottom>
                        {license}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        {license.price ?? "300$"}
                      </Typography>
                      <Typography variant="subtitle1">
                        Duration: {license.duration ?? "3 months"}
                      </Typography>
                      <List>
                        {license?.features?.map((feature, index) => (
                          <ListItem key={index}>
                            <ListItemText primary={feature} />
                          </ListItem>
                        ))}
                      </List>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => {
                          setSelectedSchool(school);
                          setSelectedLicense(license);
                          navigate("/signup/student");
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
        </Container>
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

export default SchoolPage;

// Add this template data at the top of the file
// const trainers = [
//   {
//     id: 1,
//     name: "John Smith",
//     image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
//     specialization: "Manual Transmission",
//     experience: "10 years",
//     rating: 4.8,
//   },
//   {
//     id: 2,
//     name: "Sarah Johnson",
//     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
//     specialization: "Automatic Transmission",
//     experience: "8 years",
//     rating: 4.9,
//   },
//   {
//     id: 3,
//     name: "Mike Wilson",
//     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
//     specialization: "Both Transmissions",
//     experience: "12 years",
//     rating: 4.7,
//   },
// ];

// const cars = [
//   {
//     id: 1,
//     model: "Toyota Corolla",
//     image: "https://images.unsplash.com/photo-1590362891991-f776e747a588",
//     type: "Manual",
//     year: "2022",
//   },
//   {
//     id: 2,
//     model: "Honda Civic",
//     image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf",
//     type: "Automatic",
//     year: "2023",
//   },
//   {
//     id: 3,
//     model: "Hyundai i30",
//     image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341",
//     type: "Manual",
//     year: "2022",
//   },
// ];

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

// const schoolData = {
//   name: "Smart Drive School",
//   email: "contact@smartdrive.com",
//   phone: "+1 234 567 890",
//   address: "123 Drive St, Smart City",
//   website: "www.smartdrive.com",
//   rating: 4.5,
//   description:
//     "Smart Drive School has been a leading driving education institution since 2005. We specialize in comprehensive driver training with state-of-the-art facilities and experienced instructors. Our mission is to create confident and responsible drivers through personalized instruction and practical training.",
//   manager: {
//     name: "Robert Brown",
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
//     experience: "15 years",
//     qualification: "Master Instructor",
//   },
// };

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
