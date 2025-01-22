import RegistrationRequests from "../pages/SchoolOwner/SchoolOwnerProfile/RegistrationRequests";
import School from "../pages/SchoolPage";
import InvitePage from "../pages/SchoolOwner/SchoolOwnerProfile/InvitePage";
import CarsPage from "../pages/SchoolOwner/SchoolOwnerProfile/CarsPage";
import TrainersPage from "../pages/SchoolOwner/SchoolOwnerProfile/TrainersPage";
import TrainerDetails from "../pages/SchoolOwner/SchoolOwnerProfile/TrainersPage/components/TrainerDetails";
import Students from "../pages/SchoolOwner/SchoolOwnerProfile/StudentPage";
import ChatApp from "../pages/ChatApp/ChatApp";
import Home from "../pages/SchoolOwner/HomePage";

const schoolManagerRoutes = [
  { index: true, element: <Home /> },
  { path: "school", element: <School /> },
  { path: "requests", element: <RegistrationRequests /> },
  { path: "invitetrainers", element: <InvitePage /> },
  { path: "trainers", element: <TrainersPage /> },
  { path: "trainers/:TrainerName", element: <TrainerDetails /> },
  { path: "cars", element: <CarsPage /> },
  { path: "students", element: <Students /> },
  { path: "messages", element: <ChatApp /> },
];

export default schoolManagerRoutes;
