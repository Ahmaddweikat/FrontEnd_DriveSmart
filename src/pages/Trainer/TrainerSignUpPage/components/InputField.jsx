import React from "react";

const InputField = ({
  label,
  type = "text",
  placeholder,
  isTextArea = false,
  rows = 4, // For textarea rows
  min,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          rows={rows}
        ></textarea>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          min={min} // For number inputs
          onKeyDown={(e) => {
            // Prevent negative numbers and certain keys
            if (type === "number" && (e.key === "-" || e.key === "e")) {
              e.preventDefault();
            }
          }}
        />
      )}
    </div>
  );
};

export default InputField;
