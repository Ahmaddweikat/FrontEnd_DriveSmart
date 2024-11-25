import React from "react";

function InfoField({ label, value }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <p className="mt-1 text-base text-gray-900">{value}</p>
    </div>
  );
}

export default InfoField;
