import { createBrowserRouter } from "react-router-dom";
import Roles from "../constants/roles";
import NotFoundPage from "../pages/NotFoundPage";
import SignInPage from "../pages/SignInPage";
import StudentSignUp from "../pages/Student/SignUpPage";
import TrainerSignUp from "../pages/Trainer/SignUpPage";
import SchoolOwnerSignUp from "../pages/schoolManager/SignUpPage";
// import HomePage from "./../pages/Student/HomePage/HomePage";
import EmailPage from "../pages/ForgetPasswordPage/EmailPage/EmailPage";
import Layout from "../pages/Layout";
import TrainerLayout from "../pages/Trainer/layout";
import SchoolPage from "../pages/SchoolPage";
import GetALicense from "../pages/Student/GetALicense/GetALicense";
import Code from "./../pages/ForgetPasswordPage/CodePage/Code";
import NewPassword from "./../pages/ForgetPasswordPage/NewPasswordPage/NewPassword";
import HomePage from "./../pages/HomePage/HomePage";
import SchoolsPage from "./../pages/SchoolsPage/SchoolsPage";
import PrivateRoutes from "./PrivateRoutes";
import adminRoutes from "./adminRoutes";
import schoolManagerRoutes from "./schoolManagerRoutes";
import studentRoutes from "./studentRoutes";
import trainerRoutes from "./trainerRoutes";
import theoryRoutes from "./theoryRoutes";
import SchoolOwnerLayout from "../pages/SchoolOwner/layout";
import AdminLayout from "../pages/Administrator/Layout";

const router = createBrowserRouter([
  // ----------------------- public routes --------------------------------
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/licenses",
    element: <GetALicense />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/schools",
    element: <SchoolsPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/school/:id",
    element: <SchoolPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/signup/student",
    element: <StudentSignUp />,
  },
  {
    path: "/forget-password",
    element: <EmailPage />,
  },
  {
    path: "/code-verification",
    element: <Code />,
  },
  {
    path: "/new-password",
    element: <NewPassword />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/signup/trainer",
    element: <TrainerSignUp />,
  },
  {
    path: "/signup/schoolManager",
    element: <SchoolOwnerSignUp />,
  },
  // ---------- Role based routes --------------------------------
  {
    path: `/${Roles.STUDENT}/*`,
    // element: <PrivateRoutes roles={[Roles.STUDENT]} />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <Layout />,
        children: [...studentRoutes, ...theoryRoutes],
      },
    ],
  },
  {
    path: `/${Roles.TRAINER}/*`,
    // element: <PrivateRoutes roles={[Roles.TRAINER]} />,

    children: [
      {
        element: <TrainerLayout />,
        children: trainerRoutes,
      },
    ],
  },
  {
    path: `/${Roles.SCHOOL_MANAGER}/*`,
    // element: <PrivateRoutes roles={[Roles.SCHOOL_MANAGER]} />,
    children: [
      {
        element: <SchoolOwnerLayout />,
        children: schoolManagerRoutes,
      },
    ],
  },
  {
    path: `/${Roles.ADMIN}/*`,
    // element: <PrivateRoutes roles={[Roles.ADMIN]} />,
    children: [
      {
        element: <AdminLayout />,
        children: adminRoutes,
      },
    ],
  },
]);

export default router;
