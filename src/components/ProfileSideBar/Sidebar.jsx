import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faClipboardCheck,
  faStar as solidStar,
  faCalendarCheck,
  faBookOpen,
  faSchool,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import SidebarButton from "../../ProfilePage/CoursesPage/components/SidebarButton";
import Logo from "../../assets/DRIVESMART.png";

const SideBar = ({ isExpanded, activePage, setActivePage }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`transition-width duration-300 ${
          isExpanded ? "w-80" : "w-20"
        } bg-white text-customGreen flex flex-col shadow-md border-r-2 h-full overflow-y-auto overflow-x-hidden custom-scrollbar`}
        // Set overflow-x to hidden to prevent horizontal scrolling
      >
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <img src={Logo} alt="Logo" className="h-18 w-15 mt-6" />
        </div>

        {/* Navigation */}
        <nav className="space-y-4 w-full">
          <SidebarButton
            icon={faSchool}
            label="School"
            isExpanded={isExpanded}
            active={activePage === "school"}
            setActivePage={setActivePage}
            pageName="school"
          />
          <SidebarButton
            icon={faBook}
            label="Lessons"
            isExpanded={isExpanded}
            active={activePage === "lessons"}
            setActivePage={setActivePage}
            pageName="lessons"
          />
          <SidebarButton
            icon={faCalendarCheck}
            label="Upcoming Lessons"
            isExpanded={isExpanded}
            active={activePage === "upcoming"}
            setActivePage={setActivePage}
            pageName="upcoming"
          />
          <SidebarButton
            icon={faBookOpen}
            label="Courses"
            isExpanded={isExpanded}
            active={activePage === "courses"}
            setActivePage={setActivePage}
            pageName="courses"
          />
          <SidebarButton
            icon={faClipboardCheck}
            label="Test"
            isExpanded={isExpanded}
            active={activePage === "test"}
            setActivePage={setActivePage}
            pageName="test"
          />
          <SidebarButton
            icon={faMessage}
            label="Messages"
            isExpanded={isExpanded}
            active={activePage === "messages"}
            setActivePage={setActivePage}
            pageName="messages"
          />
        </nav>
      </aside>
    </div>
  );
};

export default SideBar;
