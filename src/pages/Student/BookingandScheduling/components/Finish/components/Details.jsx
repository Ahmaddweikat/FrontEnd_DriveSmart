import React, { useState } from "react";
import visa from "../../payment/components/images/visa.svg";
import mastercard from "../../payment/components/images/mastercard.svg";
import lessonImage from "../../TypePage/images/practial.jpeg";
const Details = () => {
  const [studentName, setStudentName] = useState("Ahmad Dweikat");
  const [studentId, setStudentId] = useState("1234");
  const [schoolName, setSchoolName] = useState("Al-Quds");
  const [typeOfLicence, setTypeOfLicence] = useState("Private");
  const [trainerName, setTrainerName] = useState("John Doe");
  const [typeOfBooking, setTypeOfBooking] = useState("Daily");
  const [paymentType, setPaymentType] = useState("Credit Card");

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-2 flex">
        {/* Left Section - Booking & Payment Details */}
        <div className="w-2/3 pr-8 border-r">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold">Checkout</h1>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Booking Details</h2>

            <div className="space-y-4">
              <div className="flex gap-x-16">
                <div className="flex items-center">
                  <span className="text-gray-600 font-semibold">
                    Student Name:
                  </span>
                  <span className="text-lg ml-2">{studentName}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 font-semibold">
                    Student ID:
                  </span>
                  <span className="text-lg ml-2">{studentId}</span>
                </div>
              </div>
              <div className="flex gap-x-32">
                <div className="flex items-center">
                  <span className="text-gray-600 font-semibold">
                    School Name:
                  </span>
                  <span className="text-lg ml-2">{schoolName}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 font-semibold">
                    License Type:
                  </span>
                  <span className="text-lg ml-2">{typeOfLicence}</span>
                </div>
              </div>
              <div className="flex gap-x-28">
                <div className="flex items-center">
                  <span className="text-gray-600 font-semibold">
                    Trainer Name:
                  </span>
                  <span className="text-lg ml-2">{trainerName}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 font-semibold">
                    Type of Booking:
                  </span>
                  <span className="text-lg ml-2">{typeOfBooking}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Payment Details</h2>
            <form>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Type of Payment
              </label>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-gray-800 font-medium">Credit Card</span>
                <img src={visa} alt="Visa" className="w-8" />
                <img src={mastercard} alt="Mastercard" className="w-8" />
              </div>

              <button className="w-full mt-6 bg-customGreen text-white font-semibold py-2 rounded hover:bg-green-600">
                Pay 1350₪
              </button>
            </form>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="w-1/3 pl-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              Your Bookin and appoinment
            </h2>
            <p className="text-sm text-gray-500">Lessons Booking</p>
          </div>
          {/* Order items */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Replace cube with an image */}
                <img
                  src={lessonImage}
                  alt="Lesson Icon"
                  className="w-12 h-12 rounded"
                />
                <div>
                  <p className="font-semibold">Practical Lesson</p>
                  <p className="text-sm text-gray-500">15 Lessons</p>
                </div>
              </div>
              <p>1350₪</p>
            </div>
          </div>
          {/* Order Summary */}
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <p>Lesson Price</p>
              <p>90₪</p>
            </div>
            <div className="flex justify-between mb-4">
              <p>Number of Lessons</p>
              <p>15</p>
            </div>
            <div className="flex justify-between font-semibold">
              <p>Total</p>
              <p>1350₪</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
