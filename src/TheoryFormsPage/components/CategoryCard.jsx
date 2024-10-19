import React from "react";

const CategoryCard = ({ label, number }) => (
  <div className="relative bg-customGreen shadow-md rounded-lg overflow-hidden h-14 w-96 flex items-center justify-center m-1">
    {/* Label Section */}
    <h3 className="text-white text-lg font-bold absolute left-1/2 transform -translate-x-1/2">
      {label}
    </h3>

    {/* White Circle with Number */}
    <div className="flex items-center justify-center bg-white text-black rounded-full h-7 w-7 text-base font-bold absolute right-16">
      {number}
    </div>

    {/* Bottom Brown and Gray Stripes */}
    <div className="absolute bottom-0 left-0 w-full">
      <div className="h-1 bg-orange-700"></div> {/* Brown stripe */}
      <div className="h-1 bg-gray-500"></div> {/* Gray stripe */}
    </div>
  </div>
);

export default CategoryCard;
