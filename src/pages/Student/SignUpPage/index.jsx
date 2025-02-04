import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import Logo from "../../../assets/DRIVESMART.png";
// import Backgoround from "../../../assets/LogupPage/Images/sideImage.jpeg";
// import BackgroundIllustration from "../../../assets/LogupPage/Images/sideImage2.jpg";
// import GenderSection from "./components/GenderSection";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useSchoolRegistrationStore from "./../../../store/schoolRegistration.store";
import InputField from "./components/InputFields";
import useFileUpload from "./hooks/useFileUpload";
import useFileUploadMutation from "./hooks/useFileUploadMutation";
import useModal from "./hooks/useModal";
import useStep from "./hooks/useStep";
import useStudentRegistration from "./hooks/useStudentRegistration";
import { step1Schema, step2Schema } from "./schemas/registerStudentSchema";
import useVerificationStore from "../../../store/verification.store";
import SuccessModal from "./../../../components/modals/SuccessModal";
import ErrorModal from "./../../../components/modals/ErrorModal";

const schoolData = {
  name: "Smart Drive School",
  description:
    "Premier driving school with over 15 years of experience in providing quality driver education. We focus on safety, confidence, and comprehensive training.",
  email: "contact@smartdrive.com",
  phone: "+970 59-123-4567",
  address: "123 Main Street, Nablus",
  rating: 4.8,
};

const license = {
  type: "Class B - Manual Transmission",
  duration: "3 months",
  price: "₪2,500",
  features: [
    "28 theoretical lessons",
    "30 practical driving hours",
    "First aid course included",
    "Traffic signs handbook",
    "Practice tests package",
    "Flexible scheduling",
  ],
};

