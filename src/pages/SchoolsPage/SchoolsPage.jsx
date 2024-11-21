import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import NorthIcon from "@mui/icons-material/North";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import useCardData from "../pages/Student/HomePage/components/constants/ActionCardsData/cardsData"; // Adjust the path to match your directory structure
import FilterListIcon from "@mui/icons-material/FilterList";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import FilterPanel from "./components/FilterPanel";

const HomePage = () => {
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
  const [showBackToTop, setShowBackToTop] = useState(false);
  const cardsData = useCardData();
  const [isExpanded, setIsExpanded] = useState(false);
  const [notificationList, setNotificationList] = useState(notifications);
  const [messagesList, setMessagesList] = useState(messages);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [showMessageNotifications, setShowMessageNotifications] =
    useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const showThreshold = 655;

    setShowBackToTop(scrollY > showThreshold);
  }, []);

  const toggleFilterPanel = () => {
    setIsFilterPanelOpen((prev) => !prev);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleFilterClick = () => {
    const toggleSidebar = () => {
      setIsExpanded((prev) => !prev);
    };
    toggleSidebar(true);
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

  const toggleMessageNotifications = () => {
    setShowMessageNotifications((prev) => !prev);
    setShowNotifications(false); // Ensure bell notifications are closed when messages open
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="grid grid-row-5 bg-custombg">
      {/* Top Bar */}
      <div>
        <TopBar
          toggleSidebar={toggleSidebar}
          toggleNotifications={toggleNotifications}
          toggleMessageNotifications={toggleMessageNotifications}
          showNotifications={showNotifications}
          showMessageNotifications={showMessageNotifications}
          notificationList={notificationList}
          messagesList={messagesList}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
        />
        <div>
          {/* Filter Panel */}
          <FilterPanel
            isOpen={isFilterPanelOpen}
            onClose={() => setIsFilterPanelOpen(false)}
          />
        </div>
      </div>
      <div>
        <h3 className="flex justify-center text-4xl mt-8">Driving Schools</h3>
      </div>
      <div className="flex items-center text-center my-6 relative">
        {/* Left line */}
        <span className="outer-line flex-grow border-b border-gray-300"></span>
        {/* Center icon */}
        <span className="mx-4">
          <EmojiTransportationIcon style={{ width: 40, height: 40 }} />
        </span>
        {/* Right line */}
        <span className="outer-line flex-grow border-b border-gray-300 relative">
          {/* Positioned button above the line */}
          <Button
            variant="outlined"
            onClick={toggleFilterPanel}
            endIcon={<FilterListIcon />}
            style={{
              color: "#72b626",
              position: "absolute",
              top: "-40px",
              right: "20px",
            }}
          >
            Filter
          </Button>
        </span>{" "}
      </div>
      {/* Cards Grid */}
      <div
        className={`p-8 transition-all duration-300 ${
          isFilterPanelOpen ? "ml-72" : ""
        }`}
      >
        <div
          className={`grid ${
            isFilterPanelOpen
              ? "grid-cols-1 md:grid-cols-3 gap-6"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          }`}
        >
          {cardsData.map((card, index) => (
            <Card key={index} sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={card.image}
                  alt={card.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {card.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  href={card.website}
                  target="_blank"
                >
                  Visit
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-customGreen text-white p-2 rounded-full shadow-lg transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          aria-label="Back to top"
        >
          <NorthIcon />
        </button>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
