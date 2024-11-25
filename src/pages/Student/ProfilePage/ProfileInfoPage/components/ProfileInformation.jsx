import React from "react";
import InfoField from "./InfoField";
import Avatar from "@mui/material/Avatar";

const ProfileInformation = () => {
  return (
    <>
      {" "}
      {/* Profile Information */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-7xl mx-auto">
          {/* Updated Header - Center Profile Picture */}
          <header className="flex flex-col items-center mb-6">
            <div className="w-28 h-28 bg-gray-200 rounded-full overflow-hidden mb-4">
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 112, height: 112 }}
              />
            </div>
            <div className="text-center">
              <h2 className="mt-2 text-xl font-semibold">Ahmad Dweikat</h2>
              <p className="text-gray-500">Student ID: 123456</p>
            </div>
          </header>

          {/* Personal Information with Border */}
          <section className="mb-8 border rounded-lg p-6">
            <h3 className="text-xl font-semibold">Personal Information</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoField label="First Name" value="Ahmad" />
              <InfoField label="Last Name" value="Dweikat" />
              <InfoField label="Email Address" value="test@example.com" />
              <InfoField label="Phone" value="0599123456" />
              <InfoField label="Gender" value="Male" />
              <InfoField label="Date Of Birth" value="27/07/2002" />
            </div>
          </section>

          {/* Address Section with Border */}
          <section className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold">Address</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoField label="Country" value="Palestine" />
              <InfoField label="City/State" value="Nablus" />
              <InfoField label="Street" value="Amman ST" />
              <InfoField label="Near to" value="Qadri Toqan School" />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProfileInformation;
