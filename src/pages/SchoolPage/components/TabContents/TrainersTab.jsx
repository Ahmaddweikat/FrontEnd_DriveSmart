import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Rating } from '@mui/material';
import { TRAINERS } from '../../constants';

const TrainersTab = () => {
  return (
    <Grid container spacing={4}>
      {TRAINERS.map((trainer) => (
        <Grid item xs={12} sm={6} md={4} key={trainer.id}>
          <Card sx={{ borderRadius: '20px', overflow: 'hidden' }}>
            <CardMedia
              component="img"
              height="300"
              image={trainer.image}
              alt={trainer.name}
            />
            <CardContent sx={{ textAlign: 'center' }}>
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
  );
};

export default TrainersTab;
