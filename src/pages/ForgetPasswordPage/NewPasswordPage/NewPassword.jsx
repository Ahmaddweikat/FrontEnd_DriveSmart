import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordSchema } from "./schemas/newPasswordSchema";
import illustration from "./img/new-password-illustration.svg";

function NewPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(newPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 flex">
        <div className="hidden lg:flex items-center justify-center p-10">
          <img
            src={illustration}
            alt="New password illustration"
            className="w-80 h-80"
          />
        </div>
        <div className="w-full lg:w-96 flex flex-col justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-2xl font-semibold text-gray-800 mb-5">
              Create New Password
            </h1>
            <p className="text-sm text-gray-500 mb-4">
              Please create a new password for your account.
            </p>

            <div className="mb-4">
              <label htmlFor="password" className="sr-only">
                New Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="New Password"
                {...register("password")}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
            >
              Submit
            </button>
          </form>
          <div className="mt-4">
            <a
              href="/login"
              className="text-sm text-gray-500 hover:text-gray-700 transition"
            >
              &larr; Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
