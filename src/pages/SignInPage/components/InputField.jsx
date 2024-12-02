import React from "react";
import ForgetPassword from "./ForgetPassword";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import useTogglePassword from "../../../hooks/useTogglePassword";

function InputField({ type, placeholder, label, ...otherProps }) {
  const { showPassword, togglePasswordVisibility } = useTogglePassword();

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label
          className="block font-medium text-base text-gray-700 text-left"
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
          className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-customGreen hover:border-customGreen"
          id={placeholder}
          required
          {...otherProps}
        />
        {type === "email" && (
          <span className="absolute right-3 top-3 text-gray-400">
            <EmailOutlinedIcon />
          </span>
        )}
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-3 text-gray-400"
          >
            {showPassword ? (
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
