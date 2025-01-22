import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from '@mui/material';

const DeleteConfirmation = ({ open, onClose, onConfirm, schoolName }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Delete School</DialogTitle>
            <DialogContent>
                <Typography>
                    Are you sure you want to delete {schoolName}? This action cannot be undone.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={onClose}
                    sx={{
                        color: 'text.secondary',
                        '&:hover': {
                            bgcolor: 'rgba(0, 0, 0, 0.04)',
                        },
                    }}
                >
                    Cancel
                </Button>
                <Button 
                    onClick={onConfirm}
                    color="error"
                    variant="contained"
                    sx={{
                        '&:hover': {
                            bgcolor: 'error.dark',
                        },
                    }}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmation;
