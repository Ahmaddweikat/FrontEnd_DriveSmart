import TrainerSignUp from "../pages/Trainer/SignUpPage"
import StudentsPage from "../pages/Trainer/TrainerProfile/StudentsPage"
import School from "../pages/SchoolPage";

const trainerRoutes = [
    { path: "signup", element: <TrainerSignUp /> },
    { path: "students", element: <StudentsPage /> },
    { path: "School", element: <School /> },

];

export default trainerRoutes;
