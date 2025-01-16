import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Avatar,
  Grid,
  Chip
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const RequestDetails = ({ open, onClose, request }) => {
  if (!request) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const DetailItem = ({ label, value }) => (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value || 'N/A'}</Typography>
    </Box>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={request.school.logo}
            alt={request.school.name}
            sx={{ width: 56, height: 56, bgcolor: '#e0e0e0' }}
          >
            <SchoolIcon />
          </Avatar>
          <Box>
            <Typography variant="h6">{request.school.name}</Typography>
            <Chip
              label={request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              color={getStatusColor(request.status)}
              size="small"
              sx={{ mt: 0.5 }}
            />
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <DetailItem label="Address" value={request.school.address} />
            <DetailItem label="City" value={request.school.city} />
            <DetailItem label="Phone" value={request.school.phone} />
            <DetailItem label="Email" value={request.school.email} />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailItem label="Website" value={request.school.website} />
            <DetailItem label="Description" value={request.school.description} />
            <DetailItem 
              label="School Manager" 
              value={request.school.manager ? 
                `${request.school.manager.firstName} ${request.school.manager.lastName}` : 
                'N/A'
              } 
            />
            <DetailItem 
              label="Manager Email" 
              value={request.school.manager?.email} 
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose}
          sx={{
            color: '#72b626',
            '&:hover': {
              bgcolor: 'rgba(114, 182, 38, 0.04)',
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestDetails;
