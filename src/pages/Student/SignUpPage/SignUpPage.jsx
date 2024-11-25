import React, { useState } from "react";
import { Link } from "react-router-dom";
import BackgroundIllustration from "../../../assets/LogupPage/Images/sideImage2.jpg";
import Backgoround from "../../../assets/LogupPage/Images/sideImage.jpeg";
import Logo from "../../../assets/DRIVESMART.png";
import InputField from "./components/InputFields";
import GenderSection from "./components/GenderSection";
function SignUpPage() {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative overflow-hidden">
      {/* Blurred Background Overlay */}
      <div
        className="absolute left-0 top-0 h-full bg-cover bg-center backdrop-blur-md"
        style={{
          backgroundImage: `url(${Backgoround})`,
          filter: "blur(6px)",
          width: "36.7%",
        }}
      ></div>

      {/* Main Container */}
      <div className="relative flex w-4/5 max-w-7xl h-4/5 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Panel: Side Image */}
        <div
          className="w-1/3 hidden lg:flex bg-cover bg-center z-10"
          style={{ backgroundImage: `url(${BackgroundIllustration})` }}
        ></div>

        {/* Right Panel: Form Card */}
        <div className="w-full lg:w-2/3 p-6 md:p-10">
          {/* Logo */}
          <div className="mb-4">
            <img src={Logo} alt="Logo" className="h-16" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800 mb-5">
            Registration
          </h1>

          {/* Form */}
          <form className="space-y-3">
            {/* Grid Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="relative">
                <InputField
                  type="text"
                  placeholder="Please enter your first name"
                  label="First Name"
                  iconType="person"
                />
              </div>

              {/* Last Name */}
              <div className="relative">
                <InputField
                  type="text"
                  placeholder="Please enter your last name"
                  label="Last Name"
                  iconType="person"
                />
              </div>
              {/* Email */}
              <div className="relative">
                <InputField
                  type="email"
                  placeholder="Please enter your email"
                  label="Email"
                  iconType="email"
                />
              </div>

              {/* Repeat Email */}
              <div className="relative">
                <InputField
                  type="email"
                  placeholder="Please repeat your email"
                  label="Email"
                  iconType="email"
                />
              </div>
              {/* City */}
              <div>
                <InputField
                  type="city"
                  placeholder="Please enter the city"
                  label="City"
                  iconType="city"
                />
              </div>
              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Phone number
                </label>
                <div className="flex items-center border border-gray-300 p-2 rounded-lg h-10 focus:ring-customGreen hover:border-customGreen">
                  <img
                    src={`https://flagcdn.com/w20/ps.png`}
                    alt="Palestine Flag"
                    className="mr-2"
                  />
                  <span className="text-gray-600">+970</span>
                  <input
                    type="text"
                    placeholder="Enter phone number ex: 591234567"
                    className="w-full border-0 p-2 ml-2 rounded-lg h-8 focus:ring-customGreen hover:border-customGreen"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    maxLength={9}
                    required
                  />
                </div>
              </div>
              {/* Password */}
              <div>
                <InputField
                  type="password"
                  placeholder="Please enter your password"
                  label="Password"
                />
              </div>
              {/* Confirm Password */}
              <div>
                <InputField
                  type="password"
                  placeholder="Confirm your password"
                  label="Confirm Password"
                  isConfirmPassword={true} // Mark it as confirm password
                />
              </div>
            </div>

            {/* Gender Section */}
            <div className="text-left">
              <GenderSection />
            </div>

            {/* Submit Button */}
            <button className="w-full py-2 bg-customRed text-black font-normal p-3 hover:bg-red-600 rounded-lg shadow-md">
              Next Step
            </button>
          </form>

          {/* Sign-in Link */}
          <p className="mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-customGreen hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
