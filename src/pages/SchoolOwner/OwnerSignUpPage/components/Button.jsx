import React from "react";

const Button = ({ text }) => {
  return (
    <button
      type="submit"
      className="bg-customRed text-black font-bold py-2 rounded-md w-full 
               transition duration-300 ease-in-out 
               transform hover:bg-red-600 hover:scale-105  focus:outline-none focus:ring-2"
    >
      {text}
    </button>
  );
};

export default Button;
