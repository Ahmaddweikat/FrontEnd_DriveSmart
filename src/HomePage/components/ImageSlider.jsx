import { useState, useRef, useEffect } from "react";
import img1 from "../Images/kenburns1.jpg";
import img2 from "../Images/2.jpg";
import img3 from "../Images/3.jpg";
import img4 from "../Images/4.jpg";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

const ImageSlider = ({ isExpanded }) => {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(0);

  // Refs
  const contentRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const nameRef = useRef(null); // Initialize as a ref

  const sliderContent = [
    { img: img1, name: "Wanda Maximoff" },
    { img: img2, name: "The Hulk" },
    { img: img3, name: "Iron Man" },
    { img: img4, name: "Black Panther" },
  ];

  const Slide = (type) => {
    let local;
    if (type === "next") {
      local = active + 1;
      setActive(local >= sliderContent.length ? 0 : local);
    }
    if (type === "prev") {
      local = active - 1;
      setActive(local < 0 ? sliderContent.length - 1 : local);
    }
    setPrev(active);
  };

  useEffect(() => {
    // Check if refs are defined before accessing style
    if (contentRef.current && prevRef.current && nextRef.current) {
      // Set initial styles
      contentRef.current.style.bottom = "-100%";
      prevRef.current.style.left = "-10%";
      nextRef.current.style.right = "-10%";

      // Update name after a brief delay
      setTimeout(() => {
        if (nameRef.current) {
          nameRef.current.innerText = sliderContent[active].name;
        }
        if (contentRef.current && prevRef.current && nextRef.current) {
          contentRef.current.style.bottom = "0%";
          prevRef.current.style.left = "0%";
          nextRef.current.style.right = "0%";
        }
      }, 1000); // Adjust timeout as necessary
    } else {
      console.error("Refs are not set properly:", {
        contentRef: contentRef.current,
        prevRef: prevRef.current,
        nextRef: nextRef.current,
      });
    }
  }, [active]);

  return (
    <div className="h-screen grid place-items-center">
      <div className="relative shadow-lg overflow-hidden">
        <div
          className="h-[500px] relative mt-8"
          style={{
            width: isExpanded ? "1275px" : "1500px",
          }}
        >
          {sliderContent.map((slide, i) => (
            <img
              src={slide.img}
              key={i}
              alt="slideImg"
              className={`h-full w-full absolute object-cover inset-0 duration-[2.5s] ease-out transition-[clip-path] ${
                i === active ? "clip-visible" : "clip-hidden"
              }`}
              style={{
                clipPath:
                  i === active
                    ? "ellipse(14000px 750px at 0% 0%)"
                    : "ellipse(0 0 at 0% 0%)",
                opacity: i === active ? 1 : 0,
              }}
            />
          ))}
          <img
            src={sliderContent[prev].img}
            alt="previmg"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <button
            id="back"
            ref={prevRef}
            onClick={() => Slide("prev")}
            className="w-12 h-12 ml-24 absolute left-5 top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out bg-gray-900 text-white rounded-full hover:bg-blue-600"
          >
            <ArrowBackIosOutlinedIcon />
          </button>
          <button
            id="forward"
            ref={nextRef}
            onClick={() => Slide("next")}
            className="w-12 h-12 mr-24 absolute right-5 top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out bg-gray-900 text-white rounded-full hover:bg-blue-600"
          >
            <ArrowForwardIosOutlinedIcon />
          </button>
          {/* Additional button with image background */}
          <div
            className="absolute tp-rightarrow tparrows zeus noSwipe"
            style={{
              top: "50%",
              left: "100%",
              transform: "translateY(-50%) translateX(-160%)",
              visibility: "hidden", // Adjust visibility based on active slide
              opacity: 0, // Adjust opacity based on active slide
              transition: "visibility 0s, opacity 0.5s linear", // Smooth transition
            }}
          >
            <div className="tp-title-wrap">
              <div
                className="tp-arr-imgholder w-12 h-12 rounded-full bg-cover"
                style={{
                  backgroundImage: `url(${sliderContent[active].img})`, // Use active slide image
                }}
                onClick={() => console.log("Image Button Clicked!")} // Handle click event
              />
            </div>
          </div>
        </div>

        <div
          className="text-[aliceblue] absolute w-full z-10 text-center backdrop-blur-[2px] duration-[1s] px-0 py-[15px] left-0 bottom-0 bg-[#ffffff22]"
          ref={contentRef}
        >
          <h1 ref={nameRef} className="text-2xl font-bold">
            {sliderContent[0].name}
          </h1>
          <p className="mt-1.5 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
            porro.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
