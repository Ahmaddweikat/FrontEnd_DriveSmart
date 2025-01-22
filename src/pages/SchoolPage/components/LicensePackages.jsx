import React from 'react';
import { Grid, Paper, Typography, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { LICENSE_PACKAGES } from '../constants';

const LicensePackages = () => {
  return (
    <Box sx={{ mt: 12 }}>
      <Typography
        variant="h3"
        align="center"
        sx={{
          mb: 6,
          fontWeight: 700,
          background: 'linear-gradient(45deg, #4CAF50, #2E7D32)', // Custom green gradient
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        License Packages
      </Typography>
      <Grid container spacing={4}>
        {LICENSE_PACKAGES.map((license) => (
          <Grid item xs={12} md={6} key={license.id}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                border: '1px solid rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                },
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                color="primary"
                sx={{ fontWeight: 600 }}
              >
                {license.type}
              </Typography>

              <Typography
                variant="h3"
                sx={{ color: 'primary.main', fontWeight: 700, my: 2 }}
              >
                {license.price}
              </Typography>
              <List dense>
                {license.features.map((feature, index) => (
                  <ListItem key={index} sx={{ py: 1 }}>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                fullWidth
                component={Link}
                to="/signup/student"
                sx={{
                  mt: 3,
                  py: 2,
                  borderRadius: '10px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #4CAF50, #2E7D32)', // Custom green
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 16px rgba(76,175,80,0.3)',
                  },
                }}
              >
                Get Started
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LicensePackages;
