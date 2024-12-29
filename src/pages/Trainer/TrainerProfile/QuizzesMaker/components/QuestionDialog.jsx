import React from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import QuestionPanel from './QuestionPanel';

const QuestionDialog = ({
  open,
  onClose,
  currentQuizData,
  currentQuestionIndex,
  onQuestionIndexChange,
  questions,
  onSaveQuestion,
}) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogContent>
        {currentQuizData && (
          <>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6">
                {currentQuizData.title}
              </Typography>
              <Stepper activeStep={currentQuestionIndex} sx={{ mt: 2 }}>
                {[...Array(parseInt(currentQuizData.totalQuestions))].map((_, index) => (
                  <Step key={index}>
                    <StepLabel onClick={() => onQuestionIndexChange(index)}>
                      Q{index + 1}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            <QuestionPanel
              onSave={onSaveQuestion}
              initialData={questions[currentQuestionIndex]}
              questionNumber={currentQuestionIndex + 1}
              standalone={false}
              existingQuestions={questions}
              onEditQuestion={(_, index) => onQuestionIndexChange(index)}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuestionDialog;
