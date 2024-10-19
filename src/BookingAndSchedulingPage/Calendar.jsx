import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBars,
  faBell,
  faChevronDown,
  faBook,
  faHome,
  faQuestionCircle,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
const notifications = [
  { id: 1, message: "Your lesson is scheduled for tomorrow.", read: false },
  {
    id: 2,
    message: "You have a new message from your instructor.",
    read: false,
  },
  { id: 3, message: "Don't forget to submit your assignment.", read: false },
  { id: 4, message: "Don't forget to submit your assignment.", read: false },
];
const Calendar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const [notificationList, setNotificationList] = useState(notifications);
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };
  const markAsRead = (id) => {
    setNotificationList((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  const markAllAsRead = () => {
    setNotificationList((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`transition-width duration-300 ${
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
        {/* Navigation
        <nav className="space-y-4 w-full">
          <SidebarButton
            icon={faUser} // Icon for "Profile"
            label="Profile"
            isExpanded={isExpanded}
            active={activePage === "profile"}
            setActivePage={setActivePage}
            pageName="profile"
          />
          <SidebarButton
            icon={faBook} // New icon for "Lessons"
            label="Lessons"
            isExpanded={isExpanded}
            active={activePage === "lessons"}
            setActivePage={setActivePage}
            pageName="lessons"
          />
          <SidebarButton
            icon={faCalendarCheck} // Ensure correct import
            label="Upcoming Lessons"
            isExpanded={isExpanded}
            active={activePage === "upcoming"}
            setActivePage={setActivePage}
            pageName="upcoming"
          />
          <SidebarButton
            icon={faBookOpen} // New icon for "Practice"
            label="My Courses "
            isExpanded={isExpanded}
            active={activePage === "courses"}
            setActivePage={setActivePage}
            pageName="courses"
          />
          <SidebarButton
            icon={faClipboardCheck} // New icon for "Test"
            label="Test"
            isExpanded={isExpanded}
            active={activePage === "test"}
            setActivePage={setActivePage}
            pageName="test"
          />
          <SidebarButton
            icon={faCog} // Icon for "Settings"
            label="Settings"
            isExpanded={isExpanded}
            active={activePage === "settings"}
            setActivePage={setActivePage}
            pageName="settings"
          />
          <SidebarButton
            icon={faRightFromBracket} // Icon for "Settings"
            label="Sign out"
            isExpanded={isExpanded}
            active={activePage === "sign-out"}
            setActivePage={setActivePage}
            pageName="sign-out"
          />
        </nav> */}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <TopBar
          toggleSidebar={toggleSidebar}
          toggleNotifications={toggleNotifications}
          showNotifications={showNotifications} // Pass showNotifications as a prop
          notificationList={notificationList}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
        />

        {/* Profile Information */}
        {/* <div className="flex-1 p-8 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-7xl mx-auto"> */}
        {/* Updated Header - Center Profile Picture */}
        {/* <header className="flex flex-col items-center mb-6">
              <div className="w-28 h-28 bg-gray-200 rounded-full overflow-hidden mb-4">
                <img
                  src="/placeholder.svg?height=128&width=128"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h2 className="mt-2 text-xl font-semibold">Ahmad Dweikat</h2>
                <p className="text-gray-500">Student ID: 123456</p>
              </div>
            </header> */}

        {/* Personal Information with Border */}
        {/* <section className="mb-8 border rounded-lg p-6">
              <h3 className="text-xl font-semibold">Personal Information</h3>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoField label="First Name" value="Ahmad" />
                <InfoField label="Last Name" value="Dweikat" />
                <InfoField label="Email Address" value="test@example.com" />
                <InfoField label="Phone" value="0599123456" />
                <InfoField label="Gender" value="Male" />
                <InfoField label="Date Of Birth" value="27/07/2002" />
              </div>
            </section> */}
        {/* Address Section with Border
            <section className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold">Address</h3>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoField label="Country" value="Palestine" />
                <InfoField label="City/State" value="Nablus" />
                <InfoField label="Street" value="Amman ST" />
                <InfoField label="Near to" value="Qadri Toqan School" />
              </div>
            </section>
          </div>
        </div> */}
      </div>
    </div>
  );
};

function TopBar({
  toggleSidebar,
  toggleNotifications,
  showNotifications,
  notificationList,
  markAsRead,
  markAllAsRead,
}) {
  const unreadCount = notificationList.filter((n) => !n.read).length; // Calculate unread notifications count

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center relative h-16">
      {/* Left Section: Expand Button and Navigation Links */}
      <div className="relative flex items-center w-1/2">
        {/* Expand Button */}
        <button
          onClick={toggleSidebar}
          className="mr-4 text-gray-600 hover:text-gray-800 border-r-2 border-gray-300 pr-5 h-16 flex items-center"
        >
          <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
        </button>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4 font-medium text-sm ml-4">
          <button className="flex items-center text-gray-700 hover:text-green-500 pr-4">
            <FontAwesomeIcon icon={faHome} className="h-3 w-3 mr-2" />
            Home
          </button>
          {/* Theory Questions with Dropdown */}
          <div className="relative group">
            <button className="flex items-center text-gray-700 group-hover:text-green-500 pr-4">
              <FontAwesomeIcon
                icon={faQuestionCircle}
                className="h-3 w-3 mr-2"
              />
              Theory Questions
              <FontAwesomeIcon icon={faChevronDown} className="h-3 w-3 ml-2" />
            </button>

            {/* Dropdown list that appears on hover */}
            <div className="absolute left-0 hidden group-hover:block bg-white border rounded shadow-lg z-50 w-48">
              <ul className="p-2">
                <li className="hover:bg-gray-100 p-2">
                  <a href="#" className="block text-gray-700">
                    Motorcycle theory questions
                  </a>
                </li>
                <li className="hover:bg-gray-100 p-2">
                  <a href="#" className="block text-gray-700">
                    Car theory questions
                  </a>
                </li>
                <li className="hover:bg-gray-100 p-2">
                  <a href="#" className="block text-gray-700">
                    Tractor theory questions
                  </a>
                </li>
                <li className="hover:bg-gray-100 p-2">
                  <a href="#" className="block text-gray-700">
                    Light truck theory questions
                  </a>
                </li>
                <li className="hover:bg-gray-100 p-2">
                  <a href="#" className="block text-gray-700">
                    Heavy truck theory questions
                  </a>
                </li>
                <li className="hover:bg-gray-100 p-2">
                  <a href="#" className="block text-gray-700">
                    Taxi questions
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <button className="flex items-center text-gray-700 hover:text-green-500 pr-4 ">
            <FontAwesomeIcon icon={faBook} className="h-3 w-3 mr-2" />
            Theory Learning
          </button>
          <button className="flex items-center text-gray-700 hover:text-green-500 pr-4 ">
            <FontAwesomeIcon icon={faEnvelope} className="h-3 w-3 mr-2" />
            Inquiry
          </button>

          <button className="flex items-center text-gray-700 hover:text-green-500 pr-4 ">
            <FontAwesomeIcon icon={faPhone} className="h-3 w-3 mr-2" />
            Contact Us
          </button>
        </div>
      </div>

      {/* Right Section: Notification Icon and Profile */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="text-gray-500 hover:text-gray-700 border-x-2 h-16 pr-4 pl-4"
          >
            <FontAwesomeIcon icon={faBell} className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute top-16 right-0 bg-white border rounded shadow-lg z-50 w-64">
              <div className="p-4">
                <h4 className="font-semibold flex justify-between items-center">
                  Notifications
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Mark All as Read
                  </button>
                </h4>
                {notificationList.length > 0 ? (
                  notificationList.map((notification) => (
                    <div
                      key={notification.id}
                      className={`py-2 border-b last:border-b-0 ${
                        notification.read ? "text-gray-500" : "font-semibold"
                      }`}
                      onClick={() => markAsRead(notification.id)} // Mark as read on click
                    >
                      {notification.message}
                    </div>
                  ))
                ) : (
                  <div>No notifications</div>
                )}
              </div>
            </div>
          )}
        </div>
        {/* Profile Picture */}
        <img
          src="/path/to/profile-picture.jpg"
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover z-10"
        />
        <span className="text-gray-700 font-medium">Ahmad Dweikat</span>
      </div>
    </div>
  );
}

// function SidebarButton({
//   icon,
//   label,
//   isExpanded,
//   active,
//   setActivePage,
//   pageName,
// }) {
//   return (
//     <Link
//       to={`/${pageName}`}
//       className="group relative flex items-center w-full"
//     >
//       <button
//         onClick={() => setActivePage(pageName)}
//         className={`relative flex items-center justify-start w-full px-5 py-3 rounded-lg ${
//           active ? "text-green-500" : "hover:bg-gray-100"
//         } transition-colors duration-300`}
//       >
//         <FontAwesomeIcon
//           icon={icon}
//           className={`text-2xl transition-colors duration-300 ${
//             active ? "text-green-500" : "text-gray-400"
//           }`}
//           style={{ minWidth: "24px", textAlign: "center" }}
//         />
//         {isExpanded && (
//           <span className="ml-4 text-lg font-semibold text-gray-700">
//             {label}
//           </span>
//         )}
//         {active && (
//           <span className="absolute right-0 top-1/2 transform -translate-y-1/2 h-12 w-1 bg-green-500 transition-all duration-300"></span>
//         )}
//       </button>
//       {!isExpanded && (
//         <span className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           {label}
//         </span>
//       )}
//     </Link>
//   );
// }

// function Breadcrumb() {
//   return (
//     <nav className="flex p-4 text-gray-600 bg-gray-100">
//       <ol className="flex items-center space-x-2">
//         <li>
//           <p className="hover:text-gray-800">My Profile</p>
//         </li>
//         <li>
//           <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3 mx-2" />
//         </li>
//         <li>
//           <p className="hover:text-gray-800 font-medium text-gray-700">
//             Profile
//           </p>
//         </li>
//       </ol>
//     </nav>
//   );
// }

// function InfoField({ label, value }) {
//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-700">{label}</label>
//       <p className="mt-1 text-base text-gray-900">{value}</p>
//     </div>
//   );
// }

export default Calendar;
