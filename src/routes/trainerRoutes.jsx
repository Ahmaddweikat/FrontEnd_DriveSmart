import TrainerSignUp from "../pages/Trainer/SignUpPage"
import StudentsPage from "../pages/Trainer/TrainerProfile/StudentsPage"
import School from "../pages/SchoolPage";
import Lessons from "../pages/Trainer/TrainerProfile/LessonsPage";
import Availability from "../pages/Trainer/TrainerProfile/AvailabilityLessons"
import Bookings from "../pages/Trainer/TrainerProfile/BookedLessons"
import Quizzes from "../pages/Trainer/TrainerProfile/QuizzesMaker"
import ChatApp from "../pages/ChatApp/ChatApp";

const trainerRoutes = [
    { path: "signup", element: <TrainerSignUp /> },
    { path: "students", element: <StudentsPage /> },
    { path: "school", element: <School /> },
    { path: "lessons", element: <Lessons /> },
    { path: "availability", element: <Availability /> },
    {path: "bookings", element: <Bookings/>},
    {path:"quizzes", element: <Quizzes/>},
    {path: "messages", element: <ChatApp /> },
    
];

export default trainerRoutes;
