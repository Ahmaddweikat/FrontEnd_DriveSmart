import React from "react";
import backgroundImage from "../../../../assets/GetALicense/Image/Linecess.jpeg";

const HeaderSection = () => {
  return (
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
  );
};

export default HeaderSection;
