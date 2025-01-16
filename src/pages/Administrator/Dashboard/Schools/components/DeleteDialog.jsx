import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from '@mui/material';

const DeleteDialog = ({ open, onClose, onConfirm, schoolName }) => {
    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle>Delete School</DialogTitle>
            <DialogContent>
                <Typography>
                    Are you sure you want to delete {schoolName}?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={onClose}
                    sx={{ color: 'text.secondary' }}
                >
                    Cancel
                </Button>
                <Button 
                    onClick={onConfirm}
                    color="error"
                    variant="contained"
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;
