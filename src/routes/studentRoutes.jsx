import React from "react";
import Form from "../pages/Student/BookingandScheduling/components/Form/Form";
import ProfileInfoPage from "../pages/Student/ProfilePage/ProfileInfoPage/ProfileInfoPage";
import LessonsPage from "../pages/Student/ProfilePage/LessonsPage/LessonsPage";
import TestPage from "../pages/Student/ProfilePage/TestPage/TestPage";
import ChatApp from "../pages/ChatApp/ChatApp";
import WelcomePage from "../pages/Student/WelcomePage/index";
import School from "../pages/SchoolPage";
import Theory from "../pages/TheoryPage";
import QuizApp from '../pages/Student/QuestionsForm/components/QuizApp';
import QuizHistory from '../pages/Student/QuestionsForm/components/QuizHistory';
import QuizPage from '../pages/Student/ProfilePage/QuizPage';

const studentRoutes = [
  { index: true, element: <WelcomePage /> },
  { path: "profile", element: <ProfileInfoPage /> },
  { path: "bookings", element: <Form /> },
  { path: "lessons", element: <LessonsPage /> },
  { path: "test", element: <TestPage /> },
  { path: "Quizzes", element: <QuizPage /> },
  { path: "new-booking", element: <Form /> },
  { path: "messages", element: <ChatApp /> },
  { path: "school", element: <School /> },
  { 
    path: "theory",
    children: [
      { index: true, element: <Theory /> },
      { path: "quiz/:id", element: <QuizApp /> },
      { path: "results", element: <QuizHistory /> }
    ]
  }
];

export default studentRoutes;
