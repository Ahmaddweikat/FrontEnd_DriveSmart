import React from 'react';
import QuestionsForm from '../pages/Student/QuestionsForm/QuestionsForm';
import QuizApp from '../pages/Student/QuestionsForm/components/QuizApp';
import QuizHistory from '../pages/Student/QuestionsForm/components/QuizHistory';
import TheoryPage from '../pages/TheoryPage';

const theoryRoutes = [
  { 
    path: "quiz/:formType", 
    element: <QuestionsForm /> 
  },
  {
    path: "", 
    element: <TheoryPage />,
  },
  {
    path: "quiz/:id",
    element: <QuizApp />,
  },
  {
    path: "results",
    element: <QuizHistory />,
  },
];

export default theoryRoutes;
