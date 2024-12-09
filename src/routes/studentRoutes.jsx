import ChatApp from "../pages/ChatApp/ChatApp";
import Form from "./../pages/Student/BookingandScheduling/components/Form/Form";
import Quizzes from "./../pages/Student/ProfilePage/QuizPage";
import LessonsPage from "./../pages/Student/ProfilePage/LessonsPage/LessonsPage";
import ProfileInfoPage from "./../pages/Student/ProfilePage/ProfileInfoPage/ProfileInfoPage";
import Settings from "./../pages/Student/ProfilePage/SettingsPage/Settings";
import TestPage from "./../pages/Student/ProfilePage/TestPage/TestPage";
import QuestionsForm from "./../pages/Student/QuestionsForm/QuestionsForm";
import WelcomePage from "./../pages/Student/WelcomePage/index";
import School from "../pages/SchoolPage";
import Matrial from "../pages/StudyMaterialPage";
import Theory from "../pages/TheoryPage";

const studentRoutes = [
  { index: true, element: <WelcomePage /> },
  { path: "quizzes", element: <Quizzes /> },
  { path: "lessons", element: <LessonsPage /> },
  { path: "profile", element: <ProfileInfoPage /> },
  { path: "questions", element: <QuestionsForm /> },
  { path: "settings", element: <Settings /> },
  { path: "test", element: <TestPage /> },
  { path: "new-booking", element: <Form /> },
  { path: "messages", element: <ChatApp /> },
  { path: "school", element: <School /> },
  {path:"material",element:<Matrial/>},
  {path:"theory",element:<Theory/>}
];

export default studentRoutes;
