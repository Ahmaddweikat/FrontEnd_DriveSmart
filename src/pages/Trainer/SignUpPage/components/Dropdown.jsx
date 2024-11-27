import React from "react";

const Dropdown = ({ label, options }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300">
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
