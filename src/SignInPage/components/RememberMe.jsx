import React from "react";

function RememberMe() {
  return (
    <div className="flex justify-between items-center mb-4">
      <label className="flex items-center">
        <input
          type="checkbox"
          className="form-checkbox text-blue-600 h-4 w-4"
        />
        <span className="ml-2 text-sm text-gray-600">Remember me</span>
      </label>
      <a
        href="/forgot-password"
        className="text-sm text-blue-600 hover:underline"
      >
        Forgot password?
      </a>
    </div>
  );
}

export default RememberMe;
