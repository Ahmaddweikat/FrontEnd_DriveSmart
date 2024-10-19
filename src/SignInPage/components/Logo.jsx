import React from "react";
import logo from "./66.png"; // Ensure this points to your logo image

function Logo() {
  return (
    <div className="flex items-center">
      <img
        src={logo}
        alt="Driving School Logo"
        className="w-28 h-30 object-contain mr-4" // Added margin right for spacing
      />
    </div>
  );
}

export default Logo;
