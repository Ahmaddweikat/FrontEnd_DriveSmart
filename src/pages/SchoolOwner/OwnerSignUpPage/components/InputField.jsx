import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faUnlock,
  faIdCard,
  faHome,
  faPhone,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons"; // Import necessary icons

const InputField = ({
  label,
  type = "text",
  placeholder,
  isTextArea = false,
  rows = 4, // For textarea rows
  min,
  fieldProps, // Accepting fieldProps object
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          rows={rows}
          {...fieldProps} // Bind the fieldProps
        ></textarea>
      ) : (
        <div className="relative">
          <input
            type={type === "password" && !showPassword ? "password" : "text"}
            placeholder={placeholder}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            min={min} // For number inputs
            {...fieldProps} // Bind the fieldProps
            onKeyDown={(e) => {
              // Prevent negative numbers and certain keys
              if (type === "number" && (e.key === "-" || e.key === "e")) {
                e.preventDefault();
              }
            }}
          />
          {/* Show/Hide Password Button */}
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
            >
              <FontAwesomeIcon icon={showPassword ? faUnlock : faLock} />
            </button>
          )}
        </div>
      )}
      {/* Optional icon rendering based on input type */}
      {type === "text" && (
        <span className="absolute right-3 top-8 text-gray-400">
          <FontAwesomeIcon icon={faUser} />
        </span>
      )}
      {type === "email" && (
        <span className="absolute right-3 top-8 text-gray-400">
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
      )}
      {type === "tel" && (
        <span className="absolute right-3 top-8 text-gray-400">
          <FontAwesomeIcon icon={faPhone} />
        </span>
      )}
      {type === "text" && placeholder === "School Address" && (
        <span className="absolute right-3 top-8 text-gray-400">
          <FontAwesomeIcon icon={faHome} />
        </span>
      )}
      {type === "text" && placeholder === "Business License Number" && (
        <span className="absolute right-3 top-8 text-gray-400">
          <FontAwesomeIcon icon={faClipboard} />
        </span>
      )}
      {type === "text" && placeholder === "Owner Name" && (
        <span className="absolute right-3 top-8 text-gray-400">
          <FontAwesomeIcon icon={faIdCard} />
        </span>
      )}
    </div>
  );
};

export default InputField;
