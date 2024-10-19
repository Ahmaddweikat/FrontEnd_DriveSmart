import React from "react";
import backgroundImage from "./images/SideImage.jpg";

const SignUpBackgorund = () => {
  return (
    <div
      className="h-full bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    ></div>
  );
};

export default SignUpBackgorund;
