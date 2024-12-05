import ChatApp from "../pages/ChatApp/ChatApp";
import Form from "./../pages/Student/BookingandScheduling/components/Form/Form";
import CoursesPage from "./../pages/Student/ProfilePage/CoursesPage/CoursesPage";
import LessonsPage from "./../pages/Student/ProfilePage/LessonsPage/LessonsPage";
import ProfileInfoPage from "./../pages/Student/ProfilePage/ProfileInfoPage/ProfileInfoPage";
import Settings from "./../pages/Student/ProfilePage/SettingsPage/Settings";
import TestPage from "./../pages/Student/ProfilePage/TestPage/TestPage";
import QuestionsForm from "./../pages/Student/QuestionsForm/QuestionsForm";
import WelcomePage from "./../pages/Student/WelcomePage/index";

const studentRoutes = [
  { index: true, element: <WelcomePage /> },
  { path: "courses", element: <CoursesPage /> },
  { path: "lessons", element: <LessonsPage /> },
  { path: "profile", element: <ProfileInfoPage /> },
  { path: "questions", element: <QuestionsForm /> },
  { path: "settings", element: <Settings /> },
  { path: "test", element: <TestPage /> },
  { path: "new-booking", element: <Form /> },
  { path: "messages", element: <ChatApp /> },
];

export default studentRoutes;
