import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../../components/modals/ErrorModal";
import SuccessModal from "../../../components/modals/SuccessModal";
import useVerificationStore from "./../../../store/verification.store";
import useVerifyEmail from "./hooks/useVerifyEmail";
import illustration from "./img/code-verification-illustration.svg";
import { codeSchema } from "./schemas/codeSchema";

function Code() {
  const { email } = useVerificationStore();
  const verifyEmail = useVerifyEmail();
  const navigate = useNavigate();

  const [successModal, setSuccessModal] = useState({
    isOpen: false,
    message: "",
  });
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(codeSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    try {
      await verifyEmail.mutateAsync({
        email,
        code: parseInt(data.code),
      });

      setSuccessModal({
        isOpen: true,
        message:
          "Email verified successfully! Please wait for school manager approval.",
      });
    } catch (error) {
      setErrorModal({
        isOpen: true,
        message: error.response?.data?.message || "Verification failed",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8 flex">
          <div className="hidden lg:flex items-center justify-center p-10">
            <img
              src={illustration}
              alt="Code verification illustration"
              className="w-80 h-80"
            />
          </div>
          <div className="w-full lg:w-96 flex flex-col justify-center">
            <div className="mb-5">
              <h1 className="text-2xl font-semibold text-gray-800">
                Verify Your Email
              </h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="text-sm text-gray-500 mb-4">
                Please enter the 6-digit code sent to your email.
              </p>
              <div className="mb-4">
                <label htmlFor="code" className="sr-only">
                  6-Digit Code
                </label>
                <input
                  type="text"
                  id="code"
                  placeholder="Enter 6-digit code"
                  {...register("code")}
                  maxLength="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.code && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.code.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
              >
                {verifyEmail.isPending ? "Loading..." : "Verify Email"}
              </button>
            </form>
            {/* <div className="mt-4">
              <a
                href="/signin"
                className="text-sm text-gray-500 hover:text-gray-700 transition"
              >
                &larr; Back to Sign in
              </a>
            </div> */}
          </div>
        </div>
      </div>
      <SuccessModal
        isOpen={successModal.isOpen}
        message={successModal.message}
        buttonText={"Go to Sign in"}
        onButtonClick={() => {
          setSuccessModal({ isOpen: false, message: "" });
          navigate("/signin");
        }}
      />
      <ErrorModal
        isOpen={errorModal.isOpen}
        message={errorModal.message}
        onClose={() => setErrorModal({ isOpen: false, message: "" })}
      />
    </div>
  );
}

export default Code;
