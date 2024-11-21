import React from "react";

const CategoryCard = ({ image, label }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden group">
    {/* Image Section */}
    <div className="flex justify-center bg-white p-6 relative">
      <img
        src={getImage(image)}
        alt={label}
        className="h-24 object-contain transition-transform duration-700 ease-in-out group-hover:animate-move group-hover:filter group-hover:brightness-0 group-hover:contrast-100"
      />
    </div>
    {/* Label Section */}
    <div className="bg-customGreen text-white text-center py-3">
      <h3 className="text-lg font-bold">{label}</h3>
    </div>
  </div>
);

export default CategoryCard;

const images = require.context(
  "../../../assets/ThoeryPage/Images",
  false,
  /\.(png|jpe?g|svg)$/
);

function getImage(name) {
  return images(`./${name}`);
}
