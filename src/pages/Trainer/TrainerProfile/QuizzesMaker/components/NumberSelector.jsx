import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
} from '@mui/material';

const NumberSelector = ({ open, onClose, onSubmit }) => {
  const [formTitle, setFormTitle] = React.useState('');
  const [numQuestions, setNumQuestions] = React.useState('');

  const handleSubmit = () => {
    const num = parseInt(numQuestions);
    if (num > 0 && formTitle.trim()) {
      onSubmit(num, formTitle);
      setNumQuestions('');
      setFormTitle('');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Quiz Form</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3, mt: 1 }}>
          <TextField
            autoFocus
            label="Form Title"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            type="number"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            label="Number of Questions"
            fullWidth
            required
            inputProps={{ min: 1 }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={!numQuestions || parseInt(numQuestions) < 1 || !formTitle.trim()}
        >
          Create Form
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NumberSelector;
