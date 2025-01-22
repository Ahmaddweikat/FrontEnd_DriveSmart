import { useState } from 'react';

const useQuizManagement = () => {
  const [quizzes, setQuizzes] = useState({});
  const [isNewQuizDialogOpen, setIsNewQuizDialogOpen] = useState(false);
  const [selectedLicenseType, setSelectedLicenseType] = useState('');
  const [newQuizForm, setNewQuizForm] = useState({
    title: '',
    numberOfQuestions: '',
  });
  const [formError, setFormError] = useState('');
  const [currentQuizData, setCurrentQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] = useState(false);

  const checkDuplicateTitle = (title, licenseType, currentQuizId = null) => {
    const existingQuizzes = quizzes[licenseType] || [];
    return existingQuizzes.some(quiz => 
      quiz.title.toLowerCase() === title.toLowerCase() && quiz.id !== currentQuizId
    );
  };

  const handleNewQuiz = (licenseType) => {
    setSelectedLicenseType(licenseType);
    setIsNewQuizDialogOpen(true);
    setNewQuizForm({ title: '', numberOfQuestions: '' });
    setFormError('');
  };

  const handleStartQuestions = () => {
    if (!newQuizForm.title || !newQuizForm.numberOfQuestions) {
      setFormError('Please fill in all fields');
      return;
    }

    if (checkDuplicateTitle(newQuizForm.title, selectedLicenseType)) {
      setFormError('A quiz with this name already exists in this license type');
      return;
    }
    
    setFormError('');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setCurrentQuizData({
      licenseType: selectedLicenseType,
      title: newQuizForm.title,
      totalQuestions: parseInt(newQuizForm.numberOfQuestions),
    });
    setIsNewQuizDialogOpen(false);
    setIsQuestionDialogOpen(true);
  };

  const handleSaveQuestion = (questionData) => {
    let updatedQuestions = [...questions];

    if (questionData.index !== undefined) {
      updatedQuestions[questionData.index] = {
        ...questionData,
        id: questionData.index + 1,
      };
    } else {
      const newQuestion = {
        id: updatedQuestions.length + 1,
        question: questionData.question,
        questionImage: questionData.questionImage,
        options: questionData.options,
        optionImages: questionData.optionImages,
        correctAnswer: questionData.correctAnswer,
      };
      updatedQuestions.push(newQuestion);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    setQuestions(updatedQuestions);

    const isComplete = questionData.index !== undefined 
      ? questions.length === parseInt(newQuizForm.numberOfQuestions)
      : updatedQuestions.length === parseInt(newQuizForm.numberOfQuestions);

    if (isComplete) {
      if (currentQuizData.id) {
        setQuizzes(prev => {
          const updatedQuizzes = { ...prev };
          const quizIndex = updatedQuizzes[selectedLicenseType].findIndex(q => q.id === currentQuizData.id);
          
          if (quizIndex !== -1) {
            updatedQuizzes[selectedLicenseType][quizIndex] = {
              ...updatedQuizzes[selectedLicenseType][quizIndex],
              title: currentQuizData.title,
              questions: updatedQuestions,
              updatedAt: new Date().toISOString(),
            };
          }
          
          return updatedQuizzes;
        });
      } else {
        const quizData = {
          id: Date.now(),
          title: currentQuizData.title,
          questions: updatedQuestions,
          createdAt: new Date().toISOString(),
        };

        setQuizzes(prev => ({
          ...prev,
          [selectedLicenseType]: [
            ...(prev[selectedLicenseType] || []),
            quizData
          ]
        }));
      }

      setIsQuestionDialogOpen(false);
      resetQuizCreation();
    }
  };

  const handleEditQuiz = (licenseType, quizIndex) => {
    const quiz = quizzes[licenseType][quizIndex];
    setSelectedLicenseType(licenseType);
    setCurrentQuizData({
      id: quiz.id,
      licenseType,
      title: quiz.title,
      totalQuestions: quiz.questions.length,
    });
    setQuestions(quiz.questions);
    setCurrentQuestionIndex(0);
    setNewQuizForm({
      title: quiz.title,
      numberOfQuestions: quiz.questions.length.toString(),
    });
    setIsQuestionDialogOpen(true);
  };

  const handleDeleteQuiz = (licenseType, quizIndex) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      const updatedQuizzes = [...quizzes[licenseType]];
      updatedQuizzes.splice(quizIndex, 1);
      setQuizzes(prev => ({
        ...prev,
        [licenseType]: updatedQuizzes
      }));
    }
  };

  const resetQuizCreation = () => {
    setNewQuizForm({ title: '', numberOfQuestions: '' });
    setCurrentQuizData(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setFormError('');
  };

  return {
    quizzes,
    isNewQuizDialogOpen,
    selectedLicenseType,
    newQuizForm,
    formError,
    currentQuizData,
    currentQuestionIndex,
    questions,
    isQuestionDialogOpen,
    setIsNewQuizDialogOpen,
    setNewQuizForm,
    setFormError,
    setCurrentQuestionIndex,
    setIsQuestionDialogOpen,
    handleNewQuiz,
    handleStartQuestions,
    handleSaveQuestion,
    handleEditQuiz,
    handleDeleteQuiz,
  };
};

export default useQuizManagement;

  