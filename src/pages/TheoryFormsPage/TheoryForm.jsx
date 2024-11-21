import React from "react";
import TopBar from "../../components/HomeTopBar/TopBar";
import Footer from "../../components/Footer";
import Banner from "./components/Banner";
import { notifications } from "../../constants/Notifications/notifications";
import { messages } from "../../constants/Message/messages";
import useNotifications from "../../hooks/useNotificationsState";
import useMessages from "../../hooks/useMessages";

const TheoryForm = () => {
  const {
    notificationList,
    showNotifications,
    toggleNotifications,
    markAsRead,
    markAllAsRead,
  } = useNotifications();
  const { messagesList, showMessageNotifications, toggleMessageNotifications } =
    useMessages();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-y-scroll">
        <TopBar
          toggleNotifications={toggleNotifications}
          toggleMessageNotifications={toggleMessageNotifications}
          showNotifications={showNotifications}
          showMessageNotifications={showMessageNotifications}
          notificationList={notificationList}
          messagesList={messagesList}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
        />
        <Banner />
        <div className="container mx-auto p-4"></div>
        <Footer />
      </div>
    </div>
  );
};

export default TheoryForm;
