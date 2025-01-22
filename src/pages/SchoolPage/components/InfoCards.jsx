import React from 'react';
import { Grid, Paper, Avatar, Typography } from '@mui/material';
import { Email, Phone, LocationOn, Language } from '@mui/icons-material';
import { CONTACT_INFO } from '../constants';

const getIcon = (iconName) => {
  const icons = {
    Email: <Email />,
    Phone: <Phone />,
    LocationOn: <LocationOn />,
    Language: <Language />,
  };
  return icons[iconName];
};

const InfoCards = () => {
  return (
    <Grid container spacing={4}>
      {CONTACT_INFO.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              height: '100%',
              textAlign: 'center',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(20px)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 40px rgba(76,175,80,0.1)', // Custom green shadow
              },
            }}
          >
            <Avatar
              sx={{
                width: 60,
                height: 60,
                mx: 'auto',
                mb: 2,
                bgcolor: '#4CAF50', // Custom green
              }}
            >
              {getIcon(item.icon)}
            </Avatar>

            <Typography variant="h6" gutterBottom>
              {item.title}
            </Typography>
            <Typography color="text.secondary">{item.content}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default InfoCards;
