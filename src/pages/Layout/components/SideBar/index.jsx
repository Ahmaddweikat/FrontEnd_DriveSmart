import {
  faBook,
  faBookOpen,
  faClipboardCheck,
  faMessage,
  faSchool,
  faPen,
  faChalkboard,
  faHomeUser,
  faChalkboardUser,
  faCarSide,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useLocation } from "react-router-dom";
import Logo from "../../../../assets/DRIVESMART.png";
import SidebarButton from "./SidebarButton";

const sidebarRoutes = [
  {
    icon: faHomeUser,
    label: "Dashboard",
    path: "",
  },
  {
    icon: faSchool,
    label: "School",
    path: "school",
  },
  {
    icon: faClipboardCheck,
    label: "Theoretical exam practice",
    path: "theory",
  },
  {
    icon: faBookOpen,
    label: "Study Material",
    path: "material",
  },
  {
    icon: faCarSide,
    label: "Lessons",
    path: "lessons",
  },
  {
    icon: faUserTie,
    label: "Booking Lesson",
    path: "new-booking",
  },
  // {
  //   icon: faClipboardCheck,
  //   label: "Test",
  //   path: "test",
  // },
  {
    icon: faChalkboardUser,
    label: "Practical Exam",
    path: "practical-exam",
  },
  {
    icon: faMessage,
    label: "Messages",
    path: "messages",
  },
];

const SideBar = ({ isExpanded, activePage, setActivePage }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const currentPath =
    pathSegments.length > 2 ? pathSegments[2] : pathSegments[1];

  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        className={`transition-width duration-300 ${
          isExpanded ? "w-80" : "w-20"
        } bg-white text-customGreen flex flex-col shadow-md border-r-2 h-full overflow-y-auto overflow-x-hidden custom-scrollbar`}
      >
        <div className="mb-4 flex justify-center">
          <img src={Logo} alt="Logo" className="h-18 w-15 mt-6" />
        </div>

        <nav className="space-y-4 w-full">
          {sidebarRoutes.map((route) => (
            <SidebarButton
              key={"student/" + route.path}
              icon={route.icon}
              label={route.label}
              isExpanded={isExpanded}
              active={currentPath === route.path}
              pageName={"student/" + route.path}
              fullPath={location.pathname}
              routePath={route.path}
            />
          ))}
        </nav>
      </aside>
    </div>
  );
};

/*
school 
lessons
upcoming
courses
test
messages
*/

export default SideBar;

/*
CoursesPage
LessonsPage
ProfileInfoPage
Settings
TestPage
QuestionsForm
*/
