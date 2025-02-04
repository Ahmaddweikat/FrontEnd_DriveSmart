import React from "react";
import {
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const QuestionInput = ({
  questionText,
  questionImage,
  isQuestionTextEnabled,
  isQuestionImageEnabled,
  onQuestionTextChange,
  onQuestionImageChange,
  onToggleTextEnabled,
  onToggleImageEnabled,
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isQuestionTextEnabled}
              onChange={(e) => onToggleTextEnabled(e.target.checked)}
            />
          }
          label="Text"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isQuestionImageEnabled}
              onChange={(e) => onToggleImageEnabled(e.target.checked)}
            />
          }
          label="Image"
        />
      </Box>

      {isQuestionTextEnabled && (
        <TextField
          fullWidth
          label="Question Text"
          value={questionText}
          onChange={(e) => onQuestionTextChange(e.target.value)}
          multiline
          rows={2}
          required={!isQuestionImageEnabled}
          sx={{ width: "30%" }}
        />
      )}

      {isQuestionImageEnabled && (
        <Box>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="question-image-upload"
            type="file"
            onChange={(e) => onQuestionImageChange(e.target.files[0])}
          />
          <label htmlFor="question-image-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<AddPhotoAlternateIcon />}
            >
              Upload Question Image
            </Button>
          </label>
          {questionImage && (
            <Box sx={{ mt: 2 }}>
              <img
                src={questionImage}
                alt="Question"
                style={{ maxWidth: "300px", maxHeight: "300px" }}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default QuestionInput;
