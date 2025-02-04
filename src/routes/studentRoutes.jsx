import React from "react";
import ChatApp from "../pages/ChatApp/ChatApp";
import School from "../pages/SchoolPage";
import NewBookingPage from "../pages/Student/BookingandScheduling/NewBookingPage";
import ProfileInfoPage from "../pages/Student/ProfilePage/ProfileInfoPage/ProfileInfoPage";
import TestPage from "../pages/Student/ProfilePage/TestPage/TestPage";
import QuizApp from "../pages/Student/QuestionsForm/components/QuizApp";
import QuizHistory from "../pages/Student/QuestionsForm/components/QuizHistory";
import WelcomePage from "../pages/Student/WelcomePage/index";
import Theory from "../pages/TheoryPage";
import LessonsPage from "./../pages/Student/ProfilePage/LessonsPage/LessonsPage";
import Settings from "./../pages/Student/ProfilePage/SettingsPage/Settings";
import LessonDetails from "../pages/Trainer/TrainerProfile/LessonsPage/components/LessonDetails";
import MaterialPage from "../pages/Student/MaterialPage/";
import PracticalExamPage from "../pages/Student/PracticalExam/PracticalExamPage";

const studentRoutes = [
  { index: true, element: <WelcomePage /> },
  {
    path: "lessons",
    element: <LessonsPage />,
    children: [{ path: ":id", element: <LessonDetails /> }],
  },
  { path: "profile", element: <ProfileInfoPage /> },
  { path: "settings", element: <Settings /> },
  { path: "test", element: <TestPage /> },
  { path: "new-booking", element: <NewBookingPage /> },
  // { path: "Quizzes", element: <QuizPage /> },
  { path: "messages", element: <ChatApp /> },
  { path: "school/:id", element: <School /> },
  {
    path: "theory",
    children: [
      { index: true, element: <Theory /> },
      { path: "quiz/:id", element: <QuizApp /> },
      { path: "results", element: <QuizHistory /> },
    ],
  },
  { path: "material", element: <MaterialPage /> },
  { path: "theory", element: <Theory /> },
  { path: "practical-exam", element: <PracticalExamPage /> },
];

export default studentRoutes;
