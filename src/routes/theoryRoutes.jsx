import React from 'react';
import QuestionsForm from '../pages/Student/QuestionsForm/QuestionsForm';

const theoryRoutes = [
  { path: "theory/quiz/:formType", element: <QuestionsForm /> },
];

export default theoryRoutes;
