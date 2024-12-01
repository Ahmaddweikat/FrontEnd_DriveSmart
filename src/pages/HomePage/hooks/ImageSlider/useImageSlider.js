// useImageSlider.js
import { useState, useEffect } from "react";

const useImageSlider = (sliderContent) => {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 1000); // Show text after 1 second

    return () => clearTimeout(timer); // Cleanup timer on component unmount or active change
  }, [active]);

  const changeSlide = (direction) => {
    setAnimating(true);
    setShowText(false); // Hide text before changing the slide
    setTimeout(() => {
      setActive((prev) => {
        const newIndex = direction === "next" ? prev + 1 : prev - 1;
        return (newIndex + sliderContent.length) % sliderContent.length; // Wrap around
      });
      setAnimating(false);
      setTimeout(() => {
        setShowText(true); // Show text after a delay
      }, 1000); // Delay for 1 second before showing the text
    }, 500); // Match the transition duration
  };

  const handleButtonClick = (index) => {
    setShowText(false); // Hide text while changing slides
    setActive(index); // Set the active index immediately

    // Show text after 1 second
    setTimeout(() => {
      setShowText(true); // Show text after 1 second
    }, 1000); // 1000 milliseconds
  };

  return {
    active,
    animating,
    showText,
    changeSlide,
    handleButtonClick,
  };
};

export default useImageSlider;
