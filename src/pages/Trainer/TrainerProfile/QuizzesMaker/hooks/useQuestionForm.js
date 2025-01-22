import { useState, useEffect } from 'react';

const useQuestionForm = (initialData = null, questionNumber = 1) => {
  const [questionText, setQuestionText] = useState('');
  const [questionImage, setQuestionImage] = useState(null);
  const [isQuestionTextEnabled, setIsQuestionTextEnabled] = useState(true);
  const [isQuestionImageEnabled, setIsQuestionImageEnabled] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  
  const [options, setOptions] = useState([
    { text: '', image: null, isTextEnabled: true, isImageEnabled: false },
    { text: '', image: null, isTextEnabled: true, isImageEnabled: false },
    { text: '', image: null, isTextEnabled: true, isImageEnabled: false },
    { text: '', image: null, isTextEnabled: true, isImageEnabled: false }
  ]);
  
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const resetForm = () => {
    setQuestionText('');
    setQuestionImage(null);
    setIsQuestionTextEnabled(true);
    setIsQuestionImageEnabled(false);
    setOptions([
      { text: '', image: null, isTextEnabled: true, isImageEnabled: false },
      { text: '', image: null, isTextEnabled: true, isImageEnabled: false },
      { text: '', image: null, isTextEnabled: true, isImageEnabled: false },
      { text: '', image: null, isTextEnabled: true, isImageEnabled: false }
    ]);
    setCorrectAnswer(0);
    setEditingQuestionId(null);
  };

  const populateFormForEditing = (questionToEdit) => {
    setEditingQuestionId(questionToEdit.id);
    setQuestionText(questionToEdit.question || '');
    setQuestionImage(questionToEdit.questionImage || null);
    setIsQuestionTextEnabled(!!questionToEdit.question);
    setIsQuestionImageEnabled(!!questionToEdit.questionImage);

    const editedOptions = questionToEdit.options.map((opt, index) => ({
      text: opt,
      image: questionToEdit.optionImages ? questionToEdit.optionImages[index] : null,
      isTextEnabled: !!opt,
      isImageEnabled: !!(questionToEdit.optionImages && questionToEdit.optionImages[index])
    }));

    setOptions(editedOptions);
    setCorrectAnswer(questionToEdit.correctAnswer || 0);
  };

  const handleQuestionImageChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQuestionImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOptionImageChange = (index, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newOptions = [...options];
        newOptions[index].image = reader.result;
        setOptions(newOptions);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOptionTextChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].text = value;
    setOptions(newOptions);
  };

  const toggleQuestionTextEnabled = (enabled) => {
    setIsQuestionTextEnabled(enabled);
  };

  const toggleQuestionImageEnabled = (enabled) => {
    setIsQuestionImageEnabled(enabled);
  };

  const toggleOptionTextEnabled = (index, enabled) => {
    const newOptions = [...options];
    newOptions[index].isTextEnabled = enabled;
    setOptions(newOptions);
  };

  const toggleOptionImageEnabled = (index, enabled) => {
    const newOptions = [...options];
    newOptions[index].isImageEnabled = enabled;
    setOptions(newOptions);
  };

  const validateForm = () => {
    const isQuestionValid = 
      (isQuestionTextEnabled && questionText.trim()) || 
      (isQuestionImageEnabled && questionImage);
    
    const areOptionsValid = options.every(opt => 
      (opt.isTextEnabled && opt.text.trim()) || 
      (opt.isImageEnabled && opt.image)
    );

    return isQuestionValid && areOptionsValid;
  };

  const getFormData = () => ({
    id: editingQuestionId || Date.now(),
    question: isQuestionTextEnabled ? questionText : '',
    questionImage: isQuestionImageEnabled ? questionImage : null,
    options: options.map(opt => opt.isTextEnabled ? opt.text : ''),
    optionImages: options.map(opt => opt.isImageEnabled ? opt.image : null),
    correctAnswer,
    index: initialData ? questionNumber - 1 : undefined
  });

  useEffect(() => {
    if (initialData) {
      populateFormForEditing(initialData);
    }
  }, [initialData]);

  return {
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
  };
};

export default useQuestionForm;
