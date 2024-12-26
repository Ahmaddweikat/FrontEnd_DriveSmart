import TrainerSignUp from "../pages/Trainer/SignUpPage"
import StudentsPage from "../pages/Trainer/TrainerProfile/StudentsPage"
import School from "../pages/SchoolPage";
import Lessons from "../pages/Trainer/TrainerProfile/LessonsPage";
import Availability from "../pages/Trainer/TrainerProfile/AvailabilityLessons"
const trainerRoutes = [
    { path: "signup", element: <TrainerSignUp /> },
    { path: "students", element: <StudentsPage /> },
    { path: "school", element: <School /> },
    { path: "lessons", element: <Lessons /> },
    { path: "availability", element: <Availability /> },

];

export default trainerRoutes;
