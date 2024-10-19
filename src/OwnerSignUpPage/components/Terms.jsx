import React from "react";

const Terms = ({ label }) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <input type="checkbox" id="terms" className="form-checkbox" />
      <label htmlFor="terms" className="text-sm">
        {label}
      </label>
    </div>
  );
};

export default Terms;
