import ChatApp from "../pages/ChatApp/ChatApp";
import School from "../pages/SchoolPage";
import Availability from "../pages/Trainer/TrainerProfile/AvailabilityLessons";
import Bookings from "../pages/Trainer/TrainerProfile/BookedLessons/";
import Lessons from "../pages/Trainer/TrainerProfile/LessonsPage";
import LessonDetails from "../pages/Trainer/TrainerProfile/LessonsPage/components/LessonDetails";
import Quizzes from "../pages/Trainer/TrainerProfile/QuizzesMaker";
import StudentsPage from "../pages/Trainer/TrainerProfile/StudentsPage";
import WelcomePage from "../pages/Trainer/WelcomPage";
import ExamsRequests from "../pages/Trainer/ExamsRequests";

const trainerRoutes = [
  { index: true, element: <WelcomePage /> },
  {
    path: "profile",
    element: <h1 className="text-center"> Trainer Profile </h1>,
  },
  {
    path: "settings",
    element: <h1 className="text-center"> Trainer Settings </h1>,
  },
  { path: "students", element: <StudentsPage /> },
  { path: "school/:id", element: <School /> },
  {
    path: "lessons",
    element: <Lessons />,
    children: [{ path: ":id", element: <LessonDetails /> }],
  },
  { path: "availability", element: <Availability /> },
  { path: "bookings", element: <Bookings /> },
  { path: "quizzes", element: <Quizzes /> },
  { path: "messages", element: <ChatApp /> },
  { path: "exam-requests", element: <ExamsRequests /> },
];

export default trainerRoutes;
