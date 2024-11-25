import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const ProfileEditForm = ({
  handleSave,
  selectedImage,
  profilePicture,
  handleImageChange,
}) => {
  return (
    <>
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-7xl mx-auto">
          <header className="flex items-center justify-between border-b pb-4">
            <h2 className="text-2xl font-semibold">My Profile</h2>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-6 py-2 rounded-2xl font-semibold hover:bg-green-600 transition-all duration-300 relative group flex items-center justify-between w-40"
            >
              Save
              <span className="inline-block transform transition-transform duration-300 ease-in-out group-hover:translate-x-3">
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </button>
          </header>

          <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="flex flex-col">
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
                  <img
                    src={selectedImage || profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  className="mt-2 text-green-500"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  Change Photo
                </button>
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              {/* User Information Form */}
              <form>
                <div className="grid grid-cols-1 gap-4">
                  {/* Name Fields */}
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border rounded-md"
                        placeholder="Ahmad"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border rounded-md"
                        placeholder="Dweikat"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      className="mt-1 block w-full px-3 py-2 border rounded-md"
                      placeholder="********"
                    />
                    <button className="mt-2 text-green-500">
                      Change Password
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      className="mt-1 block w-full px-3 py-2 border rounded-md"
                      placeholder="test@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="mt-1 block w-full px-3 py-2 border rounded-md"
                      placeholder="0599123456"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Country
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border rounded-md"
                      placeholder="Palestine"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border rounded-md"
                      placeholder="Nablus"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Street
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border rounded-md"
                      placeholder="Amman Street"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Right Column */}
            <div className="flex flex-col">
              <div className="flex justify-end mb-4">
                <button className="bg-red-500 text-white px-4 py-1 rounded-2xl font-semibold hover:bg-red-600 transition-all duration-300 relative group flex items-center justify-between w-40">
                  Cancel
                  <span className="inline-block transform -translate-x-[6px] transition-transform duration-300 ease-in-out group-hover:translate-x-1">
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </button>
              </div>
              <form>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Gender
                    </label>
                    <select className="mt-1 block w-full px-3 py-2 border rounded-md">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date of Birth
                    </label>
                    <div className="flex space-x-2">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker />
                      </LocalizationProvider>{" "}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Payment Method
                    </label>
                    <select className="mt-1 block w-full px-3 py-2 border rounded-md">
                      <option>Credit Card</option>
                      <option>PayPal</option>
                      <option>Bank Transfer</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProfileEditForm;
