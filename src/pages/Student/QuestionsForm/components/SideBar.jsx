import React from "react";
import logo from "../Images/LOGO.png";

const SideBar = ({ isExpanded }) => {
  return (
    <>
      {/* Sidebar */}
      <aside
        className={`transition-all duration-300 ${
          isExpanded ? "w-80" : "w-20"
        } bg-white text-green-500 flex flex-col items-center  shadow-md border-r-2`}
      >
        {/* Logo */}
        <div className="mb-12 pb-10">
          <img src={logo} alt="Logo" className="h-15 w-15" />
        </div>
        {/* Navigation */}
        <nav className="space-y-4 w-full"></nav>
      </aside>
    </>
  );
};

export default SideBar;
