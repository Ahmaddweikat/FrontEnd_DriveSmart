import { useState, useCallback, useEffect } from "react";

const useScrollManagement = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showTopBar, setShowTopBar] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const showThreshold = 655; // Adjust threshold to 650px
    const showTopThreshold = 300;

    setShowBackToTop(scrollY > showThreshold);
    setShowTopBar(scrollY > showTopThreshold);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { showBackToTop, showTopBar };
};

export default useScrollManagement;
