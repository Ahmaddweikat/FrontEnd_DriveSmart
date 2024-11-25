import React from "react";
import Terms from "./Terms"; // Import the Terms component

const Footer = () => {
  return (
    <footer className="mt-8 p-4 bg-gray-200 text-center">
      <Terms label="I agree to the terms and conditions" />
      <p className="text-xs text-gray-600">
        &copy; {new Date().getFullYear()} Driving School Complex. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
