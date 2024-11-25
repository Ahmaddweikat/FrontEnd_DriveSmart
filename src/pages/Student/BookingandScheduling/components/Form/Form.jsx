import React from "react";
import SideBar from "../SideBar";
import img from "../../../../../assets/BookingAndScheduling/Images/test.jpg";
import Data from "./components/Data";

const Form = () => {
  return (
    <div className="flex">
      <SideBar />
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-screen-xl mx-auto">
          {/* Image with Heading */}
          <div className="relative">
            <img
              src={img}
              alt="honpme"
              className="w-full h-auto filter-green"
            />
            <h2 className="absolute inset-0 flex items-start justify-start pt-8 pl-6 text-white text-3xl font-bold bg-black bg-opacity-50 opacity-0 animate-fade-in">
              Booking and Scheduling
            </h2>
            <div className="absolute inset-0 p-12 mt-6 animate-fade-in2">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <Data
                  studentName="Ahmad Dweikat"
                  studentId="12345"
                  schoolName="Al-Quds"
                  typeOfLicence="Private"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
