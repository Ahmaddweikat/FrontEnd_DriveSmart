import React from 'react';
import {
  Button,
  Grid,
  Box,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import QuestionInput from './QuestionInput';
import OptionInput from './OptionInput';
import useQuestionForm from '../hooks/useQuestionForm';

const QuestionPanel = ({ 
  onSave, 
  initialData = null, 
  standalone = true, 
  title = '', 
  questionNumber = 1,
  existingQuestions = [],
  onEditQuestion = null
}) => {
  const {
    questionText,
    questionImage,
    isQuestionTextEnabled,
    isQuestionImageEnabled,
    options,
    correctAnswer,
    editingQuestionId,
    setQuestionText,
    setCorrectAnswer,
    handleQuestionImageChange,
    handleOptionImageChange,
    handleOptionTextChange,
    toggleQuestionTextEnabled,
    toggleQuestionImageEnabled,
    toggleOptionTextEnabled,
    toggleOptionImageEnabled,
    validateForm,
    getFormData
  } = useQuestionForm(initialData, questionNumber);

  const handleSave = () => {
    if (!validateForm()) {
      alert('Please fill in all enabled fields');
      return;
    }
    onSave(getFormData());
  };

  const renderQuestionEditButtons = () => {
    return (
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">Existing Questions:</Typography>
        <Grid container spacing={1}>
          {existingQuestions.map((question, index) => (
            <Grid item key={question.id}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<EditIcon />}
                onClick={() => {
                  if (onEditQuestion) {
                    onEditQuestion(question, index);
                  }
                }}
              >
                Question {index + 1}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <Box sx={{ mt: 2 }}>
      {existingQuestions && existingQuestions.length > 0 && renderQuestionEditButtons()}

      <Typography variant="h6" gutterBottom color="primary">
        {title} Question {questionNumber}
      </Typography>

      <QuestionInput
        questionText={questionText}
        questionImage={questionImage}
        isQuestionTextEnabled={isQuestionTextEnabled}
        isQuestionImageEnabled={isQuestionImageEnabled}
        onQuestionTextChange={setQuestionText}
        onQuestionImageChange={handleQuestionImageChange}
        onToggleTextEnabled={toggleQuestionTextEnabled}
        onToggleImageEnabled={toggleQuestionImageEnabled}
      />

      <Typography variant="subtitle1" sx={{ mt: 3, mb: 2 }}>
        Options (Select the correct answer)
      </Typography>

      <Grid container spacing={2}>
        {options.map((option, index) => (
          <OptionInput
            key={index}
            option={option}
            index={index}
            isCorrectAnswer={correctAnswer === index}
            onCorrectAnswerChange={setCorrectAnswer}
            onTextChange={handleOptionTextChange}
            onImageChange={handleOptionImageChange}
            onToggleTextEnabled={toggleOptionTextEnabled}
            onToggleImageEnabled={toggleOptionImageEnabled}
          />
        ))}
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          onClick={handleSave}
          size="large"
        >
          {editingQuestionId ? 'Update Question' : 'Save Question'}
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionPanel;