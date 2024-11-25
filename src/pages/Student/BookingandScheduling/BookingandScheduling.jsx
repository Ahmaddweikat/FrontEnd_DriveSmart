import React from "react";
import SideBar from "./components/SideBar";
import Content from "./components/Content";

const BookingandScheduling = () => {
  return (
    <div className="min-h-screen bg-customGrayBG flex">
      <SideBar />
      {/* Main Content Area */}
      <Content />
    </div>
  );
};

export default BookingandScheduling;
