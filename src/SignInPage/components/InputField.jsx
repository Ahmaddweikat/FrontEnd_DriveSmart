import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

function InputField({ type, placeholder, label }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mb-6">
      {" "}
      {/* Container for margin */}
      <label
        className="block text-sm font-medium text-gray-700 mb-1 text-left" // Ensure label is left-aligned
        htmlFor={placeholder} // Ensure label is associated with the input
      >
        {label} {/* Display the label text */}
      </label>
      <div className="relative">
        {" "}
        {/* Wrapper for the input and icons */}
        <input
          type={type === "password" && !showPassword ? "password" : "text"}
          placeholder={placeholder}
          className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          id={placeholder} // Set id for accessibility
          required
        />
        {type === "email" && (
          <span className="absolute right-3 top-3 text-gray-400">
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
        )}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            className="absolute right-3 top-3 text-gray-400"
          >
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </button>
        )}
      </div>
    </div>
  );
}

export default InputField;
