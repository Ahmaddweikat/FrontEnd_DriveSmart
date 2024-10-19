import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const ChangePassword = ({ setActivePage }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password should be at least 8 characters long.");
      return;
    }

    // Handle password change logic here, like API call

    setSuccess("Password changed successfully!");
    setError("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Breadcrumb />

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
          <header className="flex items-center justify-between border-b pb-4">
            <h2 className="text-2xl font-semibold">Change Password</h2>
            {/* Back to Profile Button */}
            <button
              onClick={() => setActivePage("profile")}
              className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600"
            >
              Back to Profile
            </button>
          </header>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {error && (
              <div className="bg-red-100 text-red-600 p-4 rounded-md">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-100 text-green-600 p-4 rounded-md">
                {success}
              </div>
            )}

            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full px-3 py-2 border rounded-md"
                placeholder="********"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full px-3 py-2 border rounded-md"
                placeholder="********"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full px-3 py-2 border rounded-md"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="bg-white px-4 py-2">
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        <li>
          <a href="#" className="hover:text-gray-700">
            Settings
          </a>
        </li>
        <li>
          <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3 mx-1" />
        </li>
        <li>
          <span className="font-medium text-gray-700">Change Password</span>
        </li>
      </ol>
    </nav>
  );
}

export default ChangePassword;
