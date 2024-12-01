import React from "react";

function GenderSection() {
  return (
    <div className="text-left">
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Gender
      </label>
      <div className="flex space-x-4 w-full border border-gray-300 p-2 rounded-lg focus:ring-customGreen hover:border-customGreen">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="gender"
            value="male"
            className="form-radio h-4 w-4 text-customGreen"
            required
          />
          <span className="text-gray-600">Male</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="gender"
            value="female"
            className="form-radio h-4 w-4 text-customGreen"
            required
          />
          <span className="text-gray-600">Female</span>
        </label>
      </div>
    </div>
  );
}

export default GenderSection;
