import React, { forwardRef } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import useTogglePassword from "../../../../hooks/useTogglePassword";

const InputField = forwardRef(
  (
    {
      type,
      placeholder,
      label,
      iconType,
      error,
      isConfirmPassword = false,
      ...props
    },
    ref
  ) => {
    const {
      showPassword,
      showConfirmPassword,
      togglePasswordVisibility,
      toggleConfirmPasswordVisibility,
    } = useTogglePassword();

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
            ref={ref}
            type={
              type === "password" && !currentPasswordVisibility
                ? "password"
                : "text"
            }
            placeholder={placeholder}
            className={`w-full border ${
              error ? "border-red-500" : "border-gray-300"
            } p-2 rounded-lg focus:ring-customGreen hover:border-customGreen`}
            {...props}
          />
          {/* Icons logic remains the same */}
          {iconType === "email" && (
            <span className="absolute right-3 top-2 text-gray-400">
              <EmailOutlinedIcon />
            </span>
          )}
          {/* ... other icons ... */}

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
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    );
  }
);

export default InputField;
