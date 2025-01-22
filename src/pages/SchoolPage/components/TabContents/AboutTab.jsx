import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { TEAM_LEADERS } from '../../constants';

const AboutTab = () => {
  return (
    <>
      <Grid container spacing={4}>
        {TEAM_LEADERS.map((leader) => (
          <Grid item xs={12} sm={6} md={4} key={leader.id}>
            <Card
              sx={{
                borderRadius: '20px',
                overflow: 'hidden',
                height: '100%',
              }}
            >
              <CardMedia
                component="img"
                height="350"
                image={leader.image}
                alt={leader.name}
                sx={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '350px',
                }}
              />
              <CardContent sx={{ textAlign: 'center' }}>
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

      {/* School Mission Section */}
      <Box sx={{ mt: 8, textAlign: 'center', px: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            background: '#72b626',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Our Mission
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          paragraph
          sx={{
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.6,
          }}
        >
          To empower individuals with comprehensive driving skills, foster road safety,
          and create confident, responsible drivers who contribute to community well-being.
        </Typography>
      </Box>
    </>
  );
};

export default AboutTab;
