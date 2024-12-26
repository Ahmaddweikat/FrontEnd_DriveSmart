import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import HorizontalSplitOutlinedIcon from "@mui/icons-material/HorizontalSplitOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import { Skeleton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../../../store/auth.store";
import ChatApp from "../../../ChatApp/ChatApp";
import { useChat } from "../../../ChatApp/hooks/useChat";
import useGetStudentProfile from "./../../../Student/ProfilePage/ProfileInfoPage/hooks/useGetStudentProfile";
import NotificationsPanel from "./components/NotificationsPanel";

function TopBar({ toggleSidebar }) {
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [SelectedChatId, setSelectedChatId] = useState(null);
  const { getTotalUnreadCount } = useChat();

  // useEffect(() => {
  //   if (!showChatPanel) {
  //     setUnreadMessageCount(getTotalUnreadCount());
  //   }
  // }, [showChatPanel, getTotalUnreadCount]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleProfileDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  const { user, logout } = useAuthStore();
  const { data, isLoading, error } = useGetStudentProfile();

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center relative h-20 z-10">
      {/* Logo and Buttons */}
      <div className="relative flex items-center w-1/2 space-x-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-gray-800 border-r-2 border-gray-300 pr-5 h-20 flex items-center"
        >
          <HorizontalSplitOutlinedIcon className="h-5 w-5" />
        </button>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="rounded-full p-2 border border-gray-300 w-5/6 focus:outline-none focus:ring-2 focus:ring-customGreen"
        />
      </div>

      {/* Notifications and Messages */}
      <div className="flex items-center space-x-6">
        <NotificationsPanel />
        {/* Message Button */}
        <button
          onClick={() => {
            setShowChatPanel((prev) => !prev);
            setSelectedChatId(null);
          }}
          className="text-gray-500 hover:text-gray-700 h-16 pr-4 pl-4"
        >
          <Badge
            badgeContent={unreadMessageCount}
            classes={{ badge: "bg-red-500 text-white" }}
            overlap="circular"
          >
            <MessageOutlinedIcon
              style={{ width: "25px", height: "25px", marginTop: "4px" }}
            />
          </Badge>
        </button>
        {/* Chat Panel */}
        {showChatPanel && (
          <div className="fixed top-20 right-0 w-96 bg-white shadow-xl z-50 h-[calc(100vh-5rem)]">
            <div className="flex flex-col h-full">
              {/* Sticky Header */}
              <div className="sticky top-0 bg-white z-10">
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Messages</h3>
                  <button
                    onClick={() => setShowChatPanel(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <CloseIcon style={{ width: "20px", height: "20px" }} />
                  </button>
                </div>
              </div>

              {/* Chat Content */}
              <div className="flex-1 overflow-hidden">
                <ChatApp
                  isTopBarChat={true}
                  onUnreadCountChange={setUnreadMessageCount}
                />
              </div>

              {/* Footer with See All Button */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <Link to="/student/messages">
                  <button
                    className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
                    onClick={() => setShowChatPanel(false)}
                  >
                    See All Messages
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={handleProfileDropdown}
            className="flex items-center space-x-2"
            aria-expanded={showProfileDropdown}
          >
            {isLoading ? (
              <Skeleton variant="circular" width={40} height={40} />
            ) : (
              <Avatar
                alt="User Picture"
                src={!error && data?.profilePicture}
                sx={{ width: 40, height: 40 }}
              >
                {data?.name?.charAt(0).toUpperCase()}
              </Avatar>
            )}
            <span className="font-medium text-gray-600">
              {isLoading ? (
                <Skeleton variant="text" width={100} />
              ) : (
                data?.name || user.name
              )}
            </span>
            <ExpandMoreOutlinedIcon sx={{ width: 20, height: 20 }} />
          </button>
          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
              <Link to={`/${user.role}/profile`}>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-200">
                  Profile
                </button>
              </Link>
              <Link to={`/${user.role}/settings`}>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-200">
                  Settings
                </button>
              </Link>
              <button
                onClick={() => logout()}
                className="w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
