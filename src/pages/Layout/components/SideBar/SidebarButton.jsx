import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../../../../store/auth.store";

function SidebarButton({
  icon,
  label,
  isExpanded,
  active,
  pageName,
  routePath,
}) {
  const location = useLocation();
  const fullPath = location.pathname;
  const { user } = useAuthStore();

  const getPagePath = () => {
    if (pageName === "student/school") {
      return `student/school/${user.schoolId}`;
    }
    return pageName;
  };

  // Check if the current route is part of this section
  const isActive = () => {
    // For Dashboard (empty path), only match exact root student path
    if (pageName === "student/") {
      return fullPath === "/student";
    }
    // For other routes, match their specific paths
    return fullPath.includes(`/student/${routePath}`);
  };

  return (
    <Link
      to={`/${getPagePath()}`}
      className="group relative flex items-center w-full"
    >
      <button
        className={`relative flex items-center justify-start w-full px-5 py-3 rounded-lg ${
          isActive() ? "text-customGreen" : "hover:bg-gray-100"
        } transition-colors duration-300`}
      >
        <FontAwesomeIcon
          icon={icon}
          className={`text-2xl transition-colors duration-300 ${
            isActive() ? "text-customGreen" : "text-gray-400"
          }`}
          style={{ minWidth: "24px", textAlign: "center" }}
        />
        {isExpanded && (
          <span className="ml-4 text-lg font-semibold text-gray-700">
            {label}
          </span>
        )}
        {isActive() && (
          <span className="absolute right-0 top-1/2 transform -translate-y-1/2 h-12 w-1 bg-customGreen transition-all duration-300" />
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
