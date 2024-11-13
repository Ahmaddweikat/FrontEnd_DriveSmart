import React, { forwardRef } from "react";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import useImageSlider from "../../hooks/HomePage/ImageSlider/useImageSlider";
import sliderContent from "./constants/ImageSlider/sliderContent";
import Dropdown from "./Dropdown";

const ImageSlider = forwardRef(({ isExpanded }, ref) => {
  const { active, animating, showText, changeSlide, handleButtonClick } =
    useImageSlider(sliderContent);

  return (
    <div ref={ref} className="h-screen grid">
      <div className="relative">
        <div
          className="h-[650px] relative"
          style={{ width: isExpanded ? "1275px" : "1518px" }}
        >
          {sliderContent.map((slide, i) => (
            <img
              src={slide.img}
              key={i}
              alt={`Slide ${i + 1}`}
              className={`h-full w-full absolute object-cover inset-0 transition-opacity duration-700 ${
                i === active && !animating
                  ? "opacity-100 animate-slide-enter"
                  : "opacity-0 animate-slide-exit"
              } brightness-50`} // Added brightness-50 here
            />
          ))}
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          {showText && (
            <div className="text-center animate-fadeInUp">
              <h1 className="text-6xl font-bold">
                {sliderContent[active].name}
              </h1>
              <p className="mt-1.5 text-2xl text-red-600">
                {sliderContent[active].desc}
              </p>
            </div>
          )}
        </div>

        {/* Top Container for Line and Text */}
        <div className="absolute top-14 left-52 w-3/4 flex items-center">
          <hr className="border-t border-white w-10/12 mx-auto" />
          <span className="text-white text-sm ml-4 absolute top-[-35px] right-8">
            <AccessTimeIcon
              style={{ width: 17, height: 17, marginBottom: 2, marginRight: 4 }}
            />
            Works Day: Saturday - Thursday 8 AM - 8 PM
          </span>
        </div>

        {/* Numbered Buttons for Image Navigation */}
        <div className="absolute bottom-[15%] left-[10%] transform -translate-x-1/2 flex space-x-4">
          {sliderContent.map((_, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(index)}
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition duration-300 ${
                index === active
                  ? "bg-customGreen text-white scale-150"
                  : "bg-white text-black"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Arrow Buttons for Image Navigation */}
        <div className="absolute bottom-[15%] right-[5%] transform -translate-x-1/2 flex space-x-4">
          <button
            onClick={() => changeSlide("prev")}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition duration-300 hover:bg-green-700"
          >
            <ArrowBackIosOutlinedIcon />
          </button>
          <button
            onClick={() => changeSlide("next")}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition duration-300 hover:bg-green-700"
          >
            <ArrowForwardIosOutlinedIcon />
          </button>
        </div>

        {/* Logo and Buttons Container */}
        <div className="absolute top-4 left-32 flex items-center mt-16">
          <div className="flex space-x-8">
            {/* Home Button */}
            <button className="text-white hover:text-customGreen flex items-center font-medium text-sm mx-4">
              <HomeIcon className="h-4 w-4 mr-2" />
              Home
            </button>

            {/* Theory Questions Dropdown */}
            <Dropdown
              title="Theory Questions"
              icon={<HelpCenterIcon className="h-4 w-4 mr-2" />}
              items={[
                "Motorcycle Theory Questions",
                "Car Theory Questions",
                "Tractor Theory Questions",
                "Light Charge Theory Questions",
                "Heavy Charge Theory Questions",
                "Taxi Charge Theory Questions",
              ]}
            />

            {/* Theory Learning Dropdown */}
            <Dropdown
              title="Theory Learning"
              icon={<AutoStoriesIcon className="h-4 w-4 mr-2" />}
              items={[
                "Steps to study theory",
                "Traffic signals study",
                "Study of traffic signals on the street",
                "Study of the theory book",
              ]}
            />

            {/* Inquiry About Dropdown */}
            <Dropdown
              title="Inquiry About"
              icon={<InfoIcon className="h-4 w-4 mr-2" />}
              items={[
                "Theory exam results",
                "Practical exam results",
                "License Requirements",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default ImageSlider;
