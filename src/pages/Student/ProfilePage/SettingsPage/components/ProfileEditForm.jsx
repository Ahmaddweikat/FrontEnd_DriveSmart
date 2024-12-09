import { faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useState } from "react";
import Spinner from "./../../../../../components/Spinner";
import useGetStudentProfile from "./../../ProfileInfoPage/hooks/useGetStudentProfile";
import useChangeProfilePicture from "../hooks/useChangeProfilePicture";

const ProfileEditForm = ({ handleSave, selectedImage, handleImageChange }) => {
  const { data: user, isLoading, error } = useGetStudentProfile();
  const { mutate: changeProfilePicture } = useChangeProfilePicture();
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    // console.log("🚀 ~ handleProfilePictureChange ~ file:", file);
    if (file) {
      console.log("🚀 ~ handleProfilePictureChange ~ file:", file);

      setNewProfilePicture(file);
      // handleImageChange(event);
      await handleSaveProfilePicture();
    }
  };

  const handleSaveProfilePicture = async () => {
    if (newProfilePicture) {
      console.log(
        "🚀 ~ handleSaveProfilePicture ~ newProfilePicture:",
        newProfilePicture
      );
      await changeProfilePicture(newProfilePicture);
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading profile information</div>;

  return (
    <>
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-7xl mx-auto">
          <header className="flex items-center justify-between border-b pb-4">
            <h2 className="text-2xl font-semibold">My Profile</h2>
            <button
              onClick={() => {
                handleSave();
                handleSaveProfilePicture();
              }}
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
                  <Avatar
                    alt={user.name}
                    src={selectedImage || user.profilePicture}
                    sx={{ width: 128, height: 128 }}
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
                  onChange={handleProfilePictureChange}
                />
              </div>
              {/* User Information Form */}
              <form>
                <div className="grid grid-cols-1 gap-4">
                  {/* Name Fields - Non-editable */}
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border rounded-md bg-gray-100"
                        placeholder="Ahmad"
                        disabled
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border rounded-md bg-gray-100"
                        placeholder="Dweikat"
                        disabled
                      />
                    </div>
                  </div>

                  {/* ID Number - Non-editable */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      ID Number
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border rounded-md bg-gray-100"
                      placeholder="123456789"
                      disabled
                    />
                  </div>

                  {/* Blood Group */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Blood Group
                    </label>
                    <select className="mt-1 block w-full px-3 py-2 border rounded-md">
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
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
          </section>
        </div>
      </div>
    </>
  );
};

export default ProfileEditForm;
