import React, { useState, useRef, useEffect } from "react";

import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import Breadcrumb from "./components/Breadcrumb";
import ProfileEditForm from "./components/ProfileEditForm";

const Settings = () => {
  const messages = [
    {
      id: 1,
      name: "Yasni Abdulrahman",
      message: "Lecture in Hall 111080...",
      timestamp: "7/09/24 10:30 AM",
      type: "Private",
      profileImage: "/path-to-image-1",
      read: false,
    },
    {
      id: 2,
      name: "Ahmed Saifuddin",
      message: "Engineering exam details...",
      timestamp: "31/03/24 2:15 PM",
      type: "Private",
      profileImage: "/path-to-image-2",
      read: true,
    },
    // Add more messages if needed
  ];
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePage, setActivePage] = useState("settings");
  const [profilePicture, setProfilePicture] = useState(
    "/path/to/profile-picture.jpg"
  ); // State for profile picture
  const [selectedImage, setSelectedImage] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const [notificationList, setNotificationList] = useState(notifications);
  const [messagesList, setMessagesList] = useState(messages);
  const [selectedChat, setSelectedChat] = useState(null); // Manage the selected chat
  const [showMessageNotifications, setShowMessageNotifications] =
    useState(false);

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

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Update selected image state
      };
      reader.readAsDataURL(file); // Convert the file to a base64 URL
    }
  };
  const toggleMessageNotifications = () => {
    setShowMessageNotifications((prev) => !prev);
    setShowNotifications(false); // Ensure bell notifications are closed when messages open
  };
  const handleSave = () => {
    if (selectedImage) {
      setProfilePicture(selectedImage); // Update profile picture on save
      // setSelectedImage(null); // Reset selected image after saving
    }
  };
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <SideBar
        isExpanded={isExpanded}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <TopBar
          toggleSidebar={toggleSidebar}
          toggleNotifications={toggleNotifications}
          toggleMessageNotifications={toggleMessageNotifications}
          showNotifications={showNotifications}
          showMessageNotifications={showMessageNotifications}
          notificationList={notificationList}
          messagesList={messagesList} // Ensure this line is present
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
        />{" "}
        {/* Breadcrumb */}
        <Breadcrumb />
        <ProfileEditForm />
      </div>
    </div>
  );
};

export default Settings;
