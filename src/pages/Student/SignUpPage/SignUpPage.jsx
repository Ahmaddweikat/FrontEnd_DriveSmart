import React, { useState } from "react";
import BackgroundIllustration from "../../../assets/LogupPage/Images/sideImage2.jpg";
import Backgoround from "../../../assets/LogupPage/Images/sideImage.jpeg";
import Logo from "../../../assets/DRIVESMART.png";
import InputField from "./components/InputFields";
import GenderSection from "./components/GenderSection";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// Custom Hooks
import useModal from "./hooks/useModal";
import useStep from "./hooks/useStep";
import useFileUpload from "./hooks/useFileUpload";

function SignUpPage() {
  const { isModalOpen, imageSrc, openModal, closeModal } = useModal();
  const { currentStep, handleNextStep, handleBackStep } = useStep();
  const { uploadedFile, fileContent, handleFileUpload } = useFileUpload();
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full bg-cover bg-center backdrop-blur-md"
        style={{
          backgroundImage: `url(${Backgoround})`,
          filter: "blur(6px)",
          width: "36.7%",
        }}
      ></div>

      <div className="relative flex w-4/5 max-w-7xl h-4/5 bg-white rounded-lg shadow-lg overflow-hidden">
        <div
          className="w-1/3 hidden lg:flex bg-cover bg-center z-10"
          style={{ backgroundImage: `url(${BackgroundIllustration})` }}
        ></div>

        <div className="w-full lg:w-2/3 p-6 md:p-10">
          <div className="mb-4">
            <img src={Logo} alt="Logo" className="h-16" />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-5">
            Registration
          </h1>

          <form className="space-y-3">
            {currentStep === 1 && (
              <div className="transition-opacity duration-500 ease-in-out opacity-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <InputField
                      type="text"
                      placeholder="Please enter your first name"
                      label="First Name"
                      iconType="person"
                      required
                    />
                  </div>

                  <div className="relative">
                    <InputField
                      type="text"
                      placeholder="Please enter your last name"
                      label="Last Name"
                      iconType="person"
                      required
                    />
                  </div>

                  <div className="relative">
                    <InputField
                      type="email"
                      placeholder="Please enter your email"
                      label="Email"
                      iconType="email"
                      required
                    />
                  </div>

                  <div className="relative">
                    <InputField
                      type="email"
                      placeholder="Please repeat your email"
                      label="Email"
                      iconType="email"
                      required
                    />
                  </div>

                  <div>
                    <InputField
                      type="city"
                      placeholder="Please enter the city"
                      label="City"
                      iconType="city"
                      required
                    />
                  </div>

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

                  <div>
                    <InputField
                      type="password"
                      placeholder="Please enter your password"
                      label="Password"
                      required
                    />
                  </div>

                  <div>
                    <InputField
                      type="password"
                      placeholder="Confirm your password"
                      label="Confirm Password"
                      isConfirmPassword={true}
                      required
                    />
                  </div>
                </div>

                <div className="text-left">
                  <GenderSection />
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full py-2 bg-customRed text-black font-normal p-3 hover:bg-red-600 rounded-lg shadow-md"
                >
                  Next Step
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="transition-opacity duration-500 ease-in-out opacity-100 h-96">
                <FormControl fullWidth>
                  <InputLabel id="blood-type-label">Blood Type</InputLabel>
                  <Select
                    labelId="blood-type-label"
                    id="blood-type-select"
                    label="Blood Type"
                    required
                  >
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value="O">O</MenuItem>
                    <MenuItem value="O-">O-</MenuItem>
                    <MenuItem value="AB">AB</MenuItem>
                    <MenuItem value="AB-">AB-</MenuItem>
                  </Select>
                </FormControl>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Upload Image for your processing
                  </label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    className="w-full p-2 border rounded-md"
                    onChange={handleFileUpload}
                    required
                  />
                </div>

                {fileContent && uploadedFile.type.startsWith("image/") && (
                  <div className="mt-4">
                    <img
                      src={fileContent}
                      alt="Uploaded"
                      className="mt-2 max-w-xs h-52 mx-auto cursor-pointer"
                      onClick={() => openModal(fileContent)} // Open modal on image click
                    />
                  </div>
                )}

                <div className="flex justify-between mt-2">
                  <button
                    type="button"
                    onClick={handleBackStep}
                    className="py-2 px-4 bg-gray-300 text-black font-normal rounded-lg hover:bg-gray-400 "
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="py-2 px-4 bg-customRed text-black font-normal rounded-lg hover:bg-red-600"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Modal to display the image */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal} // Close modal when clicked outside
        >
          <div className="bg-white p-4 rounded-lg shadow-lg relative">
            <span
              onClick={closeModal}
              className="absolute top-2 right-2 text-xl cursor-pointer"
            >
              &times;
            </span>
            <img
              src={imageSrc}
              alt="Modal Content"
              className="max-w-screen-sm max-h-[100vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUpPage;
