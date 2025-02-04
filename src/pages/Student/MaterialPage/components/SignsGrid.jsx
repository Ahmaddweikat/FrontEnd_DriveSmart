import React from 'react';
import { Grid, Card, Typography, Box } from '@mui/material';

const SignsGrid = ({ signs }) => {
  return (
    <Grid container spacing={2}>
      {signs.map((sign) => (
        <Grid item xs={6} sm={4} md={2} key={sign.id}>
          <Card 
            sx={{
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              height: '100%',
              padding: '8px',
              '&:hover': {
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                transform: 'translateY(-2px)',
                transition: 'all 0.2s ease-in-out'
              },
            }}
          >
            <img 
              src={sign.img} 
              alt={sign.label} 
              style={{
                height: '80px',
                width: 'auto',
                objectFit: 'contain',
                marginBottom: '4px'
              }}
            />
            <Box>
              <Typography 
                variant="subtitle2" 
                fontWeight="bold"
                sx={{ fontSize: '0.875rem' }}
              >
                {sign.label}
              </Typography>
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ 
                  display: 'block',
                  fontSize: '0.75rem',
                  lineHeight: 1.2
                }}
              >
                {sign.description}
              </Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SignsGrid;
