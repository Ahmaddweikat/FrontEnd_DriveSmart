import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

const NewQuizDialog = ({
  open,
  onClose,
  selectedLicenseType,
  formData,
  onFormChange,
  formError,
  onStartQuestions
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New Quiz for {selectedLicenseType}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Quiz Title"
          fullWidth
          value={formData.title}
          onChange={(e) => onFormChange({ title: e.target.value })}
          error={!!formError}
          helperText={formError}
        />
        <TextField
          margin="dense"
          label="Number of Questions"
          type="number"
          fullWidth
          value={formData.numberOfQuestions}
          onChange={(e) => onFormChange({ numberOfQuestions: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={onStartQuestions} 
          variant="contained"
          disabled={!!formError}
        >
          Start Creating Questions
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewQuizDialog;
