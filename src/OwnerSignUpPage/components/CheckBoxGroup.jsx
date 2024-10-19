import React from "react";

const CheckboxGroup = ({ label, options, selectedOptions, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {options.map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={(e) => {
                const newSelectedOptions = e.target.checked
                  ? [...selectedOptions, option]
                  : selectedOptions.filter((o) => o !== option);
                onChange(newSelectedOptions);
              }}
              className="ml-2"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
