import React from "react";
import TopBar from "../../../components/HomeTopBar/TopBar";
import backgroundImage from "../../../assets/GetALicense/Image/Linecess.jpeg";
import licenseInfo from "./constant/licenseInfo";
import Footer from "../../../components/Footer";
const GetALicense = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* TopBar */}
      <div className="mb-12">
        <TopBar />
        <section className="relative min-h-[60vh] md:min-h-[60vh] bg-cover bg-center">
          <div
            className="h-full w-full absolute object-cover inset-0 transition-opacity duration-700"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>

          {/* Black overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Title */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-5xl font-bold">Get A License</h1>
          </div>
        </section>

        {/* Content Sections */}
        {licenseInfo.map((license, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 w-11/12 sm:w-3/4 lg:w-1/2 mx-auto mt-6"
          >
            <h1 className="text-xl font-semibold text-gray-800 text-center mb-6">
              {license.title}
            </h1>

            {/* Icon and Text Container */}
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
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default GetALicense;
