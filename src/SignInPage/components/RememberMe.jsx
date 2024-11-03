import React from "react";

function RememberMe() {
  return (
    <div className="flex justify-between items-center mb-4">
      <label className="flex items-center">
        <input
          type="checkbox"
          className="form-checkbox text-green-600 h-4 w-4 rounded-sm"
        />
        <span className="ml-2 text-sm text-gray-700">Remember me</span>
      </label>
    </div>
  );
}

export default RememberMe;
