import React from "react";
import InfoField from "./InfoField";
import Avatar from "@mui/material/Avatar";
import Spinner from "../../../../../components/Spinner";
import useGetStudentProfile from "../hooks/useGetStudentProfile";
import useStudentProgressStore from "../../../../../store/studentProgress.store";

const ProfileInformation = () => {
  const { data: user, isLoading, error } = useGetStudentProfile();
  const { theoreticalExamStatus } = useStudentProgressStore();

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading profile information</div>;

  return (
    <>
      {/* Profile Information */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-7xl mx-auto">
          {/* Updated Header - Center Profile Picture */}
          <header className="flex flex-col items-center mb-6">
            <div className="w-28 h-28 bg-gray-200 rounded-full overflow-hidden mb-4">
              <Avatar
                alt={user.name}
                src={user.profilePicture}
                sx={{ width: 112, height: 112 }}
              />
            </div>
            <div className="text-center">
              <h2 className="mt-2 text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-500">Student ID: {user.idNumber}</p>
            </div>
          </header>

          {/* Personal Information with Border */}
          <section className="mb-8 border rounded-lg p-6">
            <h3 className="text-xl font-semibold">Personal Information</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoField label="Name" value={user.name} />
              <InfoField label="Email Address" value={user.email} />
              <InfoField label="Phone" value={user.phone} />
              <InfoField label="License Type" value={user.licenseType} />
              <InfoField label="Blood Group" value={user.bloodGroup} />
              <InfoField
                label="Date Of Birth"
                value={new Date(user.dateOfBirth).toLocaleDateString()}
              />
            </div>
          </section>

          {/* New Driving Examinations Status Section */}
          <section className="mb-8 border rounded-lg p-6">
            <h3 className="text-xl font-semibold">
              Driving Examinations Status
            </h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoField
                label="Theoretical Exam Status"
                value={theoreticalExamStatus || "Not Attempted"}
                // Add a color indicator based on status
                className={`${
                  theoreticalExamStatus === "Passed"
                    ? "text-green-600"
                    : theoreticalExamStatus === "Failed"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              />
              <InfoField
                label="Practical Exam Status"
                value={user.practicalExamStatus || "Not Attempted"}
                className={`${
                  user.practicalExamStatus === "Passed"
                    ? "text-green-600"
                    : user.practicalExamStatus === "Failed"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              />
            </div>
          </section>

          {/* Address Section with Border */}
          <section className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold">Address</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoField label="Country" value="Palestine" />
              <InfoField label="City" value={user.city} />
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
