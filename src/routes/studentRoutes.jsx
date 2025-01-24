import React from "react";
import ChatApp from "../pages/ChatApp/ChatApp";
import School from "../pages/SchoolPage";
import NewBookingPage from "../pages/Student/BookingandScheduling/NewBookingPage";
import ProfileInfoPage from "../pages/Student/ProfilePage/ProfileInfoPage/ProfileInfoPage";
// import QuizPage from "../pages/Student/ProfilePage/QuizPage";
import TestPage from "../pages/Student/ProfilePage/TestPage/TestPage";
import QuizApp from "../pages/Student/QuestionsForm/components/QuizApp";
import QuizHistory from "../pages/Student/QuestionsForm/components/QuizHistory";
import WelcomePage from "../pages/Student/WelcomePage/index";
import StudyMaterialPage from "../pages/StudyMaterialPage";
import Theory from "../pages/TheoryPage";
import LessonsPage from "./../pages/Student/ProfilePage/LessonsPage/LessonsPage";
import Settings from "./../pages/Student/ProfilePage/SettingsPage/Settings";

const studentRoutes = [
  { index: true, element: <WelcomePage /> },
  { path: "lessons", element: <LessonsPage /> },
  { path: "profile", element: <ProfileInfoPage /> },
  { path: "settings", element: <Settings /> },
  { path: "test", element: <TestPage /> },
  { path: "new-booking", element: <NewBookingPage /> },
  // { path: "Quizzes", element: <QuizPage /> },
  { path: "messages", element: <ChatApp /> },
  { path: "school", element: <School /> },
  {
    path: "theory",
    children: [
      { index: true, element: <Theory /> },
      { path: "quiz/:id", element: <QuizApp /> },
      { path: "results", element: <QuizHistory /> },
    ],
  },
  { path: "material", element: <StudyMaterialPage /> },
  { path: "theory", element: <Theory /> },
];

export default studentRoutes;
