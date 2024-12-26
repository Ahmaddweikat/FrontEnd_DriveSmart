import ChatApp from "../pages/ChatApp/ChatApp";
import School from "../pages/SchoolPage";
import StudyMaterialPage from "../pages/StudyMaterialPage";
import Theory from "../pages/TheoryPage";
import LessonsPage from "./../pages/Student/ProfilePage/LessonsPage/LessonsPage";
import ProfileInfoPage from "./../pages/Student/ProfilePage/ProfileInfoPage/ProfileInfoPage";
import Quizzes from "./../pages/Student/ProfilePage/QuizPage";
import Settings from "./../pages/Student/ProfilePage/SettingsPage/Settings";
import TestPage from "./../pages/Student/ProfilePage/TestPage/TestPage";
import QuestionsForm from "./../pages/Student/QuestionsForm/QuestionsForm";
import WelcomePage from "./../pages/Student/WelcomePage/index";
import NewBookingPage from "../pages/Student/BookingandScheduling/NewBookingPage";

const studentRoutes = [
  { index: true, element: <WelcomePage /> },
  { path: "quizzes", element: <Quizzes /> },
  { path: "lessons", element: <LessonsPage /> },
  { path: "profile", element: <ProfileInfoPage /> },
  { path: "questions", element: <QuestionsForm /> },
  { path: "settings", element: <Settings /> },
  { path: "test", element: <TestPage /> },
  { path: "new-booking", element: <NewBookingPage /> },
  { path: "messages", element: <ChatApp /> },
  { path: "school", element: <School /> },
  { path: "material", element: <StudyMaterialPage /> },
  { path: "theory", element: <Theory /> },
];

export default studentRoutes;
