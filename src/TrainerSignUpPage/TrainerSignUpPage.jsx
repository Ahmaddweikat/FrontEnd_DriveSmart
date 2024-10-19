import React from "react";
import InputField from "./components/InputField";
import CheckboxGroup from "./components/CheckBoxGroup";
import Dropdown from "./components/Dropdown";
import Button from "./components/Button";
import Footer from "./components/Footer";
// import BackgroundImage from "./components/images/SideImage.jpg";
import SideImage from "./components/images/2.jpg";

const TrainerSignUpPage = () => {
  const vehicleOptions = ["Car", "Truck", "Motorcycle", "Bus"];
  const availabilityOptions = [
    "Select your availability",
    "Morning",
    "Afternoon",
    "Evening",
  ];
  return (
    <div className="h-screen flex">
      {/* Full-height flex container */}
      <div className="flex w-full bg-white rounded-lg shadow-lg overflow-hidden max-w-[full] mx-auto m-auto">
        {/* Side Image Section */}
        <div className="hidden md:block w-1/2">
          <img
            src={SideImage}
            alt="Side"
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 flex flex-col p-8 space-y-6 justify-center">
          {" "}
          {/* Centered vertically */}
          <h2 className="text-2xl font-semibold text-center mb-4">
            DRIVING SCHOOL COMPLEX
          </h2>
          <h2 className="text-2xl font-semibold text-center mb-4">
            TRAINER REGISTER
          </h2>
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="First Name" placeholder="Ahmad" />
            <InputField label="Last Name" placeholder="Dweikat" />
          </div>
          {/* Email */}
          <InputField
            label="Email"
            placeholder="test@example.com"
            type="email"
          />
          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Password"
              type="password"
              placeholder="Password..."
            />
            <InputField
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password..."
            />
          </div>
          {/* Driving Instructor License Number */}
          <InputField
            label="Driving Instructor License Number"
            placeholder="DIL123456"
          />
          {/* Years of Experience */}
          <InputField
            label="Years of Experience"
            type="number"
            placeholder="0"
            min="0"
          />
          {/* Vehicle Types */}
          <CheckboxGroup label="Vehicle Types" options={vehicleOptions} />
          {/* Availability */}
          <Dropdown label="Availability" options={availabilityOptions} />
          {/* Bio */}
          <InputField
            label="Bio"
            placeholder="Tell us about your experience and teaching style"
            isTextArea={true} // Pass the prop to render a textarea
          />
          {/* Submit Button */}
          <Button text="Sign Up" />
          {/* Footer with Terms */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default TrainerSignUpPage;
