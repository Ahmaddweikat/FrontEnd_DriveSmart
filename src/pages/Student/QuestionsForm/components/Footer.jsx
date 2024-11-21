import React from "react";

const Footer = () => {
  return (
    <footer className="bg-customGray text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <h3 href="#" className="hover:underline">
            Privacy Policy
          </h3>
          <h3 href="#" className="hover:underline">
            Terms of Service
          </h3>
          <h3 href="#" className="hover:underline">
            Contact Us
          </h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
