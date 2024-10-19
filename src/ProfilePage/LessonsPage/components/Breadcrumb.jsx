import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
function Breadcrumb() {
  return (
    <nav className="flex p-4 text-gray-600 bg-gray-100">
      <ol className="flex items-center space-x-2">
        <li>
          <h4 href="#" className="hover:text-gray-800">
            My Profile
          </h4>
        </li>
        <li>
          <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3 mx-2" />
        </li>
        <li>
          <h4
            href="#"
            className="hover:text-gray-800 font-medium text-gray-700"
          >
            Lessons
          </h4>
        </li>
      </ol>
    </nav>
  );
}

export default Breadcrumb;
