import React from "react";
import useNewPasswordForm from "../../hooks/ForgetPassword/NewPasswordPage/useNewPasswordForm"; // Adjust the import path if necessary

function NewPassword() {
  const {
    password,
    confirmPassword,
    error,
    success,
    setSuccess, // Get setSuccess from the hook
    handlePasswordChange,
    handleConfirmPasswordChange,
    validatePasswords,
    resetForm,
  } = useNewPasswordForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePasswords()) {
      resetForm();
      setSuccess(true);
      // Proceed with password reset logic (e.g., API call)
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
            alt="New password illustration"
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
          {/* New Password Form */}
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold text-gray-700 mb-6">
              Create New Password
            </h2>
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
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {success && (
              <p className="text-green-500 text-sm mb-4">
                Password successfully updated!
              </p>
            )}

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

export default NewPassword;
