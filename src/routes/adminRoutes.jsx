import Schools from "../pages/Administrator/Dashboard/Schools";
import Requests from "../pages/Administrator/Dashboard/Requests";
import HomePage from "../pages/Administrator/HomePage";
import ChatApp from "../pages/ChatApp/ChatApp";

const adminRoutes = [
  { index: true, element: <HomePage /> },
  { path: "schools", element: <Schools /> },
  { path: "requests", element: <Requests /> },
  { path: "messages", element: <ChatApp /> },
];

export default adminRoutes;
