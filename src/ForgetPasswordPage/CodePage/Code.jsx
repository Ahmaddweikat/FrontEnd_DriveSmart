import React, { useState } from "react";

function Code() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      setError("Please enter a valid 6-digit code.");
    } else {
      setError("");
      // Proceed with code verification logic
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
            alt="Code verification illustration"
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
          {/* Enter Code Form */}
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold text-gray-700 mb-6">
              Enter Code
            </h2>
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
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength="6"
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

export default Code;
