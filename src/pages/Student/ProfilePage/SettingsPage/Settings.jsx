import React from "react";
import ProfileEditForm from "./components/ProfileEditForm";
import useProfilePicture from "./hooks/useProfilePicture";

const Settings = () => {
  // const { profilePicture, selectedImage, handleImageChange, handleSave } =
  //   useProfilePicture();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div className="flex-1 flex flex-col">
        <ProfileEditForm
          // profilePicture={profilePicture}
          // selectedImage={selectedImage}
          // handleImageChange={handleImageChange}
          // handleSave={handleSave}
        />
      </div>
    </div>
  );
};

export default Settings;
