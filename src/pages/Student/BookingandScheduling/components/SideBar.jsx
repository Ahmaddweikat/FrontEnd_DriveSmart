import React, { useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PlayLessonOutlinedIcon from "@mui/icons-material/PlayLessonOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import Button from "@mui/material/Button";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

const SideBar = () => {
  const [activePage, setActivePage] = useState("home");

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <div className="min-h-screen bg-customGrayBG flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white text-customGreen p-4 h-full flex flex-col">
        <nav className="flex-grow">
          <h2 className="text-xl font-semibold mb-8">Navigation</h2>
          <ul className="space-y-6">
            <li
              onClick={() => handlePageChange("home")}
              className={`mb-4 flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                activePage === "home"
                  ? "bg-customGreen text-white font-semibold"
                  : "hover:text-customGreen"
              }`}
            >
              <HomeOutlinedIcon />
              <a href="#home" className="ml-4">
                Home
              </a>
            </li>
            <li
              onClick={() => handlePageChange("lesson")}
              className={`mb-4 flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                activePage === "lesson"
                  ? "bg-customGreen text-white font-semibold"
                  : "hover:text-customGreen"
              }`}
            >
              <PlayLessonOutlinedIcon />
              <a href="#about" className="ml-4">
                Lesson Type
              </a>
            </li>
            <li
              onClick={() => handlePageChange("booking")}
              className={`mb-4 flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                activePage === "booking"
                  ? "bg-customGreen text-white font-semibold"
                  : "hover:text-customGreen"
              }`}
            >
              <BorderColorOutlinedIcon />
              <a href="#about" className="ml-4">
                Booking and Scheduling
              </a>
            </li>
            <li
              onClick={() => handlePageChange("payment")}
              className={`mb-4 flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                activePage === "payment"
                  ? "bg-customGreen text-white font-semibold"
                  : "hover:text-customGreen"
              }`}
            >
              <PaymentOutlinedIcon />
              <a href="#about" className="ml-4">
                Payment Method
              </a>
            </li>
            <li
              onClick={() => handlePageChange("finish")}
              className={`mb-4 flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                activePage === "finish"
                  ? "bg-customGreen text-white font-semibold"
                  : "hover:text-customGreen"
              }`}
            >
              <CheckCircleOutlineOutlinedIcon />
              <a href="#about" className="ml-4">
                Finish
              </a>
            </li>
          </ul>
        </nav>
        <Button
          className="text-white border-none bg-transparent mt-4"
          startIcon={<KeyboardBackspaceOutlinedIcon />}
        >
          Back to school page
        </Button>
      </aside>
    </div>
  );
};

export default SideBar;
