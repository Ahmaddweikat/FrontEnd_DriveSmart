import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import QuestionPanel from './QuestionPanel';

const QuizForm = ({ open, onClose, numQuestions, onSave, initialQuestions = null, formTitle = '' }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [questions, setQuestions] = useState(
    initialQuestions || Array(numQuestions).fill(null)
  );
  const isEditing = !!initialQuestions;

  const handleQuestionSave = (questionData) => {
    const newQuestions = [...questions];
    newQuestions[activeStep] = questionData;
    setQuestions(newQuestions);

    if (activeStep < questions.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleFinish = () => {
    onSave(questions);
    setActiveStep(0);
    setQuestions(Array(numQuestions).fill(null));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {isEditing ? `Edit Quiz Form: ${formTitle}` : `Create Quiz Form: ${formTitle}`}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ mt: 2, mb: 4 }}>
          {questions.map((_, index) => (
            <Step key={index}>
              <StepLabel>Q{index + 1}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <QuestionPanel
          initialData={questions[activeStep]}
          onSave={handleQuestionSave}
          standalone={false}
          title={formTitle}
          questionNumber={activeStep + 1}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Box>
            {activeStep === questions.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleFinish}
                disabled={!questions.every(q => q !== null)}
              >
                Finish
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!questions[activeStep]}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default QuizForm;
