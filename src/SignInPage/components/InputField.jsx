import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import ForgetPassword from "./ForgetPassword";

function InputField({ type, placeholder, label }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">
      {/* Container for margin */}
      <div className="flex justify-between items-center mb-1">
        <label
          className="block font-serif font-medium text-base text-gray-700 text-left"
          htmlFor={placeholder}
        >
          {label}
        </label>
        {type === "password" && <ForgetPassword />}
      </div>
      <div className="relative">
        <input
          type={type === "password" && !showPassword ? "password" : "text"}
          placeholder={placeholder}
          className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-600 hover:border-customGreen"
          id={placeholder}
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
            onClick={() => setShowPassword(!showPassword)}
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
