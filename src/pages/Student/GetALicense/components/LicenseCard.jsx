import React from "react";

const LicenseCard = ({ license }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-11/12 sm:w-3/4 lg:w-1/2 mx-auto mt-6">
      <h1 className="text-xl font-semibold text-gray-800 text-center mb-6">
        {license.title}
      </h1>
      <div className="flex items-start gap-6">
        {/* List of Requirements */}
        <ul className="text-gray-700 text-left list-disc list-inside flex-grow text-base">
          {license.requirements.map((req, idx) => (
            <li key={idx}>{req}</li>
          ))}
        </ul>
        {/* Icon */}
        <div className="flex-shrink-0 text-customGreen mt-0">
          <img
            src={license.icon}
            alt={license.iconAlt}
            className="w-32 h-32"
            style={{
              filter:
                "invert(26%) sepia(89%) saturate(300%) hue-rotate(100deg) brightness(95%) contrast(110%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LicenseCard;
