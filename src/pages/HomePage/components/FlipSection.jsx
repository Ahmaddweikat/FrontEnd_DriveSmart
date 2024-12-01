import React from "react";
import { licenseSections } from "../constants/FlipSection/licenseSections"; // Adjust the path as needed
const FlipSection = () => {
  return (
    <div className="flex justify-center items-center p-4 perspective">
      <div className="flex space-x-4">
        {licenseSections.map((section) => (
          <div
            key={section.id}
            className="relative w-72 h-72 preserve-3d bg-white clip-octa rotate-360 transition-all duration-300 group hover:bg-customGreen border-2 border-transparent group-hover:border-customGreen"
            style={{
              width: "320px",
            }}
          >
            <div className="absolute w-full h-full backface-hidden bg-transparent rounded-lg shadow-2xl p-6 flex flex-col items-center justify-center transition-all duration-300">
              <div className="text-customGreen group-hover:text-white transition-all duration-300">
                {section.icon}
              </div>

              <h2 className="text-2xl font-semibold text-customGreen mt-4 border-b-2 border-customGreen group-hover:text-white group-hover:border-white transition-all duration-300">
                {section.title}
              </h2>
              <p className="text-customGreen mt-8 group-hover:text-white transition-all duration-300">
                {section.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlipSection;
