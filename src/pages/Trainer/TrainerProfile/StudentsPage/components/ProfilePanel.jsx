import React from "react";

const ProfilePanel = ({ totalLicenses, activeStudents }) => {
  const totalStudents = 25;
  const studentRate = totalStudents > 0 ? ((activeStudents / totalStudents) * 100).toFixed(1) : 0;

  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg p-6 relative text-center">
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 bg-gray-200 rounded-full overflow-hidden">
            <img src="/path/to/profile-picture.jpg" alt="Profile" />
          </div>
          <h2 className="mt-4 text-xl font-semibold">Ahmad Dweikat</h2>
          <p className="text-gray-500 mb-20">Trainer ID: TR-789456</p>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex justify-between bg-white text-gray-500 px-4 py-2 rounded-md">
          <p className="text-sm font-medium">
            Types of Licenses: {totalLicenses}
          </p>
          <p className="text-sm font-medium">
            Number of Students: {totalStudents}
          </p>
          <p className="text-sm font-medium">
            Experience: 6 years
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;
