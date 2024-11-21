import React from "react";

const FilterPanel = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ width: "300px" }}
    >
      <div className="p-4">
        <h2 className="text-lg font-bold">Filter Options</h2>
        <button
          className="text-red-500 hover:text-red-700 mt-4"
          onClick={onClose}
        >
          Close
        </button>
        {/* Add your filter options here */}
      </div>
    </div>
  );
};

export default FilterPanel;
