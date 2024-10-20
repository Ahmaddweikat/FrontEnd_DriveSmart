import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faChevronRight,
  faBook,
  faUser,
  faClipboardCheck,
  faCog,
  faStar as solidStar,
  faCalendarCheck,
  faBookOpen,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import SidebarButton from "./SidebarButton";
import Logo from "../../../assets/LOGO.png";

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
          <img src={Logo} alt="Logo" className="h-15 w-15" />
        </div>

        {/* Navigation */}
        <nav className="space-y-4 w-full">
          <SidebarButton
            icon={faUser}
            label="Profile"
            isExpanded={isExpanded}
            active={activePage === "profile"}
            setActivePage={setActivePage}
            pageName="profile"
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
            icon={faCog}
            label="Settings"
            isExpanded={isExpanded}
            active={activePage === "settings"}
            setActivePage={setActivePage}
            pageName="settings"
          />
          <SidebarButton
            icon={faRightFromBracket}
            label="Sign out"
            isExpanded={isExpanded}
            active={activePage === "sign-out"}
            setActivePage={setActivePage}
            pageName="sign-out"
          />
        </nav>
      </aside>
    </div>
  );
};

export default SideBar;
