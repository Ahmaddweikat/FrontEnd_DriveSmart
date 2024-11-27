import { createBrowserRouter } from "react-router-dom";
import Roles from "../constants/roles";
import NotFoundPage from "../pages/NotFoundPage";
import SignInPage from "../pages/SignInPage";
import StudentSignUp from "../pages/Student/SignUpPage";
import TrainerSignUp from "../pages/Trainer/SignUpPage";
import SchoolOwnerSignUp from "../pages/schoolManager/SignUpPage";
import HomePage from './../pages/Student/HomePage/HomePage';
import PrivateRoutes from "./PrivateRoutes";
import adminRoutes from "./adminRoutes";
import schoolManagerRoutes from "./schoolManagerRoutes";
import studentRoutes from "./studentRoutes";
import trainerRoutes from "./trainerRoutes";

const router = createBrowserRouter([
  // public routes
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/signup/student",
    element: <StudentSignUp />,
  },
  {
    path: "/signup/trainer",
    element: <TrainerSignUp />,
  },
  {
    path: "/signup/schoolManager",
    element: <SchoolOwnerSignUp />,
  },
  // Role based routes
  {
    path: `/${Roles.STUDENT}/*`,
    element: <PrivateRoutes roles={[Roles.student]} />,
    children: [
      {
        // element: <Layout />,
        children: studentRoutes,
      },
    ],
  },
  {
    path: `/${Roles.TRAINER}/*`,
    element: <PrivateRoutes roles={[Roles.trainer]} />,
    children: [
      {
        // element: <Layout />,
        children: trainerRoutes,
      },
    ],
  },
  {
    path: `/${Roles.SCHOOL_MANAGER}/*`,
    element: <PrivateRoutes roles={[Roles.SCHOOL_MANAGER]} />,
    children: [
      {
        // element: <Layout />,
        children: schoolManagerRoutes,
      },
    ],
  },
  {
    path: `/${Roles.ADMIN}/*`,
    element: <PrivateRoutes roles={[Roles.ADMIN]} />,
    children: [
      {
        // element: <Layout />,
        children: adminRoutes,
      },
    ],
  },
]);

export default router;
