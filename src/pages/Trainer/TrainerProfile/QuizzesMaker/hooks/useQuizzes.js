import { useState } from 'react';

const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState({});

  const addQuizForm = (licenseType, formData) => {
    const { title, questions } = formData;
    setQuizzes(prev => ({
      ...prev,
      [licenseType]: [
        ...(prev[licenseType] || []),
        { id: Date.now(), title, questions }
      ]
    }));
  };

  const editQuizForm = (licenseType, formId, formData) => {
    const { title, questions } = formData;
    setQuizzes(prev => ({
      ...prev,
      [licenseType]: prev[licenseType].map(form => 
        form.id === formId 
          ? { ...form, title, questions }
          : form
      )
    }));
  };

  const deleteQuizForm = (licenseType, formId) => {
    setQuizzes(prev => ({
      ...prev,
      [licenseType]: prev[licenseType].filter(form => form.id !== formId)
    }));
  };

  const getQuizForm = (licenseType, formId) => {
    if (!quizzes[licenseType]) return null;
    return quizzes[licenseType].find(form => form.id === formId) || null;
  };

  const getQuizForms = (licenseType) => {
    return quizzes[licenseType] || [];
  };

  return {
    quizzes,
    addQuizForm,
    editQuizForm,
    deleteQuizForm,
    getQuizForm,
    getQuizForms
  };
};

export default useQuizzes;
