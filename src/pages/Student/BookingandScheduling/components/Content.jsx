import React from "react";
import img from "../components/images/test.jpg";
import Button from "@mui/material/Button";
import ScheduleSendOutlinedIcon from "@mui/icons-material/ScheduleSendOutlined";
const Content = () => {
  return (
    <div className="flex-1">
      <div className="max-w-screen-xl mx-auto">
        {/* Main Content */}
        <div className="relative">
          <img src={img} alt="home" className="w-full h-auto" />
          <h2 className="absolute inset-0 flex items-start justify-center pt-24 text-white text-3xl font-bold bg-black bg-opacity-50 opacity-0 animate-fade-in">
            Welcome to booking page
          </h2>
          <p className="absolute inset-0 flex items-start justify-center pt-36 text-white text-lg font-bold  opacity-0 animate-fade-in2">
            This is a booking you can schedule your lessons with us
          </p>
          <Button
            variant="contained"
            endIcon={<ScheduleSendOutlinedIcon />}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "120px", // Adjust as needed
              height: "auto", // Adjust as needed
              padding: "10px 20px", // For more button padding
            }}
          >
            Booking
          </Button>
        </div>

        <footer className="bg-red-400 text-white p-4 mt-auto">
          <div className="container mx-auto text-center">
            <p>
              &copy; {new Date().getFullYear()} Your Company Name. All rights
              reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Content;
