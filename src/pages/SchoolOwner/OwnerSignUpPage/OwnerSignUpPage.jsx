import React, { useState } from "react";
import InputField from "./components/InputField";
import CheckboxGroup from "./components/CheckBoxGroup";
import Button from "./components/Button";
import Footer from "./components/Footer";
import SideImage from "./components/images/p.jpg";

const OwnerSignUpPage = () => {
  const [ownerName, setOwnerName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [businessLicense, setBusinessLicense] = useState("");
  const [yearsInBusiness, setYearsInBusiness] = useState("");
  const [numberOfInstructors, setNumberOfInstructors] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [vehicleTypes, setVehicleTypes] = useState([]);

  const vehicleOptions = ["Car", "Truck", "Motorcycle", "Bus"];
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
          {/* Centered vertically */}
          <h2 className="text-2xl font-semibold text-center mb-4">
            DRIVING SCHOOL COMPLEX
          </h2>
          <h2 className="text-2xl font-semibold text-center mb-4">
            OWNER REGISTER
          </h2>

          {/* Owner Name */}
          <InputField
            label="Owner Name"
            placeholder="Ahmad Dweikat"
            fieldProps={{
              value: ownerName,
              onChange: (e) => setOwnerName(e.target.value),
            }}
          />

          {/* School Name */}
          <InputField
            label="School Name"
            placeholder="Driving School"
            fieldProps={{
              value: schoolName,
              onChange: (e) => setSchoolName(e.target.value),
            }}
          />

          {/* Email */}
          <InputField
            label="Email"
            placeholder="test@example.com"
            type="email"
            fieldProps={{
              value: email,
              onChange: (e) => setEmail(e.target.value),
            }}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Password..."
            fieldProps={{
              value: password,
              onChange: (e) => setPassword(e.target.value),
            }}
          />

          {/* Confirm Password */}
          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password..."
            fieldProps={{
              value: confirmPassword,
              onChange: (e) => setConfirmPassword(e.target.value),
            }}
          />
          {/* Phone Number */}
          <InputField
            label="Phone Number"
            placeholder="123-456-7890"
            type="tel"
            fieldProps={{
              value: phone,
              onChange: (e) => setPhone(e.target.value),
            }}
          />

          {/* School Address */}
          <InputField
            label="School Address"
            placeholder="123 School St"
            fieldProps={{
              value: schoolAddress,
              onChange: (e) => setSchoolAddress(e.target.value),
            }}
          />

          {/* Business License Number */}
          <InputField
            label="Business License Number"
            placeholder="BL123456"
            fieldProps={{
              value: businessLicense,
              onChange: (e) => setBusinessLicense(e.target.value),
            }}
          />

          {/* Years in Business */}
          <InputField
            label="Years in Business"
            type="number"
            placeholder="0"
            min="0"
            fieldProps={{
              value: yearsInBusiness,
              onChange: (e) => setYearsInBusiness(e.target.value),
            }}
          />

          {/* Number of Instructors */}
          <InputField
            label="Number of Instructors"
            type="number"
            placeholder="0"
            min="0"
            fieldProps={{
              value: numberOfInstructors,
              onChange: (e) => setNumberOfInstructors(e.target.value),
            }}
          />
          <CheckboxGroup
            label="Vehicle Types Offered"
            options={vehicleOptions}
            selectedOptions={vehicleTypes}
            onChange={setVehicleTypes} // Update vehicleTypes state
          />

          {/* Password */}

          {/* Submit Button */}
          <Button text="Sign Up" />
          {/* Footer with Terms */}

          {/* Footer with Terms */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default OwnerSignUpPage;
