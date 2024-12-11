import React from 'react';
import { Box, CardMedia, Typography, Rating } from '@mui/material';

const HeroSection = () => {

  return (
    <Box
      sx={{
        position: 'relative',
        height: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <CardMedia
        component="img"
        image="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf"
        alt="School Building"
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(0.65) saturate(1.2)',
          transform: 'scale(1.1)',
          transition: 'transform 0.5s ease-in-out',
        }}
      />

      <Box
        sx={{
          position: 'relative',
          textAlign: 'center',
          color: 'white',
          zIndex: 1,
          p: 4,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '3rem', md: '5rem' },
            fontWeight: 800,
            mb: 2,
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            color: "white", 
          }}
        >
          Smart Drive School
        </Typography>

        <Rating value={4.5} readOnly size="large" sx={{ mb: 3 }} />
        <Typography
          variant="h5"
          sx={{
            maxWidth: '800px',
            mx: 'auto',
            opacity: 0.95,
            color: "white", 
          }}
        >
          Your Journey to Driving Excellence Starts Here
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroSection;
