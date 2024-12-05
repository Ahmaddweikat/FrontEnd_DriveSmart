import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema } from "./schemas/emailSchema";
import illustration from "./img/reset-password-illustration.svg";
import useVerificationStore from "../../../store/verification.store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useForgotPassword from "./hooks/useForgotPassword";
import SuccessModal from "../../../components/modals/SuccessModal";
import ErrorModal from "../../../components/modals/ErrorModal";

function EmailPage() {
  const navigate = useNavigate();
  const forgotPassword = useForgotPassword();
  const { setEmail } = useVerificationStore();

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
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data) => {
    try {
      await forgotPassword.mutateAsync({ email: data.email });
      setEmail(data.email);
      setSuccessModal({
        isOpen: true,
        message: "Reset code has been sent to your email",
      });
    } catch (error) {
      setErrorModal({
        isOpen: true,
        message: error.response?.data?.message || "Failed to send reset code",
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
              alt="Password reset illustration"
              className="w-80 h-80"
            />
          </div>
          <div className="w-full lg:w-96 flex flex-col justify-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-2xl font-semibold text-gray-800 mb-5">
                Forget Password
              </h1>
              <p className="text-sm text-gray-500 mb-4">
                Enter your email and we'll send you a code to reset your
                password.
              </p>
              <div className="mb-4">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="test@example.com"
                  {...register("email")}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
              >
                {forgotPassword.isPending ? "Loading..." : "Send Code"}
              </button>
            </form>
            <div className="mt-4">
              <a
                href="/signin"
                className="text-sm text-gray-500 hover:text-gray-700 transition"
              >
                &larr; Back to Login
              </a>
            </div>
          </div>
        </div>
      </div>
      <SuccessModal
        isOpen={successModal.isOpen}
        message={successModal.message}
        buttonText="Enter Code And Reset Your Password"
        onButtonClick={() => {
          setSuccessModal({ isOpen: false, message: "" });
          navigate("/new-password");
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

export default EmailPage;
