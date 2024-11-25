// src/components/InputField.js
import React from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import useTogglePassword from "../../../../hooks/useTogglePassword";

function InputField({
  type,
  placeholder,
  label,
  iconType,
  value,
  onChange,
  maxLength,
  isConfirmPassword = false, // Add a prop to distinguish between password and confirm password
}) {
  const {
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = useTogglePassword();

  // Determine which visibility toggle to use
  const isPasswordField = type === "password" && !isConfirmPassword;
  const currentPasswordVisibility = isPasswordField
    ? showPassword
    : showConfirmPassword;
  const toggleVisibility = isPasswordField
    ? togglePasswordVisibility
    : toggleConfirmPasswordVisibility;

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={
            type === "password" && !currentPasswordVisibility
              ? "password"
              : "text"
          }
          placeholder={placeholder}
          className="w-full border border-gray-300 p-2 rounded-lg focus:ring-customGreen hover:border-customGreen"
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          required
        />
        {/* Icons */}
        {iconType === "email" && (
          <span className="absolute right-3 top-2 text-gray-400">
            <EmailOutlinedIcon />
          </span>
        )}
        {iconType === "person" && (
          <span className="absolute right-3 top-2 text-gray-400">
            <PersonOutlineOutlinedIcon />
          </span>
        )}
        {iconType === "city" && (
          <span className="absolute right-3 top-2 text-gray-400">
            <LocationCityOutlinedIcon />
          </span>
        )}
        {iconType === "phone" && (
          <span className="absolute right-3 top-2 text-gray-400">
            <PhoneOutlinedIcon />
          </span>
        )}
        {/* Password visibility toggle */}
        {type === "password" && (
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-3 top-2 text-gray-400"
          >
            {currentPasswordVisibility ? (
              <VisibilityOutlinedIcon />
            ) : (
              <VisibilityOffOutlinedIcon />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default InputField;
