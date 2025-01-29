import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import HorizontalSplitOutlinedIcon from "@mui/icons-material/HorizontalSplitOutlined";
import { Skeleton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { Link } from "react-router-dom";
import useGetProfile from "../../../../../hooks/useGetProfile";
import useAuthStore from "../../../../../store/auth.store";
import NotificationsPanel from "./components/NotificationsPanel";
import useDeleteFCMToken from "../../../../../hooks/useDeleteFCMToken";

function TopBar({ toggleSidebar }) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleProfileDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  const { user, logout } = useAuthStore();
  const { mutate: deleteFCMToken } = useDeleteFCMToken();
  const { data, isLoading, error } = useGetProfile();

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
                onClick={() => {
                  logout();
                  deleteFCMToken();
                }}
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
