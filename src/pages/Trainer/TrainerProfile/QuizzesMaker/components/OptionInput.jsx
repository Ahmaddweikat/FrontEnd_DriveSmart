import React from 'react';
import {
  TextField,
  Button,
  Grid,
  Box,
  Radio,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const OptionInput = ({
  option,
  index,
  isCorrectAnswer,
  onCorrectAnswerChange,
  onTextChange,
  onImageChange,
  onToggleTextEnabled,
  onToggleImageEnabled
}) => {
  return (
    <Grid item xs={12} sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <FormControlLabel
          control={
            <Radio
              checked={isCorrectAnswer}
              onChange={() => onCorrectAnswerChange(index)}
            />
          }
          label=""
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={option.isTextEnabled}
              onChange={(e) => onToggleTextEnabled(index, e.target.checked)}
            />
          }
          label="Text"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={option.isImageEnabled}
              onChange={(e) => onToggleImageEnabled(index, e.target.checked)}
            />
          }
          label="Image"
        />
      </Box>

      {option.isTextEnabled && (
        <TextField
          fullWidth
          label={`Option ${index + 1} Text`}
          value={option.text}
          onChange={(e) => onTextChange(index, e.target.value)}
          required={!option.isImageEnabled}
        />
      )}

      {option.isImageEnabled && (
        <Box>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id={`option-image-upload-${index}`}
            type="file"
            onChange={(e) => onImageChange(index, e.target.files[0])}
          />
          <label htmlFor={`option-image-upload-${index}`}>
            <Button
              variant="outlined"
              component="span"
              startIcon={<AddPhotoAlternateIcon />}
            >
              Upload Option Image
            </Button>
          </label>
          {option.image && (
            <Box sx={{ mt: 2 }}>
              <img 
                src={option.image} 
                alt={`Option ${index + 1}`} 
                style={{ maxWidth: '300px', maxHeight: '300px' }} 
              />
            </Box>
          )}
        </Box>
      )}
    </Grid>
  );
};

export default OptionInput;
