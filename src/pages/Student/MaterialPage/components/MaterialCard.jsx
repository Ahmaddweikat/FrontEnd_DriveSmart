import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import LaunchIcon from '@mui/icons-material/Launch';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid rgba(114, 182, 38, 0.1)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 6px 25px rgba(114, 182, 38, 0.15)',
  },
}));

const MaterialCard = ({ material, onOpenModal }) => {
  const { title, description } = material;
  
  return (
    <StyledCard>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{
            background: 'linear-gradient(45deg, #72b626 30%, #8ed136 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mb: 2, flexGrow: 1 }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          endIcon={<LaunchIcon />}
          onClick={() => onOpenModal(material)}
          sx={{
            background: 'linear-gradient(45deg, #72b626 30%, #8ed136 90%)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(45deg, #5c9220 30%, #72b626 90%)',
            }
          }}
        >
          View Content
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default MaterialCard;
