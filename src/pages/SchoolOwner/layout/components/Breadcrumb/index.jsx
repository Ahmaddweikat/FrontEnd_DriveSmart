import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname
    .split("/")
    .filter((x) => x)
    .filter(
      (path) =>
        !path.match(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        )
    );

  const formatName = (name) => {
    // Special cases
    if (name === "invitetrainers") {
      return "Invite Trainers";
    }

    // Handle camelCase
    if (/^[A-Z][a-z]*(?:[A-Z][a-z]*)+$/.test(name)) {
      return name.replace(/([A-Z])/g, " $1").trim();
    }

    // Handle regular paths with multiple words
    const words = name.split(/(?=[A-Z])|[-_]/);
    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
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