// TODO: needs to know the gearbox
function SignUpPage() {
  const selectedSchool = useSchoolRegistrationStore(
    (state) => state.selectedSchool
  );
  const selectedLicense = useSchoolRegistrationStore(
    (state) => state.selectedLicense
  );
  const { setEmail } = useVerificationStore();

  const navigate = useNavigate();
  const studentRegistration = useStudentRegistration();
  const fileUploadMutation = useFileUploadMutation();

  useEffect(() => {
    if (!selectedSchool || !selectedLicense) {
      navigate("/schools");
    }
  }, [selectedSchool, selectedLicense, navigate]);

  const { isModalOpen, imageSrc, openModal, closeModal } = useModal();
  const { currentStep, handleNextStep, handleBackStep } = useStep();
  const { uploadedFile, fileContent, handleFileUpload } = useFileUpload();

  //TODO: needs global state management to handle registration to get school data, license data, and gearbox data

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(currentStep === 1 ? step1Schema : step2Schema),
  });

  const [errorModalState, setErrorModalState] = useState({
    isOpen: false,
    message: "",
  });

  const [successModalState, setSuccessModalState] = useState({
    isOpen: false,
    message: "",
  });

  const onSubmit = async (data) => {
    if (currentStep === 1) {
      handleNextStep();
    } else {
      try {
        const step1Data = getValues();
        const completeFormData = {
          name: `${step1Data.firstName} ${step1Data.lastName}`,
          email: step1Data.email,
          password: step1Data.password,
          city: step1Data.city,
          phone: step1Data.phoneNumber,
          bloodGroup: data.bloodType,
          idNumber: parseInt(data.studentId),
          licenseType: selectedLicense,
          schoolId: selectedSchool.id,
        };

        const response = await studentRegistration.mutateAsync(
          completeFormData
        );

        if (uploadedFile) {
          await fileUploadMutation.mutateAsync({
            file: uploadedFile,
            ownerId: response.id,
          });
        }

        setSuccessModalState({
          isOpen: true,
          message:
            "Registration successful! Please check your email for a verification code.",
        });

        setEmail(step1Data.email);
      } catch (error) {
        setErrorModalState({
          isOpen: true,
          message:
            error.response?.data?.message ||
            "An error occurred during registration",
        });
      }
    }
  };

  if (selectedSchool || selectedLicense)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 relative overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-cover bg-center backdrop-blur-md"
          style={{
            backgroundImage: `url(${selectedSchool.profilePicture})`,
            filter: "blur(6px)",
            width: "36.7%",
          }}
        ></div>
        <div className="relative flex w-4/5 max-w-7xl h-4/5 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="w-1/3 hidden lg:flex flex-col bg-gray-50 p-8 z-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {selectedSchool.name}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700">
                    School Information
                  </h3>
                  <p className="text-gray-600">{selectedSchool.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Contact</h3>
                  <p className="text-gray-600">Email: {selectedSchool.email}</p>
                  <p className="text-gray-600">Phone: {selectedSchool.phone}</p>
                  <p className="text-gray-600">
                    Address: {selectedSchool.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-700 mb-4">
                Selected License Details
              </h3>
              <div className="space-y-2">
                <p className="text-gray-600">Type: {selectedLicense}</p>
                {/* <p className="text-gray-600">Duration: {license.duration}</p> */}
                {/* <p className="text-gray-600">Price: {license.price}</p> */}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/3 p-6 md:p-10">
            <div className="mb-4">
              <img src={Logo} alt="Logo" className="h-16" />
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-5">
              Registration
            </h1>

            {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-3"> */}
            {currentStep === 1 && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div className="transition-opacity duration-500 ease-in-out opacity-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <InputField
                          {...field}
                          type="text"
                          placeholder="Please enter your first name"
                          label="First Name"
                          iconType="person"
                          error={errors.firstName?.message}
                        />
                      )}
                    />

                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <InputField
                          {...field}
                          type="text"
                          placeholder="Please enter your last name"
                          label="Last Name"
                          iconType="person"
                          error={errors.lastName?.message}
                        />
                      )}
                    />

                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <InputField
                          {...field}
                          type="email"
                          placeholder="Please enter your email"
                          label="Email"
                          iconType="email"
                          error={errors.email?.message}
                        />
                      )}
                    />

                    <Controller
                      name="city"
                      control={control}
                      render={({ field }) => (
                        <InputField
                          {...field}
                          type="text"
                          placeholder="Please enter your city"
                          label="City"
                          iconType="location"
                          error={errors.city?.message}
                        />
                      )}
                    />

                    <Controller
                      name="phoneNumber"
                      control={control}
                      render={({ field }) => (
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
                              {...field}
                              maxLength={9}
                            />
                          </div>
                          {errors.phoneNumber && (
                            <span className="text-red-500 text-sm">
                              {errors.phoneNumber.message}
                            </span>
                          )}
                        </div>
                      )}
                    />

                    <Controller
                      name="gender"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <div className="text-left">
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Gender
                          </label>
                          <div className="flex space-x-4 w-full border border-gray-300 p-2 rounded-lg focus:ring-customGreen hover:border-customGreen">
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                value="male"
                                checked={value === "male"}
                                onChange={onChange}
                                defaultChecked
                                className="form-radio h-4 w-4 text-customGreen"
                              />
                              <span className="text-gray-600">Male</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                value="female"
                                checked={value === "female"}
                                onChange={onChange}
                                className="form-radio h-4 w-4 text-customGreen"
                              />
                              <span className="text-gray-600">Female</span>
                            </label>
                          </div>
                          {errors.gender && (
                            <span className="text-red-500 text-sm">
                              {errors.gender.message}
                            </span>
                          )}
                        </div>
                      )}
                    />

                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <InputField
                          {...field}
                          type="password"
                          placeholder="Please enter your password"
                          label="Password"
                          iconType="lock"
                          error={errors.password?.message}
                        />
                      )}
                    />

                    <Controller
                      name="confirmPassword"
                      control={control}
                      render={({ field }) => (
                        <InputField
                          {...field}
                          type="password"
                          placeholder="Please confirm your
                        password"
                          label="Confirm Password"
                          iconType="lock"
                          error={errors.confirmPassword?.message}
                          isConfirmPassword
                        />
                      )}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-2 font-normal p-3 rounded-lg shadow-md bg-customGreen text-white hover:bg-green-600"
                  >
                    Next Step
                  </button>
                </div>
              </form>
            )}

            {currentStep === 2 && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div className="transition-opacity duration-500 ease-in-out opacity-100 h-96">
                  <Controller
                    name="bloodType"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.bloodType}>
                        <InputLabel>Blood Type</InputLabel>
                        <Select {...field} label="Blood Type">
                          <MenuItem value="A+">A+</MenuItem>
                          <MenuItem value="A-">A-</MenuItem>
                          <MenuItem value="B+">B+</MenuItem>
                          <MenuItem value="B-">B-</MenuItem>
                          <MenuItem value="AB+">AB+</MenuItem>
                          <MenuItem value="AB-">AB-</MenuItem>
                          <MenuItem value="O+">O+</MenuItem>
                          <MenuItem value="O-">O-</MenuItem>
                        </Select>
                        {errors.bloodType && (
                          <Typography color="error" variant="caption">
                            {errors.bloodType.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                  <Controller
                    name="studentId"
                    control={control}
                    render={({ field }) => (
                      <InputField
                        {...field}
                        type="text"
                        placeholder="Please enter your student ID"
                        label="Student ID"
                        iconType="badge"
                        maxLength={9}
                        error={errors.studentId?.message}
                      />
                    )}
                  />

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Upload Image or PDF
                    </label>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      className="w-full p-2 border rounded-md"
                      onChange={handleFileUpload}
                      required
                    />
                  </div>
                  {uploadedFile && (
                    <button
                      type="button"
                      onClick={() => openModal(fileContent)}
                      className="mt-4 w-full py-2 bg-customGreen text-white font-normal rounded-lg hover:bg-green-600 transition-colors"
                    >
                      View Uploaded{" "}
                      {uploadedFile?.type.startsWith("image/")
                        ? "Image"
                        : "PDF"}
                    </button>
                  )}

                  <div className="flex justify-between mt-2">
                    <button
                      type="button"
                      onClick={handleBackStep}
                      className="py-2 px-4 bg-gray-300 text-black font-normal rounded-lg hover:bg-gray-400"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="py-2 px-4 bg-customGreen text-white font-normal rounded-lg hover:bg-green-600"
                    >
                      {studentRegistration.isPending ||
                      fileUploadMutation.isPending
                        ? "Registering..."
                        : "Submit Registration"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
        {/* Modal to display the image */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
            onClick={closeModal}
          >
            <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-4xl max-h-[90vh] animate-modal-enter">
              <span
                onClick={closeModal}
                className="absolute top-2 right-2 text-xl cursor-pointer bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full"
              >
                &times;
              </span>
              {uploadedFile?.type.startsWith("image/") ? (
                <img
                  src={imageSrc}
                  alt="Modal Content"
                  className="max-w-full max-h-[80vh] object-contain"
                />
              ) : (
                <iframe
                  src={imageSrc}
                  title="PDF Viewer"
                  className="w-full h-[80vh]"
                />
              )}
            </div>
          </div>
        )}
        <ErrorModal
          isOpen={errorModalState.isOpen}
          message={errorModalState.message}
          onClose={() => setErrorModalState({ isOpen: false, message: "" })}
        />
        <SuccessModal
          isOpen={successModalState.isOpen}
          message={successModalState.message}
          buttonText="Proceed to Verification"
          onButtonClick={() => {
            setSuccessModalState({ isOpen: false, message: "" });
            navigate("/code-verification");
          }}
        />
      </div>
    );
}

export default SignUpPage;
