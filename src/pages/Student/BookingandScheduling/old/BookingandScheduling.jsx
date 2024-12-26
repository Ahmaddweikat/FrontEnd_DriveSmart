import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
} from '@mui/material';
import { 
  CalendarMonth, 
  DirectionsCar, 
  School, 
  Person, 
  KeyboardArrowRight
} from '@mui/icons-material';

const Home = () => {
  const features = [
    {
      title: 'Book Lessons',
      description: 'Schedule your driving lessons with our experienced instructors',
      icon: <CalendarMonth sx={{ fontSize: 40, color: '#72b626' }} />,
    },
    {
      title: 'Our Instructors',
      description: 'Meet our professional and certified driving instructors',
      icon: <Person sx={{ fontSize: 40, color: '#72b626' }} />,
    },
    {
      title: 'Available Cars',
      description: 'View our fleet of training vehicles',
      icon: <DirectionsCar sx={{ fontSize: 40, color: '#72b626' }} />,
      
    },
    {
      title: 'Learning Resources',
      description: 'Access study materials and driving tips',
      icon: <School sx={{ fontSize: 40, color: '#72b626' }} />,
     
    }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          bgcolor: '#f8f9fa',
          pt: 8,
          pb: 6,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url("/path-to-your-background-image.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#2c3e50' }}
          >
            Start Your Driving Journey
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Professional driving instruction with certified trainers and modern vehicles.
            Book your lessons today and get on the road to success.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button 
              variant="contained" 
              size="large"
              sx={{
                backgroundColor: '#72b626',
                '&:hover': { backgroundColor: '#5a9320' }
              }}
            >
              Book Now
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              sx={{
                borderColor: '#72b626',
                color: '#72b626',
                '&:hover': {
                  borderColor: '#5a9320',
                  backgroundColor: 'rgba(114, 182, 38, 0.04)'
                }
              }}
            >
              Learn More
            </Button>
          </Box>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 3
                  }
                }}
              >
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                  {feature.icon}
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2" align="center">
                    {feature.title}
                  </Typography>
                  <Typography align="center" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button 
                    size="small" 
                    endIcon={<KeyboardArrowRight />}
                    sx={{ color: '#72b626' }}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box sx={{ bgcolor: '#f8f9fa', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom color="text.primary">
          Contact Us
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Email: info@drivingschool.com | Phone: (123) 456-7890
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          Driving School {new Date().getFullYear()}
         
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;