import React from "react";
import CategoryCard from "./CategoryCard";
import backgroundImage from "../../../assets/ThoeryPage/Images/roadSignss.jpg";

const Banner = () => {
  return (
    <>
      {/* Banner */}
      <section
        className="relative min-h-[35vh] md:min-h-[35vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
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
          Written Theory Questions
        </h2>
      </div>
      {/* Category Grid */}
      <section className="mt-8 my-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16 ">
          <CategoryCard image="graycar.png" label="Car Theory Questions" />
          <CategoryCard
            image="grayBike.png"
            label="Motorcycle Theory Questions"
          />
          <CategoryCard
            image="grayTracktor.png"
            label="Tracktor Theory Questions"
          />
          <CategoryCard
            image="grayLightBus.png"
            label="Light Bus Theory Questions"
          />
          <CategoryCard
            image="grayHeavyBus.png"
            label="Heavy Bus Theory Questions"
          />
          <CategoryCard image="grayTaxi.png" label="Taxi Theory Questions" />
        </div>
      </section>
      {/* Line below Cards */}
      <div className="text-start mt-20 relative">
        <hr className="border-t-4 border-gray-600" />
        <h2 className="text-lg font-semibold text-gray-700 absolute left-1/2 transform -translate-x-1/2 -top-3 bg-gray-50 px-2">
          Lessining Theory Questions
        </h2>
      </div>
      {/* Category Grid */}
      <section className="mt-8 my-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16 ">
          <CategoryCard
            image="grayCarWithSound.png"
            label="Car Theory Questions"
          />
          <CategoryCard
            image="grayBikeWithSound.png"
            label="Motorcycle Theory Questions"
          />
          <CategoryCard
            image="grayTracktorWithSound.png"
            label="Tracktor Theory Questions"
          />
          <CategoryCard
            image="grayLightBusWithSound.png"
            label="Light Bus Theory Questions"
          />
          <CategoryCard
            image="grayHeavyBus.png"
            label="Heavy Bus Theory Questions"
          />
          <CategoryCard image="grayTaxi.png" label="Taxi Theory Questions" />
        </div>
      </section>
    </>
  );
};

export default Banner;
