import React from "react";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
function Breadcrumb() {
  return (
    <nav className="flex p-4 text-gray-600 bg-gray-100">
      <ol className="flex items-center space-x-2">
        <li>
          <p className="hover:text-gray-800">My Profile</p>
        </li>
        <li>
          <KeyboardArrowRightOutlinedIcon className="h-3 w-3 mx-2" />
        </li>
        <li>
          <p className="hover:text-gray-800 font-medium text-gray-700">
            Profile
          </p>
        </li>
      </ol>
    </nav>
  );
}

export default Breadcrumb;
