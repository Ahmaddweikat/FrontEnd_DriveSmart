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
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const SchoolDetails = ({ open, handleClose, school }) => {
    if (!school) return null;

    const DetailItem = ({ label, value }) => (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
                {label}
            </Typography>
            <Typography variant="body1">{value || 'N/A'}</Typography>
        </Box>
    );

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                        src={school.logo}
                        alt={school.name}
                        sx={{ width: 56, height: 56, bgcolor: '#e0e0e0' }}
                    >
                        <SchoolIcon />
                    </Avatar>
                    <Typography variant="h6">{school.name}</Typography>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item xs={12} md={6}>
                        <DetailItem label="Address" value={school.address} />
                        <DetailItem label="City" value={school.city} />
                        <DetailItem label="Phone" value={school.phone} />
                        <DetailItem label="Email" value={school.email} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DetailItem label="Website" value={school.website} />
                        <DetailItem label="Description" value={school.description} />
                        <DetailItem 
                            label="School Manager" 
                            value={school.manager ? 
                                `${school.manager.firstName} ${school.manager.lastName}` : 
                                'N/A'
                            } 
                        />
                        <DetailItem 
                            label="Manager Email" 
                            value={school.manager?.email} 
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={handleClose}
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

export default SchoolDetails;
