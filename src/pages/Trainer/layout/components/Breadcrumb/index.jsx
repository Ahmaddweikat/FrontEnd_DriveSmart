import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const formatName = (name) => {
    if (/^[A-Z][a-z]*(?:[A-Z][a-z]*)+$/.test(name)) {
      return name.replace(/([A-Z])/g, ' $1').trim();
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <nav className="flex p-4 text-gray-600 bg-gray-100">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/" className="hover:text-gray-800">
            Home
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <React.Fragment key={name}>
              <li>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="h-3 w-3 mx-2"
                />
              </li>
              <li>
                {isLast ? (
                  <span className="font-medium text-gray-700">
                    {formatName(name)}
                  </span>
                ) : (
                  <Link to={routeTo} className="hover:text-gray-800">
                    {formatName(name)}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
