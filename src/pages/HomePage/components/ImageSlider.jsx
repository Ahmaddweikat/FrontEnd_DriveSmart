import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import React, { forwardRef } from "react";
import sliderContent from "../constants/ImageSlider/sliderContent";
import useImageSlider from "../hooks/ImageSlider/useImageSlider";
import Dropdown from "./Dropdown";

const ImageSlider = forwardRef(({ isExpanded }, ref) => {
  const { active, animating, showText, changeSlide, handleButtonClick } =
    useImageSlider(sliderContent);

  return (
    <div ref={ref} className="h-screen w-full">
      <div className="relative w-full">
        <div className="h-[650px] relative w-full">
          {sliderContent.map((slide, i) => (
            <img
              src={slide.img}
              key={i}
              alt={`Slide ${i + 1}`}
              className={`h-full w-full absolute object-cover inset-0 transition-opacity duration-700 ${
                i === active && !animating
                  ? "opacity-100 animate-slide-enter"
                  : "opacity-0 animate-slide-exit"
              } brightness-50`}
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
      </div>
    </div>
  );
});

export default ImageSlider;
