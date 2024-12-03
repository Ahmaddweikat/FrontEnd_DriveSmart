import React from "react";
import { Box, Chip, Alert, Tooltip, Paper } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LockIcon from '@mui/icons-material/Lock';

const LessonCard = ({ title, description, image, icon: Icon, price, onSelect, isLocked }) => {
  const baseDescription = description.split('(')[0];
  const requirementsMatch = description.match(/\(Requires (\d+) lessons, you have (\d+)\)/);
  const hasRequirements = requirementsMatch !== null;
  
  const RequirementsTooltip = () => (
    <Paper sx={{ 
      p: 2, 
      bgcolor: 'rgba(255, 255, 255, 0.95)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      borderRadius: 2,
      maxWidth: 250
    }}>
      <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
        Requirements Not Met
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
        You need {requirementsMatch[1]} lessons to unlock this.
      </Typography>
      <Typography variant="body2" sx={{ color: '#72b626', mt: 1, fontWeight: 500 }}>
        Currently completed: {requirementsMatch[2]} lessons
      </Typography>
    </Paper>
  );

  const cardContent = (
    <Card 
      onClick={isLocked ? null : onSelect}
      sx={{ 
        cursor: isLocked ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease-in-out',
        opacity: isLocked ? 0.7 : 1,
        '&:hover': {
          transform: isLocked ? 'none' : 'translateY(-8px)',
          boxShadow: isLocked ? 'none' : '0 10px 20px rgba(0,0,0,0.1)'
        }
      }}
    >
      <CardActionArea sx={{ flexGrow: 1 }} disabled={isLocked}>
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
            icon={isLocked ? <LockIcon sx={{ color: '#fff !important' }} /> : <Icon sx={{ color: '#fff !important' }} />}
            label={title}
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              bgcolor: isLocked ? 'rgba(158, 158, 158, 0.9)' : 'rgba(114, 182, 38, 0.9)',
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
            {baseDescription}
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
          disabled={isLocked}
          sx={{
            bgcolor: isLocked ? 'rgba(158, 158, 158, 0.9)' : '#72b626',
            color: 'white',
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 500,
            '&:hover': {
              bgcolor: isLocked ? 'rgba(158, 158, 158, 0.9)' : '#5a9320',
            }
          }}
        >
          {isLocked ? 'Locked' : 'Book Now'}
        </Button>
      </CardActions>
    </Card>
  );

  return hasRequirements ? (
    <Tooltip 
      title={<RequirementsTooltip />}
      arrow
      placement="top"
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: 'transparent',
            '& .MuiTooltip-arrow': {
              color: 'rgba(255, 255, 255, 0.95)'
            }
          }
        }
      }}
    >
      <Box>{cardContent}</Box>
    </Tooltip>
  ) : cardContent;
};

export default LessonCard;