import React from "react";

const CheckBoxGroup = ({ label, options }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {options.map((option, index) => (
          <label key={index} className="flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckBoxGroup;
