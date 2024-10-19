import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Import BrowserRouter, Route, and Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SidebarButton({
  icon,
  label,
  isExpanded,
  active,
  setActivePage,
  pageName,
}) {
  return (
    <Link
      to={`/${pageName}`}
      className="group relative flex items-center w-full"
    >
      <button
        onClick={() => setActivePage(pageName)}
        className={`relative flex items-center justify-start w-full px-5 py-3 rounded-lg ${
          active ? "text-green-500" : "hover:bg-gray-100"
        } transition-colors duration-300`}
      >
        <FontAwesomeIcon
          icon={icon}
          className={`text-2xl transition-colors duration-300 ${
            active ? "text-green-500" : "text-gray-400"
          }`}
          style={{ minWidth: "24px", textAlign: "center" }}
        />
        {isExpanded && (
          <span className="ml-4 text-lg font-semibold text-gray-700">
            {label}
          </span>
        )}
        {active && (
          <span className="absolute right-0 top-1/2 transform -translate-y-1/2 h-12 w-1 bg-green-500 transition-all duration-300"></span>
        )}
      </button>
      {!isExpanded && (
        <span className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {label}
        </span>
      )}
    </Link>
  );
}

export default SidebarButton;
const Test = () => <div>Test Page</div>;
const UpcomingLessons = () => <div>Upcoming Lessons Page</div>;
const MyCourses = () => <div>My Courses Page</div>;
const Profile = () => <div>Profile Page</div>;
const Settings = () => <div>Settings Page</div>;
const SignOut = () => <div>Sign Out Page</div>;
