import React from "react";
import useEmailForm from "./hooks/useEmailForm";

function EmailPage() {
  const { email, error, handleEmailChange, validateEmail, resetEmail } =
    useEmailForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail()) {
      resetEmail();
      // Proceed with password reset logic
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      {/* Main Container */}
      <div className="bg-white rounded-lg shadow-lg p-8 flex">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex items-center justify-center p-10">
          <img
            src="/path-to-your-illustration.png" // Replace with your illustration path
            alt="Password reset illustration"
            className="w-80 h-80"
          />
        </div>
        {/* Right Side - Form */}
        <div className="w-full lg:w-96">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-800">
              Driving School Complex
            </h1>
          </div>
          {/* Forgot Password Form */}
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold text-gray-700 mb-6">
              Forgot Password
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Enter your email and we’ll send you a code to reset your password.
            </p>
            <div className="mb-4">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="test@example.com"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
            >
              Submit
            </button>
          </form>
          {/* Back to Login Link */}
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

export default EmailPage;
