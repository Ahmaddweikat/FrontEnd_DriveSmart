import React from "react";
import { cards } from "./constants/FlipCard/cards"; // Adjust the import path as necessary

const FlipCard = () => {
  return (
    <div className="flex justify-center items-center p-4 perspective">
      <div className="flex space-x-4">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="relative h-80 transform transition-transform duration-500 preserve-3d hover:rotate-y-180"
            style={{
              width: "320px", // Keep the width constant for all cards
            }}
          >
            {/* Front Side */}
            <div className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
              {card.icon}
              <h2 className="text-2xl font-semibold text-customGreen">
                {card.title}
              </h2>
            </div>

            {/* Back Side */}
            <div className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-lg p-6 rotate-y-180 flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold text-customGreen">
                {card.additionalInfo}
              </h3>
              <p className="text-customGray mt-2 text-center">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlipCard;
