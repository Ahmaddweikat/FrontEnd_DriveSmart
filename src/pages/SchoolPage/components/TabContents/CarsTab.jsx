import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { CARS } from '../../constants';

const CarsTab = () => {
  return (
    <Grid container spacing={4}>
      {CARS.map((car) => (
        <Grid item xs={12} sm={6} md={4} key={car.id}>
          <Card sx={{ borderRadius: '20px', overflow: 'hidden' }}>
            <CardMedia
              component="img"
              height="250"
              image={car.image}
              alt={car.model}
            />
            <CardContent sx={{ textAlign: 'center' }}>
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
  );
};

export default CarsTab;
