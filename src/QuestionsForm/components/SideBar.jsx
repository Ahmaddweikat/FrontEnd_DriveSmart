import React from "react";

const SideBar = ({ isExpanded }) => {
  return (
    <>
      {/* Sidebar */}
      <aside
        className={`transition-all duration-300 ${
          isExpanded ? "w-80" : "w-20"
        } bg-white text-green-500 flex flex-col items-center py-6 shadow-md border-r-2`}
      >
        {/* Logo */}
        <div className="mb-6">
          <img
            src="/placeholder.svg?height=40&width=40"
            alt="Logo"
            className="h-10"
          />
        </div>
        {/* Navigation */}
        <nav className="space-y-4 w-full"></nav>
      </aside>
    </>
  );
};

export default SideBar;
