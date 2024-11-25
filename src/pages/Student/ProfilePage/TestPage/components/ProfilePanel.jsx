import React from "react";
import { tests } from "../constant/tests";

const ProfilePanel = () => {
  const totalTestsTaken = tests.length;
  const totalTestsPassed = tests.filter((test) => test.score > 24).length;
  const passRate =
    totalTestsTaken > 0
      ? ((totalTestsPassed / totalTestsTaken) * 100).toFixed(1)
      : 0;
  return (
    <>
      {/* Profile Panel */}
      <div className="bg-white rounded-lg shadow-lg p-6 relative text-center">
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 bg-gray-200 rounded-full overflow-hidden">
            <img src="/path/to/profile-picture.jpg" alt="Profile" />
          </div>
          <h2 className="mt-4 text-xl font-semibold">Ahmad Dweikat</h2>
          <p className="text-gray-500  mb-20">Student ID: 123456</p>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex justify-around bg-white text-gray-500 px-4 py-2 rounded-md">
          <p className="text-sm font-medium">
            Total Tests Taken: {totalTestsTaken}
          </p>
          <p className="text-sm font-medium ">
            Total Tests Passed: {totalTestsPassed}
          </p>
          <p className="text-sm font-medium">Pass Rate: {passRate}%</p>
        </div>
      </div>
    </>
  );
};

export default ProfilePanel;
