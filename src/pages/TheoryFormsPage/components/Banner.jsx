import React from "react";
import CategoryGrid from "./CategoryGrid";

const Banner = () => {
  return (
    <>
      {/* Banner */}
      <section
        className="relative min-h-[35vh] md:min-h-[35vh] bg-cover bg-center"
        //   style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 flex justify-center items-center h-full">
          {/* <h1 className="text-white text-4xl font-bold">
              Exams Thoery Questions{" "}
            </h1> */}
        </div>
      </section>
      {/* Line Above Cards */}
      <div className="text-start mt-20 relative">
        <hr className="border-t-4 border-gray-600" />
        <h2 className="text-lg font-semibold text-gray-700 absolute left-1/2 transform -translate-x-1/2 -top-3 bg-gray-50 px-2">
          Theory Questions Models
        </h2>
      </div>
      {/* Category Grid */}
      <section className="mt-8 my-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <CategoryGrid />
        </div>
      </section>
    </>
  );
};

export default Banner;
