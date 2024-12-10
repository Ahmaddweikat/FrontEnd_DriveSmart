import {
  faBook,
  faClipboardCheck,
  faMessage,
  faSchool,
  faPen,
  faChalkboard,
  faUserGroup
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useLocation } from "react-router-dom";
import Logo from "../../../../../assets/DRIVESMART.png";
import SidebarButton from "./SidebarButton";

const sidebarRoutes = [
  {
    icon: faSchool,
    label: "School",
    path: "school",
  },
  {
    icon: faUserGroup,
    label: "Students",
    path: "students",
  },
  {
    icon: faBook,
    label: "Lessons",
    path: "lessons",
  },
  
  {
    icon: faChalkboard,
    label: "Quizzes",
    path: "Quizzes",
  },
  
  {
    icon: faMessage,
    label: "Messages",
    path: "messages",
  },
];

const SideBar = ({ isExpanded, activePage, setActivePage }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const currentPath = pathSegments.length > 2 ? pathSegments[2] : pathSegments[1];

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
              key={"trainer/" + route.path}
              icon={route.icon}
              label={route.label}
              isExpanded={isExpanded}
              active={currentPath === route.path}
              pageName={"trainer/" + route.path}
              fullPath={location.pathname}
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
