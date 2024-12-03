import React from "react";
import { Box, Chip } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const LessonCard = ({ title, description, image, icon: Icon, price,onSelect  }) => (
    <Card 
    onClick={onSelect}
    sx={{ 
      cursor: 'pointer',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
      }
    }}
  >
      <CardActionArea sx={{ flexGrow: 1 }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt={title}
            sx={{ 
              objectFit: 'cover',
              filter: 'brightness(0.9)',
            }}
          />
          <Chip
            icon={<Icon sx={{ color: '#fff !important' }} />}
            label={title}
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              bgcolor: 'rgba(114, 182, 38, 0.9)',
              color: 'white',
              fontWeight: 500,
              '& .MuiChip-icon': { color: 'white' }
            }}
          />
        </Box>
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mb: 2,
              lineHeight: 1.6,
              minHeight: '80px'
            }}
          >
            {description}
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            color: 'text.secondary',
            mb: 2
          }}>
            <AccessTimeIcon sx={{ fontSize: 20 }} />
            <Typography variant="body2">
              Duration: 40 minutes
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: '#72b626',
              fontWeight: 600,
              textAlign: 'right'
            }}
          >
            ${price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: '#72b626',
            color: 'white',
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 500,
            '&:hover': {
              bgcolor: '#5a9320',
            }
          }}
        >
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
  export default LessonCard