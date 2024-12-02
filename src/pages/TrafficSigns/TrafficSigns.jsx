import React from "react";
import backgroundImage from "../../assets/TrafficSigns/SideImage.jpg";
import Footer from "../../components/Footer";
import GuidanceSigns from "./constants/GuidanceSign";
import HelpfulSignals from "./constants/HelpingSigns";
import InquirySigns from "./constants/InquirySigns";
import RoadSurfaceSigns from "./constants/Signspaintedontheroadsurface";
import TrafficLightsSigns from "./constants/TrafficlightsandlanecontrolSigns";
import WarningSigns from "./constants/WarningSigns";
const TrafficSigns = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* TopBar */}
      <div className="mb-12">
        <section className="relative min-h-[60vh] md:min-h-[60vh] bg-cover bg-center">
          <div
            className={`h-full w-full absolute object-cover inset-0 transition-opacity duration-700`}
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
          {/* Overlay with opacity */}
          <div
            className="absolute inset-0 bg-black opacity-50" // This adds a black overlay with 50% opacity
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-4xl font-bold">SIGNS</h1>
          </div>
        </section>
      </div>

      {/* Content Container */}
      <div className="px-12">
        {/* Display Warning Signs */}
        {WarningSigns &&
          WarningSigns.map((category, index) => (
            <div key={index} className="mb-8">
              {/* Category Header */}
              <div className="bg-yellow-100 text-yellow-800 font-semibold text-center py-2 rounded">
                {category.name}
              </div>

              {/* Full-Width Grid of Signs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {category.signs &&
                  category.signs.map((sign, idx) => (
                    <div
                      key={sign.id}
                      className="bg-white shadow-md rounded-lg border border-gray-200 flex flex-col items-center transform transition-transform duration-300 hover:translate-y-[-10px] hover:shadow-xl"
                    >
                      {/* Header for Each Sign */}
                      <div className="bg-gray-100 text-gray-700 font-semibold text-center py-2 rounded-t-lg w-full">
                        {sign.label}
                      </div>

                      {/* Sign Image */}
                      <img
                        src={sign.img}
                        alt={sign.description}
                        className="mx-auto h-20 my-4"
                      />

                      {/* Footer for Each Sign */}
                      <div className="bg-gray-50 text-gray-600 text-sm text-center py-2 rounded-b-lg w-full">
                        {sign.description}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}

        {/* Display Guidance Signs */}
        {GuidanceSigns &&
          GuidanceSigns.map((category, index) => (
            <div key={index} className="mb-8">
              {/* Category Header */}
              <div className="bg-blue-100 text-blue-800 font-semibold text-center py-2 rounded">
                {category.name}
              </div>

              {/* Full-Width Grid of Signs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {category.signs &&
                  category.signs.map((sign, idx) => (
                    <div
                      key={sign.id}
                      className="bg-white shadow-md rounded-lg border border-gray-200 flex flex-col items-center transform transition-transform duration-300 hover:translate-y-[-10px] hover:shadow-xl"
                    >
                      {/* Header for Each Sign */}
                      <div className="bg-gray-100 text-gray-700 font-semibold text-center py-2 rounded-t-lg w-full">
                        {sign.label}
                      </div>

                      {/* Sign Image */}
                      <img
                        src={sign.img}
                        alt={sign.description}
                        className="mx-auto h-20 my-4"
                      />

                      {/* Footer for Each Sign */}
                      <div className="bg-gray-50 text-gray-600 text-sm text-center py-2 rounded-b-lg w-full">
                        {sign.description}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}

        {/* Display Inquiry Signs */}
        {InquirySigns &&
          InquirySigns.map((category, index) => (
            <div key={index} className="mb-8">
              {/* Category Header */}
              <div className="bg-green-100 text-green-800 font-semibold text-center py-2 rounded">
                {category.name}
              </div>

              {/* Full-Width Grid of Signs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {category.signs &&
                  category.signs.map((sign, idx) => (
                    <div
                      key={sign.id}
                      className="bg-white shadow-md rounded-lg border border-gray-200 flex flex-col items-center transform transition-transform duration-300 hover:translate-y-[-10px] hover:shadow-xl"
                    >
                      {/* Header for Each Sign */}
                      <div className="bg-gray-100 text-gray-700 font-semibold text-center py-2 rounded-t-lg w-full">
                        {sign.label}
                      </div>

                      {/* Sign Image */}
                      <img
                        src={sign.img}
                        alt={sign.description}
                        className="mx-auto h-20 my-4"
                      />

                      {/* Footer for Each Sign */}
                      <div className="bg-gray-50 text-gray-600 text-sm text-center py-2 rounded-b-lg w-full">
                        {sign.description}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}

        {/* Display Road Surface Signs */}
        {RoadSurfaceSigns &&
          RoadSurfaceSigns.map((category, index) => (
            <div key={index} className="mb-8">
              {/* Category Header */}
              <div className="bg-red-100 text-red-800 font-semibold text-center py-2 rounded">
                {category.name}
              </div>

              {/* Full-Width Grid of Signs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {category.signs &&
                  category.signs.map((sign, idx) => (
                    <div
                      key={sign.id}
                      className="bg-white shadow-md rounded-lg border border-gray-200 flex flex-col items-center transform transition-transform duration-300 hover:translate-y-[-10px] hover:shadow-xl"
                    >
                      {/* Header for Each Sign */}
                      <div className="bg-gray-100 text-gray-700 font-semibold text-center py-2 rounded-t-lg w-full">
                        {sign.label}
                      </div>

                      {/* Sign Image */}
                      <img
                        src={sign.img}
                        alt={sign.description}
                        className="mx-auto h-20 my-4"
                      />

                      {/* Footer for Each Sign */}
                      <div className="bg-gray-50 text-gray-600 text-sm text-center py-2 rounded-b-lg w-full">
                        {sign.description}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}

        {/* Display Traffic Lights Signs */}
        {TrafficLightsSigns &&
          TrafficLightsSigns.map((category, index) => (
            <div key={index} className="mb-8">
              {/* Category Header */}
              <div className="bg-purple-100 text-purple-800 font-semibold text-center py-2 rounded">
                {category.name}
              </div>

              {/* Full-Width Grid of Signs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {category.signs &&
                  category.signs.map((sign, idx) => (
                    <div
                      key={sign.id}
                      className="bg-white shadow-md rounded-lg border border-gray-200 flex flex-col items-center transform transition-transform duration-300 hover:translate-y-[-10px] hover:shadow-xl"
                    >
                      {/* Header for Each Sign */}
                      <div className="bg-gray-100 text-gray-700 font-semibold text-center py-2 rounded-t-lg w-full">
                        {sign.label}
                      </div>

                      {/* Sign Image */}
                      <img
                        src={sign.img}
                        alt={sign.description}
                        className="mx-auto h-20 my-4"
                      />

                      {/* Footer for Each Sign */}
                      <div className="bg-gray-50 text-gray-600 text-sm text-center py-2 rounded-b-lg w-full">
                        {sign.description}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}

        {/* Display Helpful Signals */}
        {HelpfulSignals &&
          HelpfulSignals.map((category, index) => (
            <div key={index} className="mb-8">
              {/* Category Header */}
              <div className="bg-teal-100 text-teal-800 font-semibold text-center py-2 rounded">
                {category.name}
              </div>

              {/* Full-Width Grid of Signs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {category.signs &&
                  category.signs.map((sign, idx) => (
                    <div
                      key={sign.id}
                      className="bg-white shadow-md rounded-lg border border-gray-200 flex flex-col items-center transform transition-transform duration-300 hover:translate-y-[-10px] hover:shadow-xl"
                    >
                      {/* Header for Each Sign */}
                      <div className="bg-gray-100 text-gray-700 font-semibold text-center py-2 rounded-t-lg w-full">
                        {sign.label}
                      </div>

                      {/* Sign Image */}
                      <img
                        src={sign.img}
                        alt={sign.description}
                        className="mx-auto h-20 my-4"
                      />

                      {/* Footer for Each Sign */}
                      <div className="bg-gray-50 text-gray-600 text-sm text-center py-2 rounded-b-lg w-full">
                        {sign.description}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TrafficSigns;
