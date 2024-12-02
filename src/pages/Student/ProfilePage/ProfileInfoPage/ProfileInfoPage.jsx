import React from "react";
import ProfileInformation from "./components/ProfileInformation";

const ProfileInfoPage = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div className="flex-1 flex flex-col">
        <ProfileInformation />
      </div>
    </div>
  );
};

export default ProfileInfoPage;
