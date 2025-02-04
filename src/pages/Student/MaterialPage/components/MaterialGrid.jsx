import React from 'react';
import { Grid } from '@mui/material';
import MaterialCard from './MaterialCard';

const MaterialGrid = ({ materials, onOpenModal }) => {
  return (
    <Grid container spacing={3}>
      {materials.map((material, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <MaterialCard 
            material={material}
            onOpenModal={onOpenModal}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MaterialGrid;
